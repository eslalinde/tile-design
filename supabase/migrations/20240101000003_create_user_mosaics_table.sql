-- User saved mosaics table
CREATE TABLE user_mosaics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  mosaic_id UUID NOT NULL REFERENCES mosaics(id) ON DELETE CASCADE,
  name TEXT,
  state JSONB NOT NULL,
  preview_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX idx_user_mosaics_user ON user_mosaics(user_id);
CREATE INDEX idx_user_mosaics_mosaic ON user_mosaics(mosaic_id);

-- Enable RLS
ALTER TABLE user_mosaics ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own saved mosaics
CREATE POLICY "Users can view own mosaics" ON user_mosaics
  FOR SELECT USING (true);

-- Policy: Users can insert their own mosaics
CREATE POLICY "Users can insert own mosaics" ON user_mosaics
  FOR INSERT WITH CHECK (true);

-- Policy: Users can update their own mosaics
CREATE POLICY "Users can update own mosaics" ON user_mosaics
  FOR UPDATE USING (true);

-- Policy: Users can delete their own mosaics
CREATE POLICY "Users can delete own mosaics" ON user_mosaics
  FOR DELETE USING (true);

-- Trigger for updated_at
CREATE TRIGGER update_user_mosaics_updated_at
  BEFORE UPDATE ON user_mosaics
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();



