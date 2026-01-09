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

-- =====================================================
-- BORDER DEFINITIONS (for square mosaics)
-- Each border has: corner SVG + 1-2 side SVGs (all 200x200)
-- =====================================================

INSERT INTO border_definitions (name, category, corner_svg, side_svg_1, side_svg_2, default_colors, description, display_order) VALUES
-- Paris Border 01: Classic geometric corner with line sides
('Paris Border 01', 'paris',
-- Corner SVG (200x200) - L-shaped corner design, rotated for position (4,4)
'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <g id="part1">
    <rect width="200" height="200" fill="#DADECF"/>
  </g>
  <g id="part2">
    <rect x="0" y="160" width="200" height="40" fill="#44494D"/>
    <rect x="160" y="0" width="40" height="200" fill="#44494D"/>
  </g>
  <g id="part3">
    <rect x="0" y="0" width="40" height="40" fill="#01A8B8"/>
  </g>
</svg>',
-- Side SVG 1 (200x200) - Line at bottom for row 4
'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <g id="part1">
    <rect width="200" height="200" fill="#DADECF"/>
  </g>
  <g id="part2">
    <rect x="0" y="160" width="200" height="40" fill="#44494D"/>
  </g>
  <g id="part3">
    <circle cx="100" cy="80" r="25" fill="#01A8B8"/>
  </g>
</svg>',
NULL, -- No side_svg_2 (single side pattern)
'{"part1": "#DADECF", "part2": "#44494D", "part3": "#01A8B8"}',
'Classic Paris border with geometric corner', 1),

-- Paris Border 02: Diamond corner with alternating sides
('Paris Border 02', 'paris',
-- Corner SVG - rotated for position (4,4)
'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <g id="part1">
    <rect width="200" height="200" fill="#EFEFEF"/>
  </g>
  <g id="part2">
    <path d="M200,200 L150,200 L150,150 L200,150 Z" fill="#554840"/>
    <path d="M0,0 L50,0 L50,50 L0,50 Z" fill="#554840"/>
  </g>
  <g id="part3">
    <path d="M100,50 L150,100 L100,150 L50,100 Z" fill="#C27547"/>
  </g>
</svg>',
-- Side SVG 1 - line at bottom for row 4
'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <g id="part1">
    <rect width="200" height="200" fill="#EFEFEF"/>
  </g>
  <g id="part2">
    <rect x="0" y="170" width="200" height="30" fill="#554840"/>
  </g>
  <g id="part3">
    <path d="M50,85 L100,35 L150,85 L100,135 Z" fill="#C27547"/>
  </g>
</svg>',
-- Side SVG 2 (alternating) - line at bottom for row 4
'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <g id="part1">
    <rect width="200" height="200" fill="#EFEFEF"/>
  </g>
  <g id="part2">
    <rect x="0" y="170" width="200" height="30" fill="#554840"/>
  </g>
  <g id="part3">
    <circle cx="100" cy="85" r="35" fill="#C27547"/>
  </g>
</svg>',
'{"part1": "#EFEFEF", "part2": "#554840", "part3": "#C27547"}',
'Paris border with alternating diamond and circle sides', 2),

-- Barcelona Border 01: Wave-inspired corner
('Barcelona Border 01', 'barcelona',
-- Corner SVG - rotated for position (4,4)
'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <g id="part1">
    <rect width="200" height="200" fill="#96CDE7"/>
  </g>
  <g id="part2">
    <path d="M200,200 Q150,150 200,100 L200,200 Z" fill="#4B9ED7"/>
    <path d="M0,0 Q50,50 0,100 L0,0 Z" fill="#4B9ED7"/>
  </g>
  <g id="part3">
    <circle cx="50" cy="150" r="20" fill="#EFEFEF"/>
  </g>
</svg>',
-- Side SVG 1 - wave at bottom for row 4
'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <g id="part1">
    <rect width="200" height="200" fill="#96CDE7"/>
  </g>
  <g id="part2">
    <path d="M0,200 Q100,150 200,200 L200,160 Q100,110 0,160 Z" fill="#4B9ED7"/>
  </g>
  <g id="part3">
    <circle cx="100" cy="70" r="30" fill="#EFEFEF"/>
  </g>
</svg>',
NULL,
'{"part1": "#96CDE7", "part2": "#4B9ED7", "part3": "#EFEFEF"}',
'Barcelona wave border inspired by Gaudí', 1),

-- Morocco Border 01: Geometric star corner
('Morocco Border 01', 'morocco',
-- Corner SVG - rotated for position (4,4)
'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <g id="part1">
    <rect width="200" height="200" fill="#D4A57A"/>
  </g>
  <g id="part2">
    <path d="M200,200 L140,200 L140,140 L200,140 Z" fill="#2E3236"/>
    <path d="M0,0 L60,0 L60,60 L0,60 Z" fill="#2E3236"/>
  </g>
  <g id="part3">
    <path d="M100,60 L140,100 L100,140 L60,100 Z" fill="#01A8B8"/>
  </g>
</svg>',
-- Side SVG 1 - line at bottom for row 4
'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <g id="part1">
    <rect width="200" height="200" fill="#D4A57A"/>
  </g>
  <g id="part2">
    <rect x="0" y="160" width="200" height="40" fill="#2E3236"/>
    <path d="M50,160 L100,100 L150,160 Z" fill="#2E3236"/>
  </g>
  <g id="part3">
    <circle cx="100" cy="50" r="25" fill="#01A8B8"/>
  </g>
</svg>',
-- Side SVG 2 - line at bottom for row 4
'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <g id="part1">
    <rect width="200" height="200" fill="#D4A57A"/>
  </g>
  <g id="part2">
    <rect x="0" y="160" width="200" height="40" fill="#2E3236"/>
  </g>
  <g id="part3">
    <path d="M100,60 L130,90 L100,120 L70,90 Z" fill="#01A8B8"/>
  </g>
</svg>',
'{"part1": "#D4A57A", "part2": "#2E3236", "part3": "#01A8B8"}',
'Moroccan geometric border with star motif', 1),

-- Square Border 01: Simple elegant corner
('Square Border 01', 'square',
-- Corner SVG - rotated for position (4,4)
'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <g id="part1">
    <rect width="200" height="200" fill="#C1C8CF"/>
  </g>
  <g id="part2">
    <rect x="150" y="0" width="50" height="200" fill="#554840"/>
    <rect x="0" y="150" width="200" height="50" fill="#554840"/>
  </g>
  <g id="part3">
    <rect x="0" y="0" width="50" height="50" fill="#7D513B"/>
  </g>
</svg>',
-- Side SVG 1 - line at bottom for row 4
'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <g id="part1">
    <rect width="200" height="200" fill="#C1C8CF"/>
  </g>
  <g id="part2">
    <rect x="0" y="150" width="200" height="50" fill="#554840"/>
  </g>
  <g id="part3">
    <rect x="75" y="50" width="50" height="50" fill="#7D513B"/>
  </g>
</svg>',
NULL,
'{"part1": "#C1C8CF", "part2": "#554840", "part3": "#7D513B"}',
'Simple square border with elegant corner', 1);

-- =====================================================
-- RELIEFS COLLECTION
-- Hexagonal relief mosaics with shadow/texture overlay
-- =====================================================

