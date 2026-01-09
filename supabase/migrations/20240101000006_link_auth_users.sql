-- Migration: Link users table with Supabase Auth and add contact fields
-- This enables Magic Link authentication with soft signup flow

-- Step 1: Add auth_id column to link with auth.users
ALTER TABLE users ADD COLUMN auth_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE;

-- Step 2: Split name into first_name and last_name, add phone
ALTER TABLE users RENAME COLUMN name TO first_name;
ALTER TABLE users ADD COLUMN last_name TEXT;
ALTER TABLE users ADD COLUMN phone TEXT;

-- Step 3: Create index for auth_id lookups
CREATE INDEX idx_users_auth_id ON users(auth_id);

-- Step 4: Drop old permissive policies
DROP POLICY IF EXISTS "Users can view own data" ON users;
DROP POLICY IF EXISTS "Users can insert own data" ON users;
DROP POLICY IF EXISTS "Users can update own data" ON users;

-- Step 5: Create new RLS policies using auth.uid()
-- Authenticated users can view their own data
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (
    auth.uid() = auth_id OR 
    auth.uid() IS NULL -- Allow service role access
  );

-- Allow inserting user profile when authenticated
CREATE POLICY "Users can create own profile" ON users
  FOR INSERT WITH CHECK (
    auth.uid() = auth_id OR
    auth.uid() IS NULL -- Allow service role / anon for soft signup
  );

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (
    auth.uid() = auth_id
  );

-- Step 6: Update quotations RLS policies
DROP POLICY IF EXISTS "Users can view own quotations" ON quotations;
DROP POLICY IF EXISTS "Users can insert quotations" ON quotations;

-- Users can view their own quotations
CREATE POLICY "Users can view own quotations" ON quotations
  FOR SELECT USING (
    user_id IN (SELECT id FROM users WHERE auth_id = auth.uid()) OR
    auth.uid() IS NULL -- Service role access
  );

-- Users can insert quotations for themselves
CREATE POLICY "Users can insert own quotations" ON quotations
  FOR INSERT WITH CHECK (
    user_id IN (SELECT id FROM users WHERE auth_id = auth.uid()) OR
    auth.uid() IS NULL -- Allow anon for pending quotations before verification
  );

-- Step 7: Update user_mosaics RLS policies  
DROP POLICY IF EXISTS "Users can view own mosaics" ON user_mosaics;
DROP POLICY IF EXISTS "Users can insert own mosaics" ON user_mosaics;
DROP POLICY IF EXISTS "Users can update own mosaics" ON user_mosaics;
DROP POLICY IF EXISTS "Users can delete own mosaics" ON user_mosaics;

CREATE POLICY "Users can view own saved mosaics" ON user_mosaics
  FOR SELECT USING (
    user_id IN (SELECT id FROM users WHERE auth_id = auth.uid()) OR
    auth.uid() IS NULL
  );

CREATE POLICY "Users can insert own saved mosaics" ON user_mosaics
  FOR INSERT WITH CHECK (
    user_id IN (SELECT id FROM users WHERE auth_id = auth.uid()) OR
    auth.uid() IS NULL
  );

CREATE POLICY "Users can update own saved mosaics" ON user_mosaics
  FOR UPDATE USING (
    user_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
  );

CREATE POLICY "Users can delete own saved mosaics" ON user_mosaics
  FOR DELETE USING (
    user_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
  );

-- Step 8: Create function to auto-create user profile on auth signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.users (auth_id, email, first_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', split_part(NEW.email, '@', 1))
  )
  ON CONFLICT (email) DO UPDATE SET
    auth_id = EXCLUDED.auth_id,
    updated_at = now();
  RETURN NEW;
END;
$$;

-- Step 9: Create trigger for auto user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Step 10: Create function to get or create user by email (for soft signup)
CREATE OR REPLACE FUNCTION public.get_or_create_user_by_email(
  p_email TEXT,
  p_first_name TEXT DEFAULT NULL,
  p_last_name TEXT DEFAULT NULL,
  p_phone TEXT DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id UUID;
BEGIN
  -- Try to find existing user
  SELECT id INTO v_user_id FROM users WHERE email = p_email;
  
  -- If not found, create new user
  IF v_user_id IS NULL THEN
    INSERT INTO users (email, first_name, last_name, phone)
    VALUES (p_email, COALESCE(p_first_name, split_part(p_email, '@', 1)), p_last_name, p_phone)
    RETURNING id INTO v_user_id;
  ELSE
    -- Update existing user with new info if provided
    UPDATE users SET
      first_name = COALESCE(p_first_name, first_name),
      last_name = COALESCE(p_last_name, last_name),
      phone = COALESCE(p_phone, phone),
      updated_at = now()
    WHERE id = v_user_id;
  END IF;
  
  RETURN v_user_id;
END;
$$;

-- Grant execute permission to authenticated and anon users
GRANT EXECUTE ON FUNCTION public.get_or_create_user_by_email TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_or_create_user_by_email TO anon;
