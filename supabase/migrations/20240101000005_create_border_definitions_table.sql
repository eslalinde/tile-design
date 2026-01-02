-- Border definitions table for storing border components (corner + sides)
-- Borders are composed of:
--   1 corner SVG (200x200) - positioned at (4,4) in the matrix
--   1-2 side SVGs (200x200) - positioned along the border edges
--     - Bottom edge: (4,0), (4,1), (4,2), (4,3) - horizontal
--     - Right edge: (0,4), (1,4), (2,4), (3,4) - rotated 90 degrees
--     - If 2 side SVGs exist, they alternate: SVG1, SVG2, SVG1, SVG2...

CREATE TABLE border_definitions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,  -- paris, barcelona, morocco, square
  corner_svg TEXT NOT NULL,  -- SVG 200x200 for the corner (already rotated)
  side_svg_1 TEXT NOT NULL,  -- First side SVG (horizontal orientation)
  side_svg_2 TEXT,           -- Second side SVG (optional, for alternating pattern)
  default_colors JSONB,      -- Default colors for all parts
  description TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX idx_border_definitions_category ON border_definitions(category);
CREATE INDEX idx_border_definitions_active ON border_definitions(is_active);
CREATE INDEX idx_border_definitions_display_order ON border_definitions(display_order);

-- Enable RLS
ALTER TABLE border_definitions ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read active border definitions
CREATE POLICY "Anyone can view active border definitions" ON border_definitions
  FOR SELECT USING (is_active = true);

-- Trigger for updated_at
CREATE TRIGGER update_border_definitions_updated_at
  BEFORE UPDATE ON border_definitions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
