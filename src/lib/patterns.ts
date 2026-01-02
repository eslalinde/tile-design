import type { RectanglePattern, TilePosition, PatternConfig } from "@/types/mosaic";

// Pattern configurations with metadata
export const PATTERN_CONFIGS: PatternConfig[] = [
  {
    id: "brick",
    name: "Brick",
    description: "Classic brick pattern with offset rows",
    icon: "brick",
  },
  {
    id: "stack-bond",
    name: "Stack Bond",
    description: "Aligned vertical columns",
    icon: "stack",
  },
  {
    id: "herringbone",
    name: "Herringbone",
    description: "V-shaped diagonal pattern",
    icon: "herringbone",
  },
];

/**
 * Generate brick pattern layout
 * Rows are offset by 50% alternating
 */
function generateBrickLayout(rows: number, cols: number): TilePosition[] {
  const positions: TilePosition[] = [];
  
  for (let row = 0; row < rows; row++) {
    const isOffsetRow = row % 2 === 1;
    const offsetX = isOffsetRow ? 50 : 0;
    
    for (let col = 0; col < cols; col++) {
      positions.push({
        row,
        col,
        rotation: 0,
        offsetX,
        offsetY: 0,
      });
    }
  }
  
  return positions;
}

/**
 * Generate stack bond pattern layout
 * All tiles aligned vertically
 */
function generateStackBondLayout(rows: number, cols: number): TilePosition[] {
  const positions: TilePosition[] = [];
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      positions.push({
        row,
        col,
        rotation: 0,
        offsetX: 0,
        offsetY: 0,
      });
    }
  }
  
  return positions;
}

/**
 * Generate herringbone pattern layout
 * Tiles are rotated 90° and arranged in V-shape
 */
function generateHerringboneLayout(rows: number, cols: number): TilePosition[] {
  const positions: TilePosition[] = [];
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // In herringbone, tiles alternate between horizontal (0°) and vertical (90°)
      // Creating a zigzag pattern
      const isEvenPosition = (row + col) % 2 === 0;
      
      positions.push({
        row,
        col,
        rotation: isEvenPosition ? 0 : 90,
        offsetX: 0,
        offsetY: 0,
      });
    }
  }
  
  return positions;
}

/**
 * Get layout positions for a given pattern
 */
export function getPatternLayout(
  pattern: RectanglePattern,
  rows: number,
  cols: number
): TilePosition[] {
  switch (pattern) {
    case "brick":
      return generateBrickLayout(rows, cols);
    case "stack-bond":
      return generateStackBondLayout(rows, cols);
    case "herringbone":
      return generateHerringboneLayout(rows, cols);
    default:
      return generateStackBondLayout(rows, cols);
  }
}

/**
 * Get the grid configuration for a pattern
 * Returns CSS grid properties needed to render the pattern
 */
export function getPatternGridConfig(
  pattern: RectanglePattern,
  tileAspectRatio: number,
  cols: number
): {
  gridTemplateColumns: string;
  gridTemplateRows: string;
  containerAspectRatio: number;
} {
  const rows = Math.ceil(cols / tileAspectRatio);
  
  switch (pattern) {
    case "brick":
      return {
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        containerAspectRatio: (cols * tileAspectRatio) / rows,
      };
    
    case "stack-bond":
      return {
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        containerAspectRatio: (cols * tileAspectRatio) / rows,
      };
    
    case "herringbone":
      // Herringbone needs more complex grid due to rotated tiles
      return {
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        containerAspectRatio: 1, // Square container works best for herringbone
      };
    
    default:
      return {
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        containerAspectRatio: 1,
      };
  }
}

/**
 * Get default pattern for a tile shape
 */
export function getDefaultPattern(shape: string): RectanglePattern | null {
  if (shape === "rectangle") {
    return "brick";
  }
  return null;
}