INSERT INTO mosaics (name, category, type, shape, svg, width, height, rotation, default_colors, description, display_order) VALUES
('Gaudi Relief 01', 'reliefs', 'mosaic', 'hexagon',
'<svg viewBox="0 0 200 175">
  <g id="g212" transform="rotate(90,106.28163,93.781629)">
    <g transform="matrix(1.0000026,0,0,1.0000026,-0.23609769,-96.964479)" id="part1" fill="#c1c8cf">
      <g transform="matrix(0.23518448,0,0,-0.23518448,186.70246,247.02698)" id="g340">
        <path id="path342" d="M 2.7475429,-0.19625307 -368.504,-212.599 -739.55929,-0.19625307 V 425.98201 L -368.504,637.795 2.7475429,425.197 Z" />
      </g>
    </g>
    <g style="display:inline;opacity:0.3;fill:#eff1f3;fill-opacity:1" id="g211" transform="matrix(0.34501,0,0,0.35278,12.5,0)">
      <path d="m 76.1,111.3 c 0,0 5.3,-0.2 5.6,1.7 0,0 1,3 -5.6,3 0,0 -34.3,2 -36.1,33.2 0,0 -0.9,18.5 19,18.3 0,0 14.7,-0.6 15.2,-9.5 0,0 1,-8.3 -5.9,-10.4 0,0 -5.7,-1.2 -5.8,-3.1 0,0 1.7,-4.8 10.3,-1.1 0,0 8,4.6 7.8,14.5 0,0 0.3,18.1 -26.5,17.8 0,0 -25,-2.2 -25,-28.8 0,0 -2,-34.3 47,-35.7 m -21.2,40.1 c 0,0 1,0.8 2.8,-0.4 0,0 5.4,-1.4 7.2,3 0,0 1.7,7.2 -9,8 0,0 -11.1,1.1 -11.7,-12 0,0 -1.2,-19.6 20.2,-25.3 0,0 15,-4.5 40.8,0.4 0,0 53,12.3 76.2,11.4 0,0 38.4,-2.6 57.3,-35.7 0,0 11.4,-20.6 9.4,-40.2 0,0 -0.5,-5.5 -4.4,-11.6 0,0 -4.3,0.3 -6,-4.6 0,0 -1.8,-4.7 3.2,-8 0,0 5.6,-2.1 9.8,4.3 0,0 9.5,12.4 3,39.9 0,0 -6,34 -33.5,51.8 0,0 -23.6,18.6 -62.9,14.2 0,0 -17.9,-2.2 -37.4,-7.8 0,0 -33.4,-9 -51.3,-5 0,0 -9.3,3.2 -12.7,8.9 0,0 -4.9,7 -1,8.7 m 186.6,-96 c 0,0 -1.3,3.3 -8.1,-2 0,0 -13.6,-12.6 0.3,-25.8 0,0 11.9,-9.6 26.5,10.2 0,0 12.1,21 -1,58.1 0,0 -4.2,11.7 -15.1,26.9 0,0 -5.7,7.3 -8,6 0,0 -2.7,-0.8 2.6,-9.5 0,0 15.1,-20 18.5,-46.6 0,0 3.7,-17 -4.6,-34.3 0,0 -5.7,-8.6 -13.2,-3.2 0,0 -7.2,6 -0.6,12.8 0,0 5,4.5 2.7,7.4" style="fill:#eff1f3;fill-opacity:1" id="path1" />
      <circle cx="78.5" cy="106.4" r="3.8" style="fill:#eff1f3;fill-opacity:1" id="circle1" />
      <circle cx="82" cy="144.39999" r="3.8" style="fill:#eff1f3;fill-opacity:1" id="circle2" />
      <circle cx="96.800003" cy="146.89999" r="3.8" style="fill:#eff1f3;fill-opacity:1" id="circle3" />
      <circle cx="110.3" cy="147.10001" r="3.8" style="fill:#eff1f3;fill-opacity:1" id="circle4" />
      <circle cx="124.1" cy="154.5" r="3.8" style="fill:#eff1f3;fill-opacity:1" id="circle5" />
      <circle cx="137.7" cy="155" r="3.8" style="fill:#eff1f3;fill-opacity:1" id="circle6" />
      <circle cx="149.8" cy="156.3" r="3.8" style="fill:#eff1f3;fill-opacity:1" id="circle7" />
      <circle cx="161.39999" cy="157.3" r="4.3000002" style="fill:#eff1f3;fill-opacity:1" id="circle8" />
      <circle cx="172.8" cy="159.2" r="4.3000002" style="fill:#eff1f3;fill-opacity:1" id="circle9" />
      <circle cx="189.60001" cy="156.89999" r="4.3000002" style="fill:#eff1f3;fill-opacity:1" id="circle10" />
      <circle cx="101.5" cy="106.4" r="5.9000001" style="fill:#eff1f3;fill-opacity:1" id="circle11" />
      <circle cx="123.8" cy="107" r="5.9000001" style="fill:#eff1f3;fill-opacity:1" id="circle12" />
      <circle cx="118.7" cy="89.800003" r="5.9000001" style="fill:#eff1f3;fill-opacity:1" id="circle13" />
      <circle cx="132.89999" cy="79.199997" r="5.9000001" style="fill:#eff1f3;fill-opacity:1" id="circle14" />
      <circle cx="119.7" cy="121" r="5.9000001" style="fill:#eff1f3;fill-opacity:1" id="circle15" />
      <circle cx="89.099998" cy="103" r="4.3000002" style="fill:#eff1f3;fill-opacity:1" id="circle16" />
      <circle cx="105" cy="119" r="4.9000001" style="fill:#eff1f3;fill-opacity:1" id="circle17" />
      <circle cx="112.3" cy="99.800003" r="4.6999998" style="fill:#eff1f3;fill-opacity:1" id="circle18" />
      <circle cx="130.39999" cy="95.5" r="4.6999998" style="fill:#eff1f3;fill-opacity:1" id="circle19" />
      <circle cx="171.39999" cy="121.6" r="6.0999999" style="fill:#eff1f3;fill-opacity:1" id="circle20" />
      <circle cx="154.60001" cy="112.7" r="6.0999999" style="fill:#eff1f3;fill-opacity:1" id="circle21" />
      <circle cx="151" cy="126.5" r="6" style="fill:#eff1f3;fill-opacity:1" id="circle22" />
      <circle cx="155.89999" cy="64.699997" r="4.1999998" style="fill:#eff1f3;fill-opacity:1" id="circle23" />
      <circle cx="182.10001" cy="76.300003" r="5.0999999" style="fill:#eff1f3;fill-opacity:1" id="circle24" />
      <circle cx="234.39999" cy="21.5" r="4.1999998" style="fill:#eff1f3;fill-opacity:1" id="circle25" />
      <circle cx="245.10001" cy="18.299999" r="4.1999998" style="fill:#eff1f3;fill-opacity:1" id="circle26" />
      <circle cx="270.70001" cy="64.900002" r="5.1999998" style="fill:#eff1f3;fill-opacity:1" id="circle27" />
      <circle cx="331.5" cy="57.299999" r="4.5999999" style="fill:#eff1f3;fill-opacity:1" id="circle28" />
      <circle cx="340.39999" cy="66.800003" r="4.5999999" style="fill:#eff1f3;fill-opacity:1" id="circle29" />
      <circle cx="355.89999" cy="70.699997" r="3.8" style="fill:#eff1f3;fill-opacity:1" id="circle30" />
      <circle cx="382.29999" cy="86.300003" r="3.8" style="fill:#eff1f3;fill-opacity:1" id="circle31" />
      <circle cx="395.20001" cy="93.400002" r="3.3" style="fill:#eff1f3;fill-opacity:1" id="circle32" />
      <circle cx="411.10001" cy="103.2" r="3.3" style="fill:#eff1f3;fill-opacity:1" id="circle33" />
      <circle cx="399.29999" cy="103.9" r="3.3" style="fill:#eff1f3;fill-opacity:1" id="circle34" />
      <circle cx="390.39999" cy="108" r="4" style="fill:#eff1f3;fill-opacity:1" id="circle35" />
      <circle cx="382.79999" cy="115.2" r="4" style="fill:#eff1f3;fill-opacity:1" id="circle36" />
      <circle cx="420" cy="115.5" r="3.5" style="fill:#eff1f3;fill-opacity:1" id="circle37" />
      <circle cx="424.70001" cy="127.4" r="3.5" style="fill:#eff1f3;fill-opacity:1" id="circle38" />
      <circle cx="428.29999" cy="144.39999" r="3.5" style="fill:#eff1f3;fill-opacity:1" id="circle39" />
      <circle cx="435.39999" cy="154.10001" r="3.5" style="fill:#eff1f3;fill-opacity:1" id="circle40" />
      <circle cx="435.20001" cy="137.10001" r="2.9000001" style="fill:#eff1f3;fill-opacity:1" id="circle41" />
      <circle cx="438.60001" cy="145.3" r="2.9000001" style="fill:#eff1f3;fill-opacity:1" id="circle42" />
      <circle cx="444.39999" cy="137.60001" r="2.9000001" style="fill:#eff1f3;fill-opacity:1" id="circle43" />
      <circle cx="446.39999" cy="130.39999" r="2.9000001" style="fill:#eff1f3;fill-opacity:1" id="circle44" />
      <circle cx="454.10001" cy="131.5" r="2.9000001" style="fill:#eff1f3;fill-opacity:1" id="circle45" />
      <circle cx="454.39999" cy="139.89999" r="2.9000001" style="fill:#eff1f3;fill-opacity:1" id="circle46" />
      <circle cx="452.10001" cy="174.8" r="2.9000001" style="fill:#eff1f3;fill-opacity:1" id="circle47" />
      <circle cx="446.29999" cy="200.7" r="2.9000001" style="fill:#eff1f3;fill-opacity:1" id="circle48" />
      <circle cx="467.89999" cy="146.3" r="2.9000001" style="fill:#eff1f3;fill-opacity:1" id="circle49" />
      <circle cx="481.10001" cy="149.89999" r="2.9000001" style="fill:#eff1f3;fill-opacity:1" id="circle50" />
      <circle cx="448.29999" cy="145.8" r="2.9000001" style="fill:#eff1f3;fill-opacity:1" id="circle51" />
      <circle cx="456.39999" cy="148.3" r="2.9000001" style="fill:#eff1f3;fill-opacity:1" id="circle52" />
      <circle cx="444.79999" cy="154.5" r="2.9000001" style="fill:#eff1f3;fill-opacity:1" id="circle53" />
      <circle cx="431.29999" cy="175.39999" r="2.9000001" style="fill:#eff1f3;fill-opacity:1" id="circle54" />
      <circle cx="433.10001" cy="165.10001" r="2.9000001" style="fill:#eff1f3;fill-opacity:1" id="circle55" />
      <circle cx="439.70001" cy="163.3" r="2.9000001" style="fill:#eff1f3;fill-opacity:1" id="circle56" />
      <circle cx="446.60001" cy="162.60001" r="2.9000001" style="fill:#eff1f3;fill-opacity:1" id="circle57" />
      <circle cx="445.20001" cy="171.8" r="2.9000001" style="fill:#eff1f3;fill-opacity:1" id="circle58" />
      <circle cx="433" cy="183.2" r="2.9000001" style="fill:#eff1f3;fill-opacity:1" id="circle59" />
      <circle cx="434.10001" cy="191.39999" r="2.9000001" style="fill:#eff1f3;fill-opacity:1" id="circle60" />
      <circle cx="442.29999" cy="192.89999" r="2.9000001" style="fill:#eff1f3;fill-opacity:1" id="circle61" />
      <circle cx="439.70001" cy="177.3" r="2.9000001" style="fill:#eff1f3;fill-opacity:1" id="circle62" />
      <circle cx="442.20001" cy="184.8" r="2.9000001" style="fill:#eff1f3;fill-opacity:1" id="circle63" />
      <circle cx="454.5" cy="185.89999" r="2.9000001" style="fill:#eff1f3;fill-opacity:1" id="circle64" />
      <circle cx="452.20001" cy="195.60001" r="3.3" style="fill:#eff1f3;fill-opacity:1" id="circle65" />
      <circle cx="438.39999" cy="200.7" r="2.9000001" style="fill:#eff1f3;fill-opacity:1" id="circle66" />
      <circle cx="426.29999" cy="193.89999" r="2.9000001" style="fill:#eff1f3;fill-opacity:1" id="circle67" />
      <circle cx="428" cy="202.10001" r="2.9000001" style="fill:#eff1f3;fill-opacity:1" id="circle68" />
      <circle cx="420.60001" cy="199.5" r="2.9000001" style="fill:#eff1f3;fill-opacity:1" id="circle69" />
      <circle cx="458.20001" cy="177.39999" r="2.9000001" style="fill:#eff1f3;fill-opacity:1" id="circle70" />
      <circle cx="462.10001" cy="168.10001" r="2.9000001" style="fill:#eff1f3;fill-opacity:1" id="circle71" />
      <circle cx="465.39999" cy="178.60001" r="2.9000001" style="fill:#eff1f3;fill-opacity:1" id="circle72" />
      <circle cx="476.10001" cy="185.60001" r="2.9000001" style="fill:#eff1f3;fill-opacity:1" id="circle73" />
      <circle cx="479.79999" cy="178" r="2.9000001" style="fill:#eff1f3;fill-opacity:1" id="circle74" />
      <circle cx="483.20001" cy="186.89999" r="2.9000001" style="fill:#eff1f3;fill-opacity:1" id="circle75" />
      <circle cx="480" cy="195.10001" r="2.9000001" style="fill:#eff1f3;fill-opacity:1" id="circle76" />
      <circle cx="485.70001" cy="207" r="2.9000001" style="fill:#eff1f3;fill-opacity:1" id="circle77" />
      <circle cx="488.79999" cy="200" r="2.9000001" style="fill:#eff1f3;fill-opacity:1" id="circle78" />
      <circle cx="489.60001" cy="192.39999" r="2.9000001" style="fill:#eff1f3;fill-opacity:1" id="circle79" />
      <circle cx="483.60001" cy="170.5" r="2.9000001" style="fill:#eff1f3;fill-opacity:1" id="circle80" />
      <circle cx="469.5" cy="161.8" r="2.9000001" style="fill:#eff1f3;fill-opacity:1" id="circle81" />
      <circle cx="477.10001" cy="142.7" r="2.9000001" style="fill:#eff1f3;fill-opacity:1" id="circle82" />
      <circle cx="473.39999" cy="152.39999" r="2.9000001" style="fill:#eff1f3;fill-opacity:1" id="circle83" />
      <circle cx="479.5" cy="159.8" r="2.9000001" style="fill:#eff1f3;fill-opacity:1" id="circle84" />
      <circle cx="476.39999" cy="168.2" r="3" style="fill:#eff1f3;fill-opacity:1" id="circle85" />
      <circle cx="493.5" cy="170.10001" r="3" style="fill:#eff1f3;fill-opacity:1" id="circle86" />
      <circle cx="453.89999" cy="156.3" r="3.7" style="fill:#eff1f3;fill-opacity:1" id="circle87" />
      <circle cx="490.60001" cy="150.2" r="3.7" style="fill:#eff1f3;fill-opacity:1" id="circle88" />
      <circle cx="454.39999" cy="166.3" r="3.7" style="fill:#eff1f3;fill-opacity:1" id="circle89" />
      <circle cx="358.70001" cy="130.10001" r="4" style="fill:#eff1f3;fill-opacity:1" id="circle90" />
      <circle cx="349.20001" cy="138.7" r="3.3" style="fill:#eff1f3;fill-opacity:1" id="circle91" />
      <circle cx="349.89999" cy="148.7" r="3.3" style="fill:#eff1f3;fill-opacity:1" id="circle92" />
      <circle cx="345.70001" cy="158.10001" r="3.7" style="fill:#eff1f3;fill-opacity:1" id="circle93" />
      <circle cx="338.29999" cy="162.8" r="3.7" style="fill:#eff1f3;fill-opacity:1" id="circle94" />
      <circle cx="343.5" cy="171.89999" r="3.7" style="fill:#eff1f3;fill-opacity:1" id="circle95" />
      <circle cx="330.39999" cy="174.60001" r="3.7" style="fill:#eff1f3;fill-opacity:1" id="circle96" />
      <circle cx="322.70001" cy="184.7" r="3.2" style="fill:#eff1f3;fill-opacity:1" id="circle97" />
      <circle cx="348.20001" cy="182" r="3.5" style="fill:#eff1f3;fill-opacity:1" id="circle98" />
      <circle cx="336.70001" cy="183.3" r="3.5" style="fill:#eff1f3;fill-opacity:1" id="circle99" />
      <circle cx="331.70001" cy="190.89999" r="3.7" style="fill:#eff1f3;fill-opacity:1" id="circle100" />
      <circle cx="325.29999" cy="197.89999" r="3.7" style="fill:#eff1f3;fill-opacity:1" id="circle101" />
      <circle cx="310" cy="212.3" r="4" style="fill:#eff1f3;fill-opacity:1" id="circle102" />
      <circle cx="324.20001" cy="216" r="4" style="fill:#eff1f3;fill-opacity:1" id="circle103" />
      <circle cx="318.5" cy="206" r="3.7" style="fill:#eff1f3;fill-opacity:1" id="circle104" />
      <circle cx="299.29999" cy="218.7" r="3.7" style="fill:#eff1f3;fill-opacity:1" id="circle105" />
      <circle cx="294.79999" cy="232.2" r="3.0999999" style="fill:#eff1f3;fill-opacity:1" id="circle106" />
      <circle cx="303.79999" cy="229.8" r="3.0999999" style="fill:#eff1f3;fill-opacity:1" id="circle107" />
      <circle cx="318.10001" cy="230.89999" r="3.0999999" style="fill:#eff1f3;fill-opacity:1" id="circle108" />
      <circle cx="314.29999" cy="244.5" r="2.8" style="fill:#eff1f3;fill-opacity:1" id="circle109" />
      <circle cx="317.79999" cy="249.8" r="2.8" style="fill:#eff1f3;fill-opacity:1" id="circle110" />
      <circle cx="324.70001" cy="246.8" r="2.8" style="fill:#eff1f3;fill-opacity:1" id="circle111" />
      <circle cx="329.39999" cy="208.2" r="3.7" style="fill:#eff1f3;fill-opacity:1" id="circle112" />
      <circle cx="324.10001" cy="225" r="3.7" style="fill:#eff1f3;fill-opacity:1" id="circle113" />
      <circle cx="331.29999" cy="229.8" r="3.7" style="fill:#eff1f3;fill-opacity:1" id="circle114" />
      <circle cx="337.79999" cy="239.60001" r="3.7" style="fill:#eff1f3;fill-opacity:1" id="circle115" />
      <circle cx="335.29999" cy="249.39999" r="3.7" style="fill:#eff1f3;fill-opacity:1" id="circle116" />
      <circle cx="344.60001" cy="249.60001" r="3.7" style="fill:#eff1f3;fill-opacity:1" id="circle117" />
      <circle cx="353.60001" cy="245.89999" r="3.7" style="fill:#eff1f3;fill-opacity:1" id="circle118" />
      <circle cx="346.89999" cy="236.5" r="3.7" style="fill:#eff1f3;fill-opacity:1" id="circle119" />
      <circle cx="346.79999" cy="236.39999" r="3.7" style="fill:#eff1f3;fill-opacity:1" id="circle120" />
      <circle cx="329.39999" cy="237.7" r="3.7" style="fill:#eff1f3;fill-opacity:1" id="circle121" />
      <circle cx="310.89999" cy="223.10001" r="3.9000001" style="fill:#eff1f3;fill-opacity:1" id="circle122" />
      <circle cx="311.89999" cy="236.89999" r="3.9000001" style="fill:#eff1f3;fill-opacity:1" id="circle123" />
      <circle cx="351.70001" cy="219.60001" r="3.7" style="fill:#eff1f3;fill-opacity:1" id="circle124" />
      <circle cx="341.5" cy="209.2" r="3.7" style="fill:#eff1f3;fill-opacity:1" id="circle125" />
      <circle cx="351.89999" cy="210.89999" r="3.0999999" style="fill:#eff1f3;fill-opacity:1" id="circle126" />
      <circle cx="344.60001" cy="223.5" r="3.0999999" style="fill:#eff1f3;fill-opacity:1" id="circle127" />
      <circle cx="316.20001" cy="194.2" r="3.7" style="fill:#eff1f3;fill-opacity:1" id="circle128" />
      <circle cx="310.39999" cy="202.89999" r="3.7" style="fill:#eff1f3;fill-opacity:1" id="circle129" />
      <circle cx="342.79999" cy="192.39999" r="3.5" style="fill:#eff1f3;fill-opacity:1" id="circle130" />
      <circle cx="352.70001" cy="194.39999" r="2.9000001" style="fill:#eff1f3;fill-opacity:1" id="circle131" />
      <circle cx="346.70001" cy="202.39999" r="2.9000001" style="fill:#eff1f3;fill-opacity:1" id="circle132" />
      <circle cx="333.60001" cy="222.89999" r="2.9000001" style="fill:#eff1f3;fill-opacity:1" id="circle133" />
      <circle cx="337.5" cy="216.5" r="2.9000001" style="fill:#eff1f3;fill-opacity:1" id="circle134" />
      <circle cx="339.5" cy="230.8" r="2.9000001" style="fill:#eff1f3;fill-opacity:1" id="circle135" />
      <circle cx="355.70001" cy="231.10001" r="2.9000001" style="fill:#eff1f3;fill-opacity:1" id="circle136" />
      <circle cx="336.39999" cy="200.89999" r="2.9000001" style="fill:#eff1f3;fill-opacity:1" id="circle137" />
      <circle cx="384.79999" cy="97" r="4.5" style="fill:#eff1f3;fill-opacity:1" id="circle138" />
      <circle cx="359.79999" cy="81" r="5" style="fill:#eff1f3;fill-opacity:1" id="circle139" />
      <circle cx="370.39999" cy="87.099998" r="5" style="fill:#eff1f3;fill-opacity:1" id="circle140" />
      <circle cx="356.20001" cy="94.699997" r="5.3000002" style="fill:#eff1f3;fill-opacity:1" id="circle141" />
      <circle cx="358.10001" cy="113" r="5.3000002" style="fill:#eff1f3;fill-opacity:1" id="circle142" />
      <circle cx="371" cy="123.7" r="6.0999999" style="fill:#eff1f3;fill-opacity:1" id="circle143" />
      <circle cx="370.89999" cy="102.7" r="5.5" style="fill:#eff1f3;fill-opacity:1" id="circle144" />
      <circle cx="262.60001" cy="106.2" r="5.1999998" style="fill:#eff1f3;fill-opacity:1" id="circle145" />
      <circle cx="282.39999" cy="106.3" r="5.1999998" style="fill:#eff1f3;fill-opacity:1" id="circle146" />
      <circle cx="318" cy="98.300003" r="5.8000002" style="fill:#eff1f3;fill-opacity:1" id="circle147" />
      <circle cx="289" cy="69.699997" r="6.3000002" style="fill:#eff1f3;fill-opacity:1" id="circle148" />
      <circle cx="307.5" cy="82.400002" r="6.3000002" style="fill:#eff1f3;fill-opacity:1" id="circle149" />
      <circle cx="287.70001" cy="89.099998" r="5.9000001" style="fill:#eff1f3;fill-opacity:1" id="circle150" />
      <circle cx="301.20001" cy="102.5" r="5.3000002" style="fill:#eff1f3;fill-opacity:1" id="circle151" />
      <circle cx="306.89999" cy="120.2" r="5.3000002" style="fill:#eff1f3;fill-opacity:1" id="circle152" />
      <circle cx="291" cy="124.9" r="5.3000002" style="fill:#eff1f3;fill-opacity:1" id="circle153" />
      <circle cx="270.79999" cy="123.2" r="5.3000002" style="fill:#eff1f3;fill-opacity:1" id="circle154" />
      <circle cx="255.3" cy="122.3" r="4.9000001" style="fill:#eff1f3;fill-opacity:1" id="circle155" />
      <circle cx="237.60001" cy="145.7" r="4.9000001" style="fill:#eff1f3;fill-opacity:1" id="circle156" />
      <circle cx="218.89999" cy="146" r="4.9000001" style="fill:#eff1f3;fill-opacity:1" id="circle157" />
      <circle cx="262" cy="139.7" r="4.9000001" style="fill:#eff1f3;fill-opacity:1" id="circle158" />
      <circle cx="280.79999" cy="141.3" r="4.9000001" style="fill:#eff1f3;fill-opacity:1" id="circle159" />
      <circle cx="278.39999" cy="156.8" r="4.9000001" style="fill:#eff1f3;fill-opacity:1" id="circle160" />
      <circle cx="276.10001" cy="168.8" r="3.9000001" style="fill:#eff1f3;fill-opacity:1" id="circle161" />
      <circle cx="273.70001" cy="180.2" r="3.9000001" style="fill:#eff1f3;fill-opacity:1" id="circle162" />
      <circle cx="284.20001" cy="192.60001" r="3.9000001" style="fill:#eff1f3;fill-opacity:1" id="circle163" />
      <circle cx="296.60001" cy="181.39999" r="3.9000001" style="fill:#eff1f3;fill-opacity:1" id="circle164" />
      <circle cx="285" cy="181.7" r="3.9000001" style="fill:#eff1f3;fill-opacity:1" id="circle165" />
      <circle cx="289.70001" cy="168.8" r="4.3000002" style="fill:#eff1f3;fill-opacity:1" id="circle166" />
      <circle cx="272.10001" cy="189.8" r="3.7" style="fill:#eff1f3;fill-opacity:1" id="circle167" />
      <circle cx="270.79999" cy="198.3" r="3.2" style="fill:#eff1f3;fill-opacity:1" id="circle168" />
      <circle cx="279.70001" cy="203.7" r="3.5" style="fill:#eff1f3;fill-opacity:1" id="circle169" />
      <circle cx="270.39999" cy="207.10001" r="3.5" style="fill:#eff1f3;fill-opacity:1" id="circle170" />
      <circle cx="271.39999" cy="219" r="3.5" style="fill:#eff1f3;fill-opacity:1" id="circle171" />
      <circle cx="265.70001" cy="225.60001" r="3.5" style="fill:#eff1f3;fill-opacity:1" id="circle172" />
      <circle cx="277.5" cy="212.10001" r="3.5" style="fill:#eff1f3;fill-opacity:1" id="circle173" />
      <circle cx="304.60001" cy="167.2" r="5.5" style="fill:#eff1f3;fill-opacity:1" id="circle174" />
      <circle cx="245" cy="134.3" r="5.3000002" style="fill:#eff1f3;fill-opacity:1" id="circle175" />
      <circle cx="323" cy="115.2" r="6" style="fill:#eff1f3;fill-opacity:1" id="circle176" />
      <circle cx="299.29999" cy="139.2" r="6" style="fill:#eff1f3;fill-opacity:1" id="circle177" />
      <circle cx="315.39999" cy="134.89999" r="6" style="fill:#eff1f3;fill-opacity:1" id="circle178" />
      <circle cx="314.79999" cy="152.3" r="5.6999998" style="fill:#eff1f3;fill-opacity:1" id="circle179" />
      <circle cx="293.89999" cy="154.7" r="6.0999999" style="fill:#eff1f3;fill-opacity:1" id="circle180" />
      <circle cx="269" cy="89" r="6.3000002" style="fill:#eff1f3;fill-opacity:1" id="circle181" />
      <circle cx="193.8" cy="50.299999" r="5.0999999" style="fill:#eff1f3;fill-opacity:1" id="circle182" />
      <circle cx="207.89999" cy="38.200001" r="4.8000002" style="fill:#eff1f3;fill-opacity:1" id="circle183" />
      <circle cx="220.60001" cy="40.599998" r="4.8000002" style="fill:#eff1f3;fill-opacity:1" id="circle184" />
      <circle cx="228.10001" cy="97.900002" r="5.0999999" style="fill:#eff1f3;fill-opacity:1" id="circle185" />
      <circle cx="169.3" cy="106.5" r="5.5999999" style="fill:#eff1f3;fill-opacity:1" id="circle186" />
      <circle cx="188.60001" cy="128.7" r="5.5999999" style="fill:#eff1f3;fill-opacity:1" id="circle187" />
      <circle cx="142.89999" cy="87.199997" r="5.3000002" style="fill:#eff1f3;fill-opacity:1" id="circle188" />
      <circle cx="166.8" cy="68.400002" r="5.5" style="fill:#eff1f3;fill-opacity:1" id="circle189" />
      <circle cx="155.10001" cy="77.099998" r="5.6999998" style="fill:#eff1f3;fill-opacity:1" id="circle190" />
      <circle cx="169.7" cy="84.599998" r="6.3000002" style="fill:#eff1f3;fill-opacity:1" id="circle191" />
      <circle cx="184.39999" cy="97" r="6.3000002" style="fill:#eff1f3;fill-opacity:1" id="circle192" />
      <circle cx="200.3" cy="105.4" r="6.3000002" style="fill:#eff1f3;fill-opacity:1" id="circle193" />
      <circle cx="212.2" cy="92.5" r="6.3000002" style="fill:#eff1f3;fill-opacity:1" id="circle194" />
      <circle cx="227.60001" cy="59.599998" r="6.3000002" style="fill:#eff1f3;fill-opacity:1" id="circle195" />
      <circle cx="208.7" cy="73.599998" r="6.3000002" style="fill:#eff1f3;fill-opacity:1" id="circle196" />
      <circle cx="179" cy="58.599998" r="5.6999998" style="fill:#eff1f3;fill-opacity:1" id="circle197" />
      <circle cx="186.39999" cy="114.6" r="6.3000002" style="fill:#eff1f3;fill-opacity:1" id="circle198" />
      <circle cx="135.60001" cy="118.6" r="5.3000002" style="fill:#eff1f3;fill-opacity:1" id="circle199" />
      <circle cx="203" cy="123.3" r="5.3000002" style="fill:#eff1f3;fill-opacity:1" id="circle200" />
      <circle cx="217" cy="112.3" r="5" style="fill:#eff1f3;fill-opacity:1" id="circle201" />
      <circle cx="196.5" cy="87" r="5.8000002" style="fill:#eff1f3;fill-opacity:1" id="circle202" />
      <circle cx="190.7" cy="65.099998" r="5.8000002" style="fill:#eff1f3;fill-opacity:1" id="circle203" />
      <circle cx="227.10001" cy="80" r="5.5999999" style="fill:#eff1f3;fill-opacity:1" id="circle204" />
      <circle cx="210.10001" cy="53.299999" r="6.3000002" style="fill:#eff1f3;fill-opacity:1" id="circle205" />
      <circle cx="224.8" cy="28" r="5.5" style="fill:#eff1f3;fill-opacity:1" id="circle206" />
      <circle cx="257.79999" cy="18.1" r="6.6999998" style="fill:#eff1f3;fill-opacity:1" id="circle207" />
      <circle cx="140.39999" cy="105.3" r="6.1999998" style="fill:#eff1f3;fill-opacity:1" id="circle208" />
      <circle cx="155.8" cy="93.800003" r="6.5" style="fill:#eff1f3;fill-opacity:1" id="circle209" />
      <circle cx="103.1" cy="93.800003" r="4.3000002" style="fill:#eff1f3;fill-opacity:1" id="circle210" />
      <circle cx="92.400002" cy="117.1" r="4.9000001" style="fill:#eff1f3;fill-opacity:1" id="circle211" />
      <path
         d="m 286.4,50.4 c 0,0 6.1,-0.6 6,3.3 0,0 1.1,4.7 -8,4 0,0 -20.3,-1.9 -18.6,-19.4 0,0 2,-15.6 21.1,-10.9 0,0 21.4,5.2 34.2,23.2 0,0 2.5,2.6 1.2,3.8 0,0 -1,1.3 -4.4,-2.4 0,0 -9.1,-9.2 -26.9,-15.6 0,0 -13.2,-4.9 -15.4,3 0,0 -3,9.8 10.8,11 m -8.3,-11 c 0,0 0.7,-4.3 8.7,-1.6 0,0 40.6,16 54.4,45.9 0,0 12,24 2.7,50.5 0,0 -9,27.7 -27.6,50.3 0,0 -22.1,29 -27.7,39.5 0,0 -8.8,14.2 -2.2,19.8 0,0 4,3 6.3,-0.1 0,0 3.6,-7.5 8.1,-5.4 0,0 4.2,1.4 -0.5,12 0,0 -5.3,11.7 -19.4,5.7 0,0 -13.5,-7.3 -8.9,-24.9 0,0 4.3,-13.8 18.2,-29.3 0,0 17.8,-19 32.6,-46.6 0,0 15.6,-29.6 13.5,-49.8 0,0 -2.7,-23.8 -23.5,-40.6 0,0 -13,-11.1 -26.9,-18.7 0,0 -8.1,-3.5 -7.8,-6.7 m 78.6,186.7 c 0,0 3.8,10.6 8.8,17.8 0,0 1.6,2.6 3,1.9 0,0 1.4,-0.3 -1.8,-4.7 0,0 -7.8,-11.3 -7.5,-27.2 0,0 0.2,-7.6 2.6,-14.6 0,0 4.4,-13.2 -1,-22 0,0 -6.7,-9.7 -4.5,-13.7 l 4.1,-14.2 c 0,0 1.5,-6.1 8.3,-5.1 0,0 8.2,2.8 14.8,-4.7 0,0 9,-13.4 14.6,-18.1 0,0 11.3,-9.5 12.4,-8 0,0 1,0.2 -0.8,2.7 0,0 -2.8,4.2 0.6,6.8 0,0 2.4,1.5 1.3,3.3 0,0 -6,8 6.5,9.9 0,0 5.9,0.3 2,6.2 0,0 -7.4,8.8 1.2,12.3 0,0 8.7,1.5 5.6,7.2 0,0 -2.8,5 -5.9,9 0,0 -7,8.3 1.3,11.8 0,0 4.6,2 -1.9,4.7 -0.8,0.3 -15.8,7.7 -11,16 0,0 1.3,2 3.1,3.2 0,0 2.3,2 -4,3.7 0,0 -7.8,3 -13.8,0.6 0,0 -5,-2.1 -6.5,-3.4 0,0 -6.4,-6.3 -14.6,4.8 0,0 -8,12.7 1.4,28.6 0,0 7.3,12.2 10,10.5 0,0 2.7,-0.2 -4.6,-11.8 0,0 -8.7,-14.2 -2.6,-21.8 0,0 5.6,-8.1 11.3,-4.2 0,0 9.6,6.6 20.6,-1 0,0 9.8,-6.5 5,-8.6 0,0 -7.2,-2.8 -1.7,-8.1 0,0 3.2,-3.4 9.6,-6.4 0,0 10.8,-4.4 5.4,-8.8 0,0 -1.4,-0.8 -3.6,-1 0,0 -5,-1.3 -1.3,-5 0,0 10.5,-11.3 7.8,-19 0,0 -0.2,-4 -6.5,-4.5 0,0 -4,0 -2.7,-2.6 0,0 6.5,-11 3,-15 0,0 -0.5,-1.4 -5.3,-0.8 0,0 -4.6,1 -3.6,-2.7 0,0 4,-5.9 0.1,-8.8 0,0 -3.6,-1.2 -1.1,-4.7 0,0 3.5,-5.4 -1,-6.8 0,0 -4.5,-0.7 -12.3,4.8 0,0 -10,6.5 -17.3,20.7 0,0 -3.4,5 -9.3,3.5 0,0 -14.8,-5 -19.2,6 0,0 -4.3,15 -6.2,19.2 0,0 -2.9,5.5 1.4,12.9 l 3.8,6.3 c 0,0 3.3,6.5 1.6,14.7 0,0 -3.8,13.4 0.4,28.2 m 39.9,-98.9 c 0,0 2.4,0.7 0.7,7.2 0,0 -3.5,10.6 1.4,29.9 0,0 4.1,14.6 -7.5,24 0,0 -20.7,14.6 -22.4,21.2 0,0 -1.2,4.2 -2.3,4 0,0 -2,0 -1,-5 0,-0.5 2,-13.6 11.4,-19.1 0,0 14,-6.9 13,-22.5 0,0 -4.3,-22.7 2.8,-35.7 0,0 2.6,-4.4 4,-4 z m -47.3,128.2 c 0,0 1.2,3 7,-0.4 0,0 4.3,-4.2 16.6,-0.1 0,0 11.2,3.3 15.9,8.9 0,0 3.3,4.9 6,4.2 0,0 3.4,0 2.7,-7.7 0,0 -1.8,-20.4 7.6,-30.9 0,0 15.7,-18.2 19.9,-13 0.7,0.9 7.7,8.7 14,1.2 0,0 4.2,-5.5 9.7,-7 0,0 11.2,-4.2 14.2,-12.7 0,0 1.3,-5 2.5,-5 0,0 3.4,-0.7 1.2,8 0,0 -1.8,9.5 -6,18.6 0,0 -6,11.8 -4.4,29 0,0 1.8,20.7 -10.5,33.5 0,0 -11.5,11.1 -26,22.4 0,0 -30.4,23 -7.9,50.2 0,0 30.7,33.2 61.4,-12.5 0,0 14.3,-19.8 16.6,-68.7 0,0 2.7,-38.2 6.6,-54.6 0,0 2.4,-12.3 -0.3,-12.3 0,0 -3.4,0 -8,14 0,0 -6.5,21.4 -9.2,58.3 0,0 -4.7,90.8 -52.4,74.1 0,0 -18.2,-9 -10,-28.6 0,0 4.8,-10 20.8,-22.3 0,0 27.1,-19.5 24.7,-36.9 0,0 -2.3,-28.6 2.7,-40.7 0,0 12,-24.6 7.8,-36 0,0 -2.2,-5.3 -4.9,-5 0,0 -1.9,1 -3.9,6.3 0,0 -0.5,7.4 -10.3,11.3 0,0 -11.6,5.3 -18.2,10.2 0,0 -3.2,3 -6.7,-0.6 0,0 -3.4,-5.3 -9.1,-1.7 0,0 -21.9,10.4 -25,28.6 0,0 -1.6,10.5 -1.5,18.7 0,0 0.6,5.4 -1.8,2.4 0,0 -9.6,-8.1 -20.2,-10.3 0,0 -9.6,-2.7 -18.7,0.2 0,0 -5,2.7 -2.9,6.9 M 430,220.8 c 0,0 2.6,2 -1,5.4 0,0 -18.7,16.4 -17.8,47.2 0,0 0.8,7 -1.7,7.8 0,0 -4,0.5 -4.7,-6.4 0,0 -4.6,-40.8 19.7,-53.6 0,0 3.9,-2 5.5,-0.4 m 28,-4.2 c 0,0 2.7,3 -2.7,7.3 0,0 -11.3,8.7 -14,28.8 0,0 -2,13.7 -12.5,29.4 0,0 -3.8,5 -6.5,4.8 0,0 -3.5,-0.4 -2.7,-10.6 0,0 3.4,-39 30.3,-58 0,0 5.6,-4.5 8.1,-1.7 m -14.6,38.6 c 0,0 0.6,-7.6 4.4,-7.8 0,0 3.6,0.5 3,9.1 0,0 -0.3,27.8 -17.5,33.4 0,0 -4.7,1.7 -6.4,-1 0,0 -1.7,-1.8 3.2,-6.1 0,0 11.3,-11.9 13.3,-27.6 M 422,321.8 c 0,0 2.3,-1.8 5.5,4 0,0 4,8.5 3.6,16.7 0,0 -0.2,6.1 -6,5.5 0,0 -5.7,-0.8 -4.5,-8.6 0,0 2,-7.4 1.2,-11.3 0,0 -1.6,-4.7 0.3,-6.3 m 8.7,-9.3 c 0,0 2.8,-2.1 6.4,3.7 0,0 9,14.5 9.6,24.3 0,0 0,6.5 -5.8,7.2 0,0 -6.5,0.5 -6.7,-8.3 0,0 0.4,-11.3 -2.6,-19.1 0,0 -2.8,-5.8 -1,-7.8 m 11.1,-10.3 c 0,0 3.4,-2.6 9,5 0,0 7.4,10.5 7.5,21 0,0 0,6 -4.1,6.8 0,0 -6.6,1.3 -7,-8.9 0,0 -0.6,-11.5 -4,-17.2 0,0 -3.3,-5.3 -1.4,-6.7 m 11.7,-9 c 0,0 2.6,-2 6.8,2.1 0,0 7.2,8.2 7.4,16.1 0,0 0.3,5.9 -3.9,6.6 0,0 -5.3,1 -5.6,-6.3 0,0 0.6,-7 -2.8,-11.7 0,0 -4.2,-4.7 -1.9,-6.8 m 7.5,-10.7 c 0,0 1.9,-3.3 6,1.4 0,0 6.3,8.2 6.6,13.7 0,0 0.3,3.5 -2,4.6 0,0 -3.2,1.4 -5,-2.9 0,0 -1,-2.6 -0.9,-4.5 0,0 0.2,-4.8 -2.6,-7.3 0,0 -3.3,-2.7 -2,-5 z m 5.7,-12 c 0,0 2.4,-2 6.7,2.1 0,0 7,7.7 2,12 0,0 -3.6,2.8 -7.2,-3.7 -0.5,-0.8 -3.5,-9 -1.5,-10.4 m 0.5,-16.4 c 0,0 2.5,-1.9 6.8,2 0,0 7.1,7.3 1.9,11.2 0,0 -3.9,2.4 -7.2,-3.5 -0.5,-0.8 -3.5,-8.3 -1.5,-9.7 m 0.9,-15.2 c 0,0 2.5,-2 6.8,2 0,0 7.2,7.3 2,11.1 0,0 -4,2.4 -7.3,-3.4 -0.5,-0.8 -3.5,-8.3 -1.5,-9.7 m 3.9,-14.8 c 0,0 2.5,-1.9 6.8,2 0,0 7.2,7.3 2,11.2 0,0 -4,2.4 -7.3,-3.5 -0.5,-0.8 -3.5,-8.3 -1.5,-9.7 m 3.4,-14.3 c 0,0 2.5,-1.9 6.8,2 0,0 7.2,7.3 1.9,11.2 0,0 -3.9,2.4 -7.2,-3.5 -0.5,-0.8 -3.5,-8.3 -1.5,-9.7 M 45,193.7 c 0,0 0,-4.8 6,-4.7 0,0 8.2,0.9 13,-1.9 0,0 15.5,-7.2 21.6,-10.6 0,0 18,-11.6 29.3,1 0,0 13.3,15.8 15.5,30.1 0,0 0.9,6.7 -1.3,7.7 0,0 -2.3,2.2 -6,-5.7 0,0 -11.7,-26 -20.7,-27.2 0,0 -8.3,-2.2 -15.5,1.1 0,0 -13.7,6.7 -18.9,10 0,0 -7.5,5.1 -17.6,3.5 0,0 -5.5,-0.3 -5.3,-3.3 m 54.1,-27.2 c 0,0 -1,-2.3 7.2,-3.1 0,0 22.3,-2.8 28,15.3 0,0 1.8,7.1 0,8 0,0 -2,1.3 -5.3,-5.8 0,0 -6.8,-12.7 -23,-12.9 0,0 -6.1,0.6 -7,-1.5 m 39.6,7.5 c 0,0 -0.3,-2.1 6.4,-2.7 0,0 20.5,-1 25.3,1.8 0,0 3.6,2.2 5.2,-1 0,0 4,-9.4 7.6,-6.8 0,0 6.2,3 10.3,-2.5 0,0 4.5,-6.1 4.8,-11.5 0,0 -0.1,-4.5 1.7,-5.2 0,0 4.3,-1.8 10.1,4.3 0,0 3.5,3.5 4.8,5.4 0,0 -0.8,1.8 1.6,2.6 0,0 4,0.3 3.5,-3.1 0,0 -1.3,-4 4.8,-6 0,0 4.8,-1.2 6,1.5 0,0 1.3,4 4,4.2 0,0 2.2,0 5.5,-2 0,0 12.4,-7.7 18.7,-0.7 0,0 10,11.5 6,27.6 0,0 -1.5,5.8 -4.1,8.4 0,0 -2,2 1.4,2.8 0,0 5.1,0.8 3.9,6.7 0,0 -2.4,15.1 -8.4,25.4 0,0 -3,5.6 -9.8,1 0,0 -14.4,-8.2 -31.7,-3.7 0,0 -6,2.3 -6.5,1 0,0 -1.4,-2 5,-7 0,0 6.7,-5.6 18.2,-5 0,0 13.1,1 18.3,4.5 0,0 3,2.2 4.2,-0.8 0,0 4,-8 4,-13.3 0,0 0.3,-2.5 -2,-3.5 0,0 -4.7,-1.9 -8.4,-2.4 0,0 -3.8,-0.6 -4.2,-1.7 0,0 -0.8,-1.8 3.1,-3.7 0,0 10.9,-3.7 10.9,-16.1 0,0 -1,-17.7 -7.1,-16.6 0,0 -5.8,0.2 -10.1,3.6 0,0 -5.6,5.7 -9.5,-0.5 0,0 -2.1,-4.4 -4.3,-3.3 0,0 -3.7,2.7 -4.5,5.3 0,0 -3.3,6.5 -6,1.6 0,0 -2.9,-4.5 -6.7,-2.4 0,0 -1.9,1 -1.3,2.4 0,0 0.7,1.2 2.5,1.5 0,0 7.4,2.5 10.2,12.3 0,0 4.2,12.8 -6.3,16.4 0,0 -5.3,1.2 -7.6,-3.4 0,0 -1.5,-3 0,-8.9 0,0 1.8,-7 -4.5,-12 0,0 -4.2,-3 -6.7,0.1 0,0 -5.7,6.4 -3,16.4 0,0 1.8,5.2 4,8.6 0,0 4.9,9 -0.2,11.6 0,0 -5,2.3 -7.5,-4.8 0,0 -1.2,-7.6 -8,-15 0,0 -3.4,-3.3 -3.7,-6.7 0,0 -0.4,-2.4 -2.5,-1.9 0,0 -1.7,0.5 -1.6,3 0,0 0.5,3 -6.5,0.9 0,0 -9,-1.6 -15.2,-4.2 0,0 -5.4,-1.5 -9.9,-1 0,0 -4.2,0.4 -4.2,-1.6 m 99.2,1.4 c 0,0 6.2,2 -0.6,13.2 0,0 -7.6,11 -20.7,19.8 0,0 -25,18 -26.4,32.2 0,0 -3,23.4 23.9,32.1 0,0 12,2.6 11.6,7.7 0,0 -2.2,6.2 -16.4,3.7 0,0 -42.8,-8 -37.4,-43.9 0,0 5.5,-23.3 27.2,-34 0,0 22.8,-11.5 28.7,-22.5 0,0 4.1,-9 10,-8.3 z m -39.5,65.2 c 0,0 6,-12.6 21.8,-5 0,0 11,6.2 15.4,13.4 0,0 4,6.5 1,11.9 0,0 -4.1,4.9 -11.5,-0.7 0,0 -5,-4.6 -17,-5.8 0,0 -13.4,-2.2 -9.7,-13.8 m 69.2,-10.3 c 0,0 3.7,1 2.7,6.8 0,0 -3.4,15 7.6,20.4 0,0 15.6,6.5 22.4,-3.4 0,0 1.7,-2.2 2.4,-5.9 0,0 0.6,-4.7 4.3,-4.2 0,0 5.8,0.8 1.8,12.5 0,0 -7.5,20 -31.9,11.5 0,0 -21.4,-8.5 -14.1,-32.7 0,0 2,-5.6 4.8,-5 m -5.6,-1.8 c 0,0 3.4,2.8 -2,8.2 0,0 -5.7,5.7 -4.7,14.8 0,0 2,8.2 10.5,14.5 0,0 61.6,38.5 75.7,52.5 0,0 29.2,22.3 35.7,26.2 0,0 -18.4,-21.4 -27.6,-30 0,0 -26,-26.3 -53.1,-36.4 0,0 -8.8,-2.8 -8.5,-4.4 0,0 -0.1,-2.5 10.2,-0.7 0,0 24.6,4.8 43.8,22 0,0 23,21.4 33.3,39.2 0,0 -10.7,-27.3 -35.2,-46.8 0,0 -10.8,-8.4 -32.9,-16.6 0,0 -5,-1.6 -4.6,-3.7 0,0 0.7,-2.4 8.4,-1 0,0 25,5 40.6,22 0,0 16.4,17 25,34.5 0,0 -3.3,-23 -17.4,-36.3 0,0 -14.3,-14.5 -27.5,-19 0,0 -5.4,-1.9 -5.2,-2.8 0,-1.9 8.2,-1 11.6,0.1 0,0 35.2,7 45.7,53.2 0,0 2.7,22.8 4.7,26.5 0,0 -2.8,-20.3 -3,-27.6 0,0 2.2,-39.2 -40,-54.7 0,0 -11.1,-3 -10.7,-6 0,0 0.5,-3 13.4,0.1 0,0 33.5,8.5 42.1,43 0,0 2,11.3 2,19.6 0,0 0.5,19.6 4.4,24.5 0,0 -2.2,-19.6 -2.2,-28.3 0,0 0.2,-24.5 -12.2,-39.4 0,0 -10.7,-11.5 -21,-16.1 0,0 -5.7,-2 -5,-3.5 0,0 2,-3.5 12.3,0 0,0 34.8,13 30.6,57.7 0,0 -0.5,33.4 4.8,40.5 0,0 3,3.3 9.5,7 0,0 12.1,6.2 6.3,18.9 0,0 -4.6,8.5 -20.3,1 0,0 -10,-4.9 -13.2,-7.2 -3.2,-2.3 -17.3,-6 -32.5,-4.2 0,0 -36,7.6 -59.9,-4.3 0,0 -13.6,-7.6 -23,-20 0,0 -3.3,-4.4 -2,-6.5 0,0 1.6,-2 8.9,5.9 0,0 16.1,17.8 38.1,21 0,0 20.8,1.6 32.7,-0.9 0,0 20.5,-3 27.8,-2 0,0 -8,-3.7 -25.3,-1.1 0,0 -41.8,8 -63,-12.7 0,0 -15.9,-15.2 -26.6,-39.5 0,0 -3.9,-9.2 -1.5,-11 0,0 2.7,-3.7 10,10.3 0,0 14,31.4 43.1,42.2 0,0 24.9,8.2 47.6,2.2 0,0 -24.6,-3.7 -33.9,-5.5 0,0 -30.5,-4.3 -46.8,-27.9 0,0 -12,-16.4 -13.8,-21 0,0 -1.7,-3.4 -0.6,-4.7 0,0 2.3,-2 5.7,4.2 0,0 15.7,26.5 33.2,35.2 0,0 24.8,11.3 49.1,11.4 0,0 -30,-3.7 -56.3,-28 0,0 -16.7,-16.1 -25,-25.8 0,0 -3.3,-3.5 -1.9,-5 0,0 1.8,-2.1 9.4,4.9 0,0 18.2,17.3 27.6,24 0,0 35.8,21.1 52.7,24.8 0,0 -36,-25.6 -53.1,-38 0,0 -32.3,-22.4 -39.3,-26 0,0 -35.3,-19 -13.6,-44.3 0,0 4.5,-6 8,-3.2 z M 9.3,368.5 l 4,-0.8 c 0,0 2.2,-15.6 6.5,-28 0,0 4.6,-9.2 0.7,-15.9 0,0 -7.9,-12.2 0.8,-26.4 0,0 8.4,-11 -0.3,-21.8 0,0 -9.1,-10.6 1.5,-22.8 0,0 9.8,-8.6 3.3,-21.8 0,0 -4.3,-9.1 -4.3,-23.5 0,0 0,-19.2 2.9,-20 0,0 3.1,-1.4 11.5,14 0,0 6.4,11.5 12,13.5 0,0 7.9,3 8,9.7 0,0 -0.3,10.9 -6.6,16.5 0,0 -13.7,13.3 -6.7,24.5 0,0 8.8,14 6.5,21.8 0,0 -2.2,8.3 -7.9,11.7 0,0 -8.8,7.3 -3.4,17.8 0,0 6.2,10 3,21.9 0,0 -4.3,14.8 -6.6,19 0,0 10.2,-17 9.2,-28.2 0,0 -0.5,-3.4 -1.9,-6.7 0,0 -3.7,-9.4 3.6,-15 0,0 10.4,-10.7 5.6,-26.8 0,0 -5,-12.9 2.3,-23.6 0,0 6.7,-8 6.2,-19.7 0,0 0,-15.6 -0.5,-23.4 0,0 -0.4,-16.8 3.6,-13.5 1,0.8 7.6,1.6 11.1,8 0,0 7.6,13.9 11.5,16.8 0,0 11.2,7.5 -1.8,19 0,0 -15.5,12 -17.9,19.3 0,0 -2.5,8.4 3.4,13.8 0,0 11.8,11.2 -2.4,25.1 0,0 -15.4,12.4 -11.4,23 0,0 5.8,13.6 -1.5,24.5 0,0 -7.3,10.5 -11.3,15.6 0,0 -1.9,2.8 -1.4,3.5 0,0 0.4,0.4 3.5,-2.8 0,0 23.6,-22.4 24.4,-38 0,0 -0.2,-10.4 3.2,-14.1 0,0 16.5,-17.2 13.5,-32.1 0,0 -1.7,-8.4 3.6,-14.4 0,0 10.4,-12 10.2,-26.7 0,0 0.3,-17.5 2.8,-25.7 0,0 2.5,-6.9 4.7,-1.8 0,0 14.2,23.8 18.1,27.6 0,0 8.5,9.6 -4.6,16.8 0,0 -20.8,10.8 -20.7,23.9 0,0 4,26.8 -11.6,36 0,0 -7.3,3 -8.4,14 0,0 -0.1,17.7 -16.6,30.3 0,0 -11.3,9.6 -8.8,15 0,0 1.4,2.3 5.3,-2 0,0 10.4,-10.9 19.5,-17 0,0 9.5,-7.5 12.3,-18.8 0,0 2.8,-11.3 10,-15.2 0,0 13.2,-6.4 14.5,-21.4 0,0 0,-14.4 9.6,-18.8 0,0 12.5,-6.6 15.6,-18.9 0,0 3.1,-21 5.2,-26.2 0,0 4.1,-9.6 6.8,-4 0,0 8.3,22.8 12.5,25 0,0 8.3,5.7 -2.4,14.4 0,0 -19.7,15.8 -25,18.3 0,0 -7.3,3.2 -7.1,13.1 0,0 2.4,23.1 -15.4,32.6 0,0 -19.2,13 -27.4,24.5 0,0 -6.7,9 -28.7,21.4 0,0 -1.2,2.3 0.3,11.5 0,0 0.8,6 8.2,0.4 0,0 7,-5.5 10.7,-9.6 0,0 4.7,-5 9.8,-5.2 0,0 18,-3.3 24.5,-18 0,0 4.3,-11.5 14.9,-13.8 0,0 21.8,-6.5 24.6,-27.6 0,0 -0.1,-11.2 9.6,-14.4 0,0 13.4,-2.8 19.3,-16.2 0,0 4.5,-12.8 7.1,-12 0,0 5.3,1.7 4.2,14.7 -0.2,2.8 -1.3,9.4 -5,15.5 a 97,97 0 0 1 -23,23.2 c 0,0 -13.9,10.1 -16.7,19.3 0,0 -3.4,15.6 -24.5,18.3 0,0 -15.8,3.2 -25.4,15.5 0,0 -5.4,5 -10.2,6.3 0,0 -6,2.5 -2.8,7.2 0,0 2.8,4 13.6,3.5 0,0 12.4,-0.6 21.9,-9 0,0 5,-4.2 8.7,-10.2 0,0 3,-6 9.9,-6.5 0,0 21,-5 33.2,-21.9 0,0 7.1,-9.3 14,-8.8 0,0 16.2,-0.2 23.6,-15.8 0,0 5.6,-10.4 17.4,-15.2 0,0 9.1,-3.7 13,2.3 0,0 4,7.3 -6,12.6 0,0 -7.8,3.9 -16,7.6 0,0 -4.3,2.6 -8.4,8.2 0,0 -7.4,11 -25.4,14.4 0,0 -13.5,3.1 -24.7,15.4 0,0 -9.6,14.8 -45.8,23.4 0,0 -15.5,3.9 -20.7,11 0,0 -6.7,10 -13.5,14.3 0,0 12.6,-3 16.3,-6.3 0,0 7.5,-6.6 15.1,-2.1 0.7,0.4 8.6,5 17.3,-0.1 0,0 14.1,-10 26,-7.8 0,0 9.9,3.1 15.1,-2.3 0,0 29.2,-25.5 47.4,-33 0,0 29.4,-13.7 49,4.3 0,0 9.2,9.6 10.8,14.5 0,0 1.2,3.5 -1.6,5.5 0,0 -6.2,2.8 -8,4.6 0,0 -3.3,5.5 -5,5.5 0,0 -5,-1 -2.3,-7.2 0,0 3,-4.2 6.5,-5.7 0,0 5,-1.6 1.8,-5 0,0 -24.2,-24.6 -56,-7 0,0 -11.7,8.6 -12.2,12.1 0,0 -2.5,7.3 -12.7,9.5 l -16.7,6 c 0,0 -10,3.8 -17,1.1 0,0 -10,-2.3 -23.5,6 0,0 -5.7,6.8 -18.6,0.9 0,0 -7,2.4 -17.5,3.8 -2.4,0.4 -6.2,4.4 -11.3,5.3 0,0 21,4.2 28.3,8.7 0,0 15,9.3 26.2,3 0,0 15,-8.7 28.4,-1.1 0,0 12.4,7 28.8,2.3 0,0 11.5,-4.4 17.6,0.3 0,0 -7.2,-2 -19.4,2.2 0,0 -10.9,5.4 -27.3,-2.4 0,0 -9.2,-4.2 -25.6,1.9 0,0 -12.2,5 -24.8,-1.9 0,0 -8.5,-6.2 -18.5,-6.3 0,0 -8.5,9.6 1.8,16.7 a 71,71 0 0 0 15.1,9.3 c 0,0 6.6,5.4 21.4,3.7 0,0 20.2,-3.8 30.3,14.8 0,0 1.4,5.9 25.2,5 0,0 17.8,-4 25.7,6.8 0,0 -3.7,14.6 2.3,20.9 0,0 28.6,17.9 24.5,36 0,0 -0.1,5.3 -9.7,7.9 L 217.7,546.7 108.6,485 0,425.2 0.1,375 c 0,0 0.4,-5.5 9.2,-6.5 m 272.4,33 c 0,0 3,2 -0.8,9.6 0,0 -19.5,34.8 -45,30.5 0,0 -21.4,-3.4 -20.7,-21.2 0,0 0.9,-19.1 20.9,-18.5 0,0 9.8,0.8 14.9,4.8 0,0 4.6,4 3,6.7 0,0 -2.3,4.3 -8,0.2 0,0 -4.5,-4 -9.6,-3 0,0 -9.6,2.2 -9.2,11.2 0,0 0.4,10.7 15,10.2 0,0 18.5,-2.3 33,-23.9 0,0 4.3,-7.4 6.5,-6.6 m -13.3,74.1 c 0,0 -1.9,3 -9,-0.3 0,0 -16.6,-9.5 -22,-0.5 0,0 -8.9,12 18.4,31.6 0,0 29.1,17.2 51.8,9.5 0,0 27.7,-11.3 41,-29 0,0 11.8,-20.2 22.5,-22.3 0,0 7.8,-1.4 9.8,3.2 0,0 2.8,6.2 -6.8,10.2 0,0 -11.6,6.4 -17.4,17.7 0,0 -14.7,26 -53.8,35.5 0,0 -50.2,10 -78.3,-40.3 0,0 -8.2,-17.5 4.2,-30.5 0,0 11.7,-12.9 37.4,7.7 0,0 4.2,3.4 2.2,7.5 M 273.5,363 c 0,0 1.5,-2.4 5.8,1.6 0,0 21.3,21.5 63.1,11.7 0,0 9.6,-3.2 10.4,-0.6 0,0 1.4,3.6 -13.1,6.5 -14.6,3 -45.8,4.4 -63.5,-13.2 0,0 -4,-3.8 -2.7,-6 m -3.9,7.1 c 0,0 1.8,-1.5 5.9,3 0,0 16.9,17.7 34.7,18.3 0,0 5.5,-0.2 5.4,2.5 0,0 0.2,3 -10,1.8 0,0 -17,-1.2 -35.2,-21 0,0 -2.5,-3.2 -0.8,-4.6 m 100.1,7.1 c 0,0 1.7,2 -3.3,8.1 0,0 -15.8,21 -18.8,32.4 0,0 -4.7,28.3 -36.7,40.2 0,0 -12,4.5 -19.4,16 0,0 -2.6,4.7 -3.4,4.6 0,0 -1.1,-1.2 2.1,-7.1 0,0 5.5,-10 23.3,-17.2 0,0 25.6,-8.6 29.6,-32.2 0,0 4.6,-17.8 14.1,-28.4 0,0 3.3,-3.6 3,-4.8 0,0 -0.2,-1.3 -7.4,2.8 0,0 -19.2,8.7 -29.9,10.7 0,0 -22.5,4.3 -32.5,16 0,0 -11.4,14 -7.8,40.4 0,0 1.1,16.9 -3.6,30.8 0,0 -1.2,3 -0.7,3.3 0,0 1.1,-0.2 2.7,-3.2 0,0 8.4,-14.7 26.8,-22.5 0,0 41.7,-14.7 46.9,-43.3 0,0 8.3,-50.1 41.2,-36.1 0,0 24,10 13.2,35.3 0,0 -8.3,22.7 -43.3,37.2 0,0 -19.9,7.2 -25,19.6 0,0 -10,28.7 -38.6,24.3 0,0 -6.6,-1.3 -6,-5.2 0,0 0.8,-3.7 8,-3.2 0,0 21.6,1.3 31.4,-21.6 0,0 4.8,-13.7 21,-19.6 0,0 39.7,-16.3 44,-36.7 0,0 4.8,-16.6 -8,-21.9 0,0 -21.4,-9.5 -30,19.6 0,0 -4.8,17.5 -5.4,20.3 0,0 -4.5,20 -36,32.8 0,0 -31,11 -38.5,28.3 0,0 -4.6,12 -9.8,11.1 0,0 -4.9,-1.4 -1,-15.4 0,0 6.8,-22.1 3.8,-41.8 0,0 -5.5,-29.2 16,-43.8 0,0 12.2,-7.6 33.2,-11.9 0,0 27.5,-9 36.7,-15 0,0 6.5,-4.5 8,-2.9 z m -86.2,97.4 c 0,0 1.3,-12 0.3,-20.9 0,0 -4.2,-31.5 18.6,-41.5 0,0 17,-6.9 31.8,-10.1 0,0 8.6,-2.5 14.3,-6.7 0,0 4,-2.8 4.6,-2.6 0,0 0,0.8 -4,5 0,0 -3.7,4.6 -8,19.7 0,0 -8.1,26 -35.6,37.3 0,0 -13.2,5.5 -19.2,16.8 0,0 -3,6.7 -2.8,3 M 368,409 c 0,0 -0.9,-5.6 7.2,-7.6 0,0 14.5,-3.8 19.7,2.7 0,0 2.2,3.1 0.7,6.8 0,0 -1.6,3.8 -6.2,1 0,0 -5.3,-2.9 -14.5,-1.4 0,0 -6.4,2 -6.8,-1.6 z m -4.5,17 c 0,0 -0.5,-4.3 7.8,-7.3 0,0 13.4,-3.7 17.8,2.8 0,0 2,3.2 0.6,6.1 0,0 -1.6,3.2 -6,0.9 0,0 -5,-2.3 -13.7,-1.2 0,0 -6.1,1.6 -6.5,-1.2 m -5.9,17.3 c 0,0 -1.5,-3.7 5,-8.3 0,0 10.9,-6.4 16.2,-1.8 0,0 2.5,2.4 2,5.3 0,0 -0.7,3.1 -5,2 0,0 -4.9,-0.7 -12.2,2.3 0,0 -5,2.8 -6,0.4 z m 10.7,53.3 c 0,0 -1.4,-1.8 4.3,-6.9 0,0 24.6,-23.5 29.4,-46 0,0 1.3,-10 8,-9.5 0,0 11,2 1.4,19 0,0 -16.6,27 -37.1,42 0,0 -4,3.4 -6,1.4 M 420,409.2 c 0,0 5,-2.6 8.7,3.3 0,0 8,13.3 -2.4,32.8 0,0 -17.7,28.7 -42.4,48.1 0,0 -2.8,2.1 -3.5,0.8 0,0 -0.6,-0.9 4.5,-5 0,0 28,-27.5 34.3,-46.8 0,0 3,-14.8 -0.1,-22.5 0,0 -3.7,-7.5 0.8,-10.7 z m -21.4,76 c 0,0 -11.5,7.8 -8.3,4.8 0,0 34.8,-25.2 43.7,-55.6 0,0 4,-14 -1,-22 0,0 -8.3,-10.5 -5.9,-13.7 0,0 5.6,-7.5 15.8,5.4 0,0 10.8,15.4 -6,42.6 0,0 -9.1,13.9 -29.2,33.4 z m 19.8,-10.9 c 0,0 -2.4,2 1.9,-2.4 0,0 32.6,-31.2 29.8,-55.4 0,0 -1.2,-12.4 -9.7,-19.4 0,0 -7.3,-5 -3.5,-9.3 0,0 7,-7.3 15.6,5.5 0,0 14.6,18.6 -4.2,47.6 0,0 -10,17.2 -19.8,27.6 z m 16,-8.9 c -1,0 -0.3,-0.1 2.5,-3.5 0,0 23.7,-26.7 23.8,-52.6 0,0 -0.1,-15.6 -10.9,-23.6 0,0 -8.5,-5.9 -4.9,-9.6 0,0 9.2,-8 18.4,9.1 0,0 11.8,26 -6.2,54.1 0,0 -6.7,14.5 -15,22 z m 20.8,-99.9 c 0,0 8.4,-8 17.3,8.4 0,0 9.4,17.2 1.7,43.9 0,0 -7.4,22 -13.8,32.7 l -5.9,3.6 c 0,0 16,-29.3 16.8,-49.5 0,0 0.7,-19 -9.1,-27 0,0 -10.8,-8.1 -7,-12 m 10.3,-10 c 0,0 6.4,-7 16,9.5 0,0 12.3,22 2.4,50 0,0 -6.4,21.6 -11.6,29.1 l -6.7,3.8 c 0,0 11.5,-21 14.5,-40.1 0,0 5,-28.8 -9,-41.4 0,0 -8.6,-7.1 -5.6,-10.9 m 8.2,-9.4 c 0,0 7,-8.6 16.6,10.8 a 74,74 0 0 0 4.8,46.2 c 0,0 -4.5,19.9 -13.5,35.7 l -5.7,3.2 c 0,0 12,-22 14.8,-45.6 0,0 2.7,-23.4 -12.4,-40.7 0,0 -7,-6.3 -4.6,-9.6 m 7.6,-10.3 c 0,0 6.7,-8 16,8.4 0,0 10.6,20.4 7.9,45.5 0,0 -1.7,16.8 -12.4,42.7 l -7,4.1 c 0,0 12.8,-23 14.6,-47 0,0 2.7,-25.2 -12.8,-41.7 0,0 -9.3,-8.1 -6.3,-12 m 7.5,-14.5 c 0,0 9.9,-5.5 17.8,16.5 v 34 c 0,0 2,-24.4 -11.9,-36.4 0,0 -12.2,-9 -5.9,-14 M 507,394 c 0,0 -5.4,26.5 -10.4,36.3 l 5.5,-2.8 c 0,0 4.5,-13 5.1,-18.6 z m -15.4,-84.7 c 0,0 7,-7 15,13.3 v 10 c 0,0 -3.8,-9.5 -8.4,-12.3 0,0 -11.5,-5.7 -6.6,-11 m 2,-11.3 c 0,0 6.6,-7.3 13,10.4 v 10.2 c 0,0 -3.4,-9 -7,-11.5 0,0 -8.7,-5 -6,-9.1 m 1.9,-13.5 c 0,0 5.4,-6.8 11,6.5 v 11.4 c 0,0 -2.4,-7.2 -7,-10.3 -4.7,-3 -5.4,-5.9 -4,-7.6"
         style="fill:#eff1f3;fill-opacity:1"
         id="path211" />
    </g>
  </g>
</svg>
',
200, 173, '[[0,0,0,0],[0,0,0,0],[0,0,0,0]]',
'{"part1": "#D5D3D3"}',
'Gaudí-inspired hexagonal relief with organic circular patterns', 1);

-- Log seed completion
DO $$
BEGIN
  RAISE NOTICE 'Seed completed: % mosaics inserted, % border definitions inserted', 
    (SELECT COUNT(*) FROM mosaics),
    (SELECT COUNT(*) FROM border_definitions);
END $$;



