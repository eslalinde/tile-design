-- Seed data for Mosaicos Bien
-- This file is run automatically after migrations during `supabase db reset`

-- =====================================================
-- PARIS COLLECTION
-- =====================================================

INSERT INTO mosaics (name, category, type, shape, svg, width, height, rotation, default_colors, description, display_order) VALUES
('Paris 01', 'paris', 'mosaic', 'square', 
'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <g id="part1">
    <rect width="200" height="200" fill="#EFEFEF"/>
  </g>
  <g id="part2">
    <path d="M0,0 L100,100 L0,200 Z" fill="#44494D"/>
  </g>
  <g id="part3">
    <path d="M200,0 L100,100 L200,200 Z" fill="#44494D"/>
  </g>
  <g id="part4">
    <circle cx="100" cy="100" r="30" fill="#01A8B8"/>
  </g>
</svg>', 
200, 200, '[[0, 90, 180, 270], [90, 180, 270, 0]]',
'{"part1": "#EFEFEF", "part2": "#44494D", "part3": "#44494D", "part4": "#01A8B8"}',
'Classic Paris geometric pattern with triangular elements', 1),

('Paris 02', 'paris', 'mosaic', 'square',
'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <g id="part1">
    <rect width="200" height="200" fill="#DADECF"/>
  </g>
  <g id="part2">
    <rect x="25" y="25" width="150" height="150" fill="#554840"/>
  </g>
  <g id="part3">
    <rect x="50" y="50" width="100" height="100" fill="#EFEFEF"/>
  </g>
  <g id="part4">
    <rect x="75" y="75" width="50" height="50" fill="#C27547"/>
  </g>
</svg>',
200, 200, '[[0, 0, 0, 0], [0, 0, 0, 0]]',
'{"part1": "#DADECF", "part2": "#554840", "part3": "#EFEFEF", "part4": "#C27547"}',
'Concentric squares in Paris style', 2),

('Paris 03', 'paris', 'mosaic', 'square',
'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <g id="part1">
    <rect width="200" height="200" fill="#D3D2BC"/>
  </g>
  <g id="part2">
    <path d="M100,0 L200,100 L100,200 L0,100 Z" fill="#416969"/>
  </g>
  <g id="part3">
    <circle cx="100" cy="100" r="40" fill="#EFEFEF"/>
  </g>
  <g id="part4">
    <circle cx="100" cy="100" r="20" fill="#C68871"/>
  </g>
</svg>',
200, 200, '[[0, 0, 0, 0], [0, 0, 0, 0]]',
'{"part1": "#D3D2BC", "part2": "#416969", "part3": "#EFEFEF", "part4": "#C68871"}',
'Diamond center Paris pattern', 3);

-- =====================================================
-- BARCELONA COLLECTION
-- =====================================================

INSERT INTO mosaics (name, category, type, shape, svg, width, height, rotation, default_colors, description, display_order) VALUES
('Barcelona 01', 'barcelona', 'mosaic', 'square',
'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <g id="part1">
    <rect width="200" height="200" fill="#EFEFEF"/>
  </g>
  <g id="part2">
    <path d="M0,0 Q100,50 200,0 L200,50 Q100,100 0,50 Z" fill="#4B9ED7"/>
  </g>
  <g id="part3">
    <path d="M0,100 Q100,150 200,100 L200,150 Q100,200 0,150 Z" fill="#4B9ED7"/>
  </g>
  <g id="part4">
    <path d="M0,50 Q100,100 200,50 L200,100 Q100,150 0,100 Z" fill="#01A8B8"/>
  </g>
</svg>',
200, 200, '[[0, 180, 0, 180], [180, 0, 180, 0]]',
'{"part1": "#EFEFEF", "part2": "#4B9ED7", "part3": "#4B9ED7", "part4": "#01A8B8"}',
'Barcelona wave pattern inspired by Gaudí', 1),

('Barcelona 02', 'barcelona', 'mosaic', 'square',
'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <g id="part1">
    <rect width="200" height="200" fill="#D8BEAF"/>
  </g>
  <g id="part2">
    <polygon points="100,10 190,100 100,190 10,100" fill="#5283A4"/>
  </g>
  <g id="part3">
    <polygon points="100,40 160,100 100,160 40,100" fill="#EFEFEF"/>
  </g>
  <g id="part4">
    <polygon points="100,70 130,100 100,130 70,100" fill="#C27547"/>
  </g>
</svg>',
200, 200, '[[0, 0, 0, 0], [0, 0, 0, 0]]',
'{"part1": "#D8BEAF", "part2": "#5283A4", "part3": "#EFEFEF", "part4": "#C27547"}',
'Barcelona concentric diamonds', 2),

