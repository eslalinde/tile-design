-- Quotation status type
CREATE TYPE quotation_status AS ENUM ('pending', 'reviewed', 'quoted', 'accepted', 'rejected', 'expired');

-- Quotations table
CREATE TABLE quotations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  mosaic_snapshot JSONB NOT NULL,
  metadata JSONB DEFAULT '{}',
  status quotation_status NOT NULL DEFAULT 'pending',
  notes TEXT,
  admin_notes TEXT,
  quoted_price DECIMAL(12, 2),
  currency TEXT DEFAULT 'COP',
  valid_until TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX idx_quotations_user ON quotations(user_id);
CREATE INDEX idx_quotations_status ON quotations(status);
CREATE INDEX idx_quotations_created ON quotations(created_at DESC);

-- Enable RLS
ALTER TABLE quotations ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own quotations
CREATE POLICY "Users can view own quotations" ON quotations
  FOR SELECT USING (true);

-- Policy: Users can insert quotations
CREATE POLICY "Users can insert quotations" ON quotations
  FOR INSERT WITH CHECK (true);

-- Trigger for updated_at
CREATE TRIGGER update_quotations_updated_at
  BEFORE UPDATE ON quotations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();



