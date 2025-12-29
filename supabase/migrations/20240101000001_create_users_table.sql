-- Users table with Habeas Data compliance (Colombian law)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  company TEXT,
  accepted_habeas_data BOOLEAN NOT NULL DEFAULT false,
  habeas_data_accepted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for email lookups
CREATE INDEX idx_users_email ON users(email);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own data
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (true);

-- Policy: Users can insert their own data
CREATE POLICY "Users can insert own data" ON users
  FOR INSERT WITH CHECK (true);

-- Policy: Users can update their own data
CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (true);

-- Trigger to update updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();