('Barcelona 03', 'barcelona', 'mosaic', 'square',
'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <g id="part1">
    <rect width="200" height="200" fill="#96CDE7"/>
  </g>
  <g id="part2">
    <path d="M0,0 C50,50 150,50 200,0 L200,100 C150,50 50,50 0,100 Z" fill="#EFEFEF"/>
  </g>
  <g id="part3">
    <path d="M0,100 C50,150 150,150 200,100 L200,200 C150,150 50,150 0,200 Z" fill="#EFEFEF"/>
  </g>
  <g id="part4">
    <circle cx="100" cy="100" r="25" fill="#DE8ABA"/>
  </g>
</svg>',
200, 200, '[[0, 90, 180, 270], [90, 180, 270, 0]]',
'{"part1": "#96CDE7", "part2": "#EFEFEF", "part3": "#EFEFEF", "part4": "#DE8ABA"}',
'Barcelona modernist curves', 3),

('Barcelona 04', 'barcelona', 'mosaic', 'square',
'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <g id="part1">
    <rect width="200" height="200" fill="#EFEFEF"/>
  </g>
  <g id="part2">
    <path d="M200,0 L200,200 L0,200 Q100,100 200,0 Z" fill="#4B9ED7"/>
  </g>
</svg>',
200, 200, '[[0, 90, 0, 90], [270, 180, 270, 180]]',
'{"part1": "#EFEFEF", "part2": "#4B9ED7"}',
'Barcelona quarter circle pattern - forms complete circle when 4 tiles meet', 5);

-- =====================================================
-- MOROCCO COLLECTION
-- =====================================================

INSERT INTO mosaics (name, category, type, shape, svg, width, height, rotation, default_colors, description, display_order) VALUES
('Morocco 01', 'morocco', 'mosaic', 'square',
'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <g id="part1">
    <rect width="200" height="200" fill="#D4A57A"/>
  </g>
  <g id="part2">
    <path d="M100,0 L150,50 L200,0 L200,50 L150,100 L200,150 L200,200 L150,150 L100,200 L50,150 L0,200 L0,150 L50,100 L0,50 L0,0 L50,50 Z" fill="#2E3236"/>
  </g>
  <g id="part3">
    <rect x="60" y="60" width="80" height="80" fill="#EFEFEF"/>
  </g>
  <g id="part4">
    <path d="M100,70 L130,100 L100,130 L70,100 Z" fill="#01A8B8"/>
  </g>
</svg>',
200, 200, '[[0, 90, 180, 270], [90, 180, 270, 0]]',
'{"part1": "#D4A57A", "part2": "#2E3236", "part3": "#EFEFEF", "part4": "#01A8B8"}',
'Traditional Moroccan star pattern', 1),

('Morocco 02', 'morocco', 'mosaic', 'square',
'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <g id="part1">
    <rect width="200" height="200" fill="#DADECF"/>
  </g>
  <g id="part2">
    <path d="M0,100 L50,50 L100,100 L50,150 Z M100,0 L150,50 L100,100 L50,50 Z M200,100 L150,150 L100,100 L150,50 Z M100,200 L50,150 L100,100 L150,150 Z" fill="#AE6245"/>
  </g>
  <g id="part3">
    <circle cx="100" cy="100" r="25" fill="#44494D"/>
  </g>
  <g id="part4">
    <circle cx="100" cy="100" r="12" fill="#D7BD80"/>
  </g>
</svg>',
200, 200, '[[0, 0, 0, 0], [0, 0, 0, 0]]',
'{"part1": "#DADECF", "part2": "#AE6245", "part3": "#44494D", "part4": "#D7BD80"}',
'Moroccan zellige inspired design', 2),

('Morocco 03', 'morocco', 'mosaic', 'square',
'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <g id="part1">
    <rect width="200" height="200" fill="#C8C48C"/>
  </g>
  <g id="part2">
    <path d="M100,0 L120,80 L200,100 L120,120 L100,200 L80,120 L0,100 L80,80 Z" fill="#554840"/>
  </g>
  <g id="part3">
    <circle cx="100" cy="100" r="30" fill="#EFEFEF"/>
  </g>
  <g id="part4">
    <path d="M100,80 L110,100 L100,120 L90,100 Z" fill="#8871B3"/>
  </g>
</svg>',
200, 200, '[[0, 45, 90, 135], [45, 90, 135, 0]]',
'{"part1": "#C8C48C", "part2": "#554840", "part3": "#EFEFEF", "part4": "#8871B3"}',
'Moroccan eight-pointed star', 3);

