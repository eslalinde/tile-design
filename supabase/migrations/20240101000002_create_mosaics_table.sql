-- Mosaic shape type
CREATE TYPE mosaic_shape AS ENUM ('square', 'hexagon', 'rectangle', 'g1');

-- Mosaic type (main tile or border)
CREATE TYPE mosaic_type AS ENUM ('mosaic', 'border');

-- Mosaics catalog table
CREATE TABLE mosaics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  type mosaic_type NOT NULL DEFAULT 'mosaic',
  shape mosaic_shape NOT NULL DEFAULT 'square',
  svg TEXT NOT NULL,
  width INTEGER NOT NULL,
  height INTEGER NOT NULL,
  rotation JSONB NOT NULL DEFAULT '[[0]]',
  default_colors JSONB,
  description TEXT,
  svg_version TEXT DEFAULT 'v1.0.0',
  is_active BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX idx_mosaics_category ON mosaics(category);
CREATE INDEX idx_mosaics_type ON mosaics(type);
CREATE INDEX idx_mosaics_active ON mosaics(is_active);
CREATE INDEX idx_mosaics_display_order ON mosaics(display_order);

-- Enable RLS
ALTER TABLE mosaics ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read active mosaics
CREATE POLICY "Anyone can view active mosaics" ON mosaics
  FOR SELECT USING (is_active = true);

-- Trigger for updated_at
CREATE TRIGGER update_mosaics_updated_at
  BEFORE UPDATE ON mosaics
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();