-- =====================================================
-- SQUARE COLLECTION
-- =====================================================

INSERT INTO mosaics (name, category, type, shape, svg, width, height, rotation, default_colors, description, display_order) VALUES
('Square 01', 'square', 'mosaic', 'square',
'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <g id="part1">
    <rect width="200" height="200" fill="#EFEFEF"/>
  </g>
  <g id="part2">
    <rect x="10" y="10" width="85" height="85" fill="#818890"/>
  </g>
  <g id="part3">
    <rect x="105" y="10" width="85" height="85" fill="#469AA4"/>
  </g>
  <g id="part4">
    <rect x="10" y="105" width="85" height="85" fill="#469AA4"/>
  </g>
  <g id="part5">
    <rect x="105" y="105" width="85" height="85" fill="#818890"/>
  </g>
</svg>',
200, 200, '[[0, 90, 180, 270], [90, 180, 270, 0]]',
'{"part1": "#EFEFEF", "part2": "#818890", "part3": "#469AA4", "part4": "#469AA4", "part5": "#818890"}',
'Classic checkerboard square pattern', 1),

('Square 02', 'square', 'mosaic', 'square',
'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <g id="part1">
    <rect width="200" height="200" fill="#C1C8CF"/>
  </g>
  <g id="part2">
    <rect x="20" y="20" width="160" height="160" rx="10" fill="#554840"/>
  </g>
  <g id="part3">
    <rect x="40" y="40" width="120" height="120" rx="8" fill="#D4C6C4"/>
  </g>
  <g id="part4">
    <rect x="60" y="60" width="80" height="80" rx="6" fill="#7D513B"/>
  </g>
</svg>',
200, 200, '[[0, 0, 0, 0], [0, 0, 0, 0]]',
'{"part1": "#C1C8CF", "part2": "#554840", "part3": "#D4C6C4", "part4": "#7D513B"}',
'Rounded nested squares', 2),

('Square 03', 'square', 'mosaic', 'square',
'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <g id="part1">
    <rect width="200" height="200" fill="#BCC2C0"/>
  </g>
  <g id="part2">
    <rect x="0" y="0" width="100" height="100" fill="#88AD82"/>
  </g>
  <g id="part3">
    <rect x="100" y="100" width="100" height="100" fill="#88AD82"/>
  </g>
  <g id="part4">
    <circle cx="100" cy="100" r="40" fill="#EFEFEF"/>
  </g>
  <g id="part5">
    <circle cx="100" cy="100" r="20" fill="#C27547"/>
  </g>
</svg>',
200, 200, '[[0, 90, 180, 270], [90, 180, 270, 0]]',
'{"part1": "#BCC2C0", "part2": "#88AD82", "part3": "#88AD82", "part4": "#EFEFEF", "part5": "#C27547"}',
'Diagonal squares with center circle', 3);

-- =====================================================
-- HEXAGONAL COLLECTION
-- =====================================================

INSERT INTO mosaics (name, category, type, shape, svg, width, height, rotation, default_colors, description, display_order) VALUES
('Hexagonal 01', 'hexagonal', 'mosaic', 'hexagon',
'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 173">
  <g id="part1">
    <polygon points="50,0 150,0 200,86.5 150,173 50,173 0,86.5" fill="#DADECF"/>
  </g>
  <g id="part2">
    <polygon points="75,25 125,25 150,86.5 125,148 75,148 50,86.5" fill="#01A8B8"/>
  </g>
  <g id="part3">
    <polygon points="90,50 110,50 125,86.5 110,123 90,123 75,86.5" fill="#EFEFEF"/>
  </g>
</svg>',
200, 173, '[[0,0,0,0],[0,0,0,0],[0,0,0,0]]',
'{"part1": "#DADECF", "part2": "#01A8B8", "part3": "#EFEFEF"}',
'Classic hexagonal tile with concentric layers', 1),

('Hexagonal 02', 'hexagonal', 'mosaic', 'hexagon',
'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 173">
  <g id="part1">
    <polygon points="50,0 150,0 200,86.5 150,173 50,173 0,86.5" fill="#D4A57A"/>
  </g>
  <g id="part2">
    <path d="M100,20 L150,55 L150,118 L100,153 L50,118 L50,55 Z" fill="#44494D"/>
  </g>
  <g id="part3">
    <circle cx="100" cy="86.5" r="35" fill="#EFEFEF"/>
  </g>
  <g id="part4">
    <circle cx="100" cy="86.5" r="18" fill="#C27547"/>
  </g>
</svg>',
200, 173, '[[0,0,0,0],[0,0,0,0],[0,0,0,0]]',
'{"part1": "#D4A57A", "part2": "#44494D", "part3": "#EFEFEF", "part4": "#C27547"}',
'Hexagonal flower pattern', 2),

('Hexagonal 03', 'hexagonal', 'mosaic', 'hexagon',
'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 173">
  <g id="part1">
    <polygon points="50,0 150,0 200,86.5 150,173 50,173 0,86.5" fill="#9AC4B0"/>
  </g>
  <g id="part2">
    <path d="M100,0 L100,86.5 L50,0 Z M150,0 L100,86.5 L200,86.5 Z M200,86.5 L100,86.5 L150,173 Z M100,86.5 L100,173 L50,173 Z M50,173 L100,86.5 L0,86.5 Z M0,86.5 L100,86.5 L50,0 Z" fill="#416969"/>
  </g>
  <g id="part3">
    <circle cx="100" cy="86.5" r="25" fill="#EFEFEF"/>
  </g>
</svg>',
200, 173, '[[0,0,0,0],[0,0,0,0],[0,0,0,0]]',
'{"part1": "#9AC4B0", "part2": "#416969", "part3": "#EFEFEF"}',
'Hexagonal pinwheel design', 3),

('Hexagonal 04', 'hexagonal', 'mosaic', 'hexagon',
'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 173">
  <g id="part1">
    <polygon points="50,0 150,0 200,86.5 0,86.5" fill="#5C5C5C"/>
  </g>
  <g id="part2">
    <polygon points="0,86.5 200,86.5 150,173 50,173" fill="#8FB4C9"/>
  </g>
  <g id="part3">
    <line x1="200" y1="86.5" x2="50" y2="0" stroke="#FFFFFF" stroke-width="3"/>
    <line x1="200" y1="86.5" x2="80" y2="0" stroke="#FFFFFF" stroke-width="3"/>
    <line x1="200" y1="86.5" x2="110" y2="0" stroke="#FFFFFF" stroke-width="3"/>
    <line x1="200" y1="86.5" x2="140" y2="0" stroke="#FFFFFF" stroke-width="3"/>
    <line x1="200" y1="86.5" x2="50" y2="173" stroke="#FFFFFF" stroke-width="3"/>
    <line x1="200" y1="86.5" x2="80" y2="173" stroke="#FFFFFF" stroke-width="3"/>
    <line x1="200" y1="86.5" x2="110" y2="173" stroke="#FFFFFF" stroke-width="3"/>
    <line x1="200" y1="86.5" x2="140" y2="173" stroke="#FFFFFF" stroke-width="3"/>
    <line x1="200" y1="86.5" x2="0" y2="86.5" stroke="#FFFFFF" stroke-width="3"/>
  </g>
</svg>',
200, 173, '[[60, 60, 60, 60], [180, 180, 180, 180], [300, 300, 300, 300]]',
'{"part1": "#5C5C5C", "part2": "#8FB4C9", "part3": "#FFFFFF"}',
'Hexagonal fan rays design', 4);

-- =====================================================
-- RECTANGLE COLLECTION
-- =====================================================

-- Basic rectangular tiles with different sizes (solid colors, no patterns)
-- These are the base tiles for creating brick, stack bond, herringbone, and chevron patterns

INSERT INTO mosaics (name, category, type, shape, svg, width, height, rotation, default_colors, description, display_order) VALUES
-- 25x5cm rectangular tile (5:1 ratio)
('Rectangular 25x5cm', 'rectangle', 'mosaic', 'rectangle',
'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 50">
  <g id="part1">
    <rect width="250" height="50" fill="#BCC2C0"/>
  </g>
</svg>',
250, 50, '[[0, 0], [0, 0]]',
'{"part1": "#BCC2C0"}',
'Solid 25x5cm rectangular tile for brick, stack bond, herringbone, and chevron patterns', 1),

-- 20x10cm rectangular tile (2:1 ratio)
('Rectangular 20x10cm', 'rectangle', 'mosaic', 'rectangle',
'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 100">
  <g id="part1">
    <rect width="200" height="100" fill="#BCC2C0"/>
  </g>
</svg>',
200, 100, '[[0, 0], [0, 0]]',
'{"part1": "#BCC2C0"}',
'Solid 20x10cm rectangular tile for brick, stack bond, herringbone, and chevron patterns', 2),

-- 30x10cm rectangular tile (3:1 ratio)
('Rectangular 30x10cm', 'rectangle', 'mosaic', 'rectangle',
'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 100">
  <g id="part1">
    <rect width="300" height="100" fill="#BCC2C0"/>
  </g>
</svg>',
300, 100, '[[0, 0], [0, 0]]',
'{"part1": "#BCC2C0"}',
'Solid 30x10cm rectangular tile for brick, stack bond, herringbone, and chevron patterns', 3);

-- =====================================================
-- BORDER COLLECTION
-- =====================================================

INSERT INTO mosaics (name, category, type, shape, svg, width, height, rotation, default_colors, description, display_order) VALUES
('Border 01', 'border', 'border', 'square',
'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 50">
  <g id="part1">
    <rect width="200" height="50" fill="#DADECF"/>
  </g>
  <g id="part2">
    <rect x="0" y="20" width="200" height="10" fill="#44494D"/>
  </g>
  <g id="part3">
    <circle cx="25" cy="25" r="15" fill="#01A8B8"/>
    <circle cx="75" cy="25" r="15" fill="#01A8B8"/>
    <circle cx="125" cy="25" r="15" fill="#01A8B8"/>
    <circle cx="175" cy="25" r="15" fill="#01A8B8"/>
  </g>
</svg>',
200, 50, '[[0], [0]]',
'{"part1": "#DADECF", "part2": "#44494D", "part3": "#01A8B8"}',
'Classic dot border pattern', 1),

('Border 02', 'border', 'border', 'square',
'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 50">
  <g id="part1">
    <rect width="200" height="50" fill="#C1C8CF"/>
  </g>
  <g id="part2">
    <path d="M0,25 L25,0 L50,25 L75,0 L100,25 L125,0 L150,25 L175,0 L200,25 L200,50 L0,50 Z" fill="#554840"/>
  </g>
  <g id="part3">
    <path d="M0,25 L25,0 L50,25 L75,0 L100,25 L125,0 L150,25 L175,0 L200,25" stroke="#D7BD80" stroke-width="4" fill="none"/>
  </g>
</svg>',
200, 50, '[[0], [180]]',
'{"part1": "#C1C8CF", "part2": "#554840", "part3": "#D7BD80"}',
'Zigzag border design', 2),

('Border 03', 'border', 'border', 'square',
'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 50">
  <g id="part1">
    <rect width="200" height="50" fill="#D4C6C4"/>
  </g>
  <g id="part2">
    <rect x="0" y="5" width="200" height="15" fill="#8871B3"/>
    <rect x="0" y="30" width="200" height="15" fill="#8871B3"/>
  </g>
  <g id="part3">
    <rect x="20" y="0" width="10" height="50" fill="#EFEFEF"/>
    <rect x="70" y="0" width="10" height="50" fill="#EFEFEF"/>
    <rect x="120" y="0" width="10" height="50" fill="#EFEFEF"/>
    <rect x="170" y="0" width="10" height="50" fill="#EFEFEF"/>
  </g>
</svg>',
200, 50, '[[0], [0]]',
'{"part1": "#D4C6C4", "part2": "#8871B3", "part3": "#EFEFEF"}',
'Striped border with columns', 3);

-- =====================================================
-- G1 COLLECTION (Water Drop / Fish Scale / Escama)
-- =====================================================
-- G1 tiles are 120mm x 120mm (4.7" x 4.7") fish scale shaped tiles
-- that tessellate in a beautiful overlapping pattern

INSERT INTO mosaics (name, category, type, shape, svg, width, height, rotation, default_colors, description, display_order) VALUES
('G1 Superior', 'g1', 'mosaic', 'g1',
'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <g id="part1">
    <path d="m 199.83512,96.616655 c -53.99305,0 -97.92227,-42.779053 -99.68404,-96.46120487 h -0.10364 c -1.347232,0 -2.590831,0 -3.834431,0.10363345 C 94.451246,52.593994 52.389262,94.641846 0.15798792,96.610884 c 0,1.139968 0.016323,2.307282 0.016323,3.343615 0,55.133021 44.74012308,99.799051 99.87313908,99.799051 55.13302,0 99.98706,-44.66635 99.79905,-99.799051 z" fill="#D4C6C4"/>
  </g>
</svg>',
120, 120, '[[0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]',
'{"part1": "#D4C6C4"}',
'G1 Superior - Classic fish scale tile 120x120mm (solid)', 1);

-- Log seed completion
DO $$
BEGIN
  RAISE NOTICE 'Seed completed: % mosaics inserted', (SELECT COUNT(*) FROM mosaics);
END $$;



