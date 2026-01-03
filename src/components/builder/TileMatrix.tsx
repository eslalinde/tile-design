import React, { useMemo, memo } from "react";
import { cn } from "@/lib/utils";
import type { PartColor, RectanglePattern } from "@/types/mosaic";

// Border data for rendering corner and side tiles
export interface BorderData {
  cornerSvg: string;
  sideSvg1: string;
  sideSvg2?: string;
  cornerParts: PartColor[];
  sideParts1: PartColor[];
  sideParts2?: PartColor[];
}

interface TileMatrixProps {
  svg: string;
  parts: PartColor[];
  rotation?: number[][];
  showBorder?: boolean;
  className?: string;
  // New props for rectangular tiles
  tileWidth?: number;
  tileHeight?: number;
  pattern?: RectanglePattern;
  // Tile shape for different rendering modes
  shape?: "square" | "hexagon" | "rectangle" | "g1";
  // Border data for square tiles
  borderData?: BorderData;
}

// Default rotation pattern for a 4x4 grid (5x5 with border)
const defaultRotation = [
  [0, 90, 0, 90, 0],
  [270, 180, 270, 180, 270],
  [0, 90, 0, 90, 0],
  [270, 180, 270, 180, 270],
  [0, 90, 0, 90, 0],
];

// Apply color changes to SVG
function applyColorsToSvg(svg: string, parts: PartColor[]): string {
  if (parts.length === 0) return svg;

  const parser = new DOMParser();
  const doc = parser.parseFromString(svg, "image/svg+xml");

  parts.forEach(({ partId, colorHex }) => {
    const group = doc.getElementById(partId);
    if (!group) return;

    // Apply color to all fill-able elements within the group
    const elements = group.querySelectorAll("path, rect, circle, polygon, ellipse");
    elements.forEach((el) => {
      el.setAttribute("fill", colorHex);
    });
  });

  return new XMLSerializer().serializeToString(doc);
}

// Memoized single tile component for square tiles
const SquareTile = memo(function SquareTile({
  svg,
  rotation,
  isBorder,
  showBorder,
  row,
  col,
}: {
  svg: string;
  rotation: number;
  isBorder: boolean;
  showBorder: boolean;
  row: number;
  col: number;
}) {
  // Hide border tiles if not showing border
  if (isBorder && !showBorder) {
    return (
      <div
        className="aspect-square rounded-sm bg-surface-100 border border-dashed border-surface-300"
        title={`Border tile (${row},${col})`}
      />
    );
  }

  return (
    <div
      className={cn(
        "aspect-square overflow-hidden rounded-sm bg-white shadow-sm",
        isBorder && "opacity-70"
      )}
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
      title={`Tile (${row},${col}) - ${rotation}°`}
    >
      <div
        className="h-full w-full [&>svg]:w-full [&>svg]:h-full"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </div>
  );
});

// Border tile component for rendering corner and side tiles
const BorderTile = memo(function BorderTile({
  svg,
  rotation,
  row,
  col,
  type,
}: {
  svg: string;
  rotation: number;
  row: number;
  col: number;
  type: "corner" | "side";
}) {
  return (
    <div
      className="aspect-square overflow-hidden rounded-sm bg-white shadow-sm"
      style={{
        transform: rotation ? `rotate(${rotation}deg)` : undefined,
      }}
      title={`Border ${type} (${row},${col})${rotation ? ` - ${rotation}°` : ""}`}
    >
      <div
        className="h-full w-full [&>svg]:w-full [&>svg]:h-full"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </div>
  );
});

// Standard square grid matrix
function SquareMatrix({
  coloredSvg,
  rotation,
  showBorder,
  borderData,
}: {
  coloredSvg: string;
  rotation: number[][];
  showBorder: boolean;
  borderData?: BorderData;
}) {
  // Ensure we have a 5x5 rotation matrix
  const rotationMatrix = useMemo(() => {
    const matrix: number[][] = [];
    for (let row = 0; row < 5; row++) {
      matrix[row] = [];
      for (let col = 0; col < 5; col++) {
        // Use provided rotation or default pattern
        if (rotation[row]?.[col] !== undefined) {
          matrix[row][col] = rotation[row][col];
        } else if (rotation.length === 2 && rotation[0].length === 4) {
          // Handle 2x4 rotation pattern (repeat pattern)
          const patternRow = row % 2;
          const patternCol = col % 4;
          matrix[row][col] = rotation[patternRow]?.[patternCol] ?? 0;
        } else {
          matrix[row][col] = defaultRotation[row][col];
        }
      }
    }
    return matrix;
  }, [rotation]);

  // Apply colors to border SVGs
  const coloredCornerSvg = useMemo(() => {
    if (!borderData?.cornerSvg) return null;
    return applyColorsToSvg(borderData.cornerSvg, borderData.cornerParts);
  }, [borderData?.cornerSvg, borderData?.cornerParts]);

  const coloredSideSvg1 = useMemo(() => {
    if (!borderData?.sideSvg1) return null;
    return applyColorsToSvg(borderData.sideSvg1, borderData.sideParts1);
  }, [borderData?.sideSvg1, borderData?.sideParts1]);

  const coloredSideSvg2 = useMemo(() => {
    if (!borderData?.sideSvg2 || !borderData?.sideParts2) return null;
    return applyColorsToSvg(borderData.sideSvg2, borderData.sideParts2);
  }, [borderData?.sideSvg2, borderData?.sideParts2]);

  // Get the appropriate side SVG for a given position (alternating if sideSvg2 exists)
  const getSideSvg = (index: number): string | null => {
    if (!coloredSideSvg1) return null;
    if (!coloredSideSvg2) return coloredSideSvg1;
    // Alternate between side1 and side2
    return index % 2 === 0 ? coloredSideSvg1 : coloredSideSvg2;
  };

  // Render the appropriate tile for a cell
  const renderCell = (row: number, col: number) => {
    const key = `${row}-${col}`;

    // Corner position (4,4)
    if (row === 4 && col === 4) {
      if (showBorder && coloredCornerSvg) {
        return (
          <BorderTile
            key={key}
            svg={coloredCornerSvg}
            rotation={0}
            row={row}
            col={col}
            type="corner"
          />
        );
      }
      // Empty corner placeholder
      return (
        <div
          key={key}
          className="aspect-square rounded-sm bg-surface-100 border border-dashed border-surface-300"
          title={`Corner tile (${row},${col})`}
        />
      );
    }

    // Bottom edge (row 4, cols 0-3) - horizontal sides
    if (row === 4 && col < 4) {
      if (showBorder && coloredSideSvg1) {
        const sideSvg = getSideSvg(col);
        if (sideSvg) {
          return (
            <BorderTile
              key={key}
              svg={sideSvg}
              rotation={0}
              row={row}
              col={col}
              type="side"
            />
          );
        }
      }
      // Empty side placeholder
      return (
        <div
          key={key}
          className="aspect-square rounded-sm bg-surface-100 border border-dashed border-surface-300"
          title={`Side tile (${row},${col})`}
        />
      );
    }

    // Right edge (rows 0-3, col 4) - vertical sides (rotated -90° / 270°)
    if (col === 4 && row < 4) {
      if (showBorder && coloredSideSvg1) {
        const sideSvg = getSideSvg(row);
        if (sideSvg) {
          return (
            <BorderTile
              key={key}
              svg={sideSvg}
              rotation={-90}
              row={row}
              col={col}
              type="side"
            />
          );
        }
      }
      // Empty side placeholder
      return (
        <div
          key={key}
          className="aspect-square rounded-sm bg-surface-100 border border-dashed border-surface-300"
          title={`Side tile (${row},${col})`}
        />
      );
    }

    // Regular mosaic tile (4x4 area)
    return (
      <SquareTile
        key={key}
        svg={coloredSvg}
        rotation={rotationMatrix[row][col]}
        isBorder={false}
        showBorder={showBorder}
        row={row}
        col={col}
      />
    );
  };

  return (
    <>
      <div
        className="grid gap-1 p-4 bg-surface-100 rounded-xl"
        style={{
          gridTemplateColumns: "repeat(5, 1fr)",
          aspectRatio: "1 / 1",
        }}
      >
        {Array.from({ length: 5 }).map((_, row) =>
          Array.from({ length: 5 }).map((_, col) => renderCell(row, col))
        )}
      </div>

      {/* Legend */}
      <div className="mt-3 flex items-center justify-center gap-4 text-xs text-surface-500">
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded-sm bg-white shadow-sm" />
          <span>Main pattern (4×4)</span>
        </div>
        {showBorder && borderData ? (
          <>
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-sm bg-white shadow-sm ring-1 ring-brand-300" />
              <span>Corner</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-sm bg-white shadow-sm" />
              <span>Side tiles</span>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-sm bg-surface-100 border border-dashed border-surface-300" />
            <span>Border area</span>
          </div>
        )}
      </div>
    </>
  );
}

// Hexagonal honeycomb matrix using SVG with foreignObject
function HexagonalMatrix({
  coloredSvg,
  rotation,
}: {
  coloredSvg: string;
  rotation?: number[][]; // Rotation matrix for each hexagon (in degrees, typically 0, 60, 120, 180, 240, 300)
}) {
  // Hexagon dimensions from the SVG viewBox (200x173)
  const hexWidth = 200;
  const hexHeight = 173;
  
  // For flat-top hexagon with viewBox 200x173:
  // Points: 50,0 -> 150,0 -> 200,86.5 -> 150,173 -> 50,173 -> 0,86.5
  // Side length = 100 (the top horizontal edge)
  const sideLength = 100;
  
  // Spacing calculation:
  // - hex1 covers x = [0, hexWidth] = [0, 200]
  // - For gap of 'sideLength' between hexagons: hex2 starts at x = hexWidth + gap
  // - horizSpacing = hexWidth + gap
  const gap = sideLength; // Gap between hexagons = one side length (100)
  const horizSpacing = hexWidth + gap; // 200 + 100 = 300
  
  // Vertical spacing: top edge of row 2 reaches the middle of row 1
  // This creates the honeycomb interlock pattern
  const vertSpacing = hexHeight / 2; // 173 / 2 = 86.5
  
  // Odd rows offset by half a hexagon width + half gap
  const oddRowOffset = (hexWidth + gap) / 2; // 150
  
  // Grid configuration
  const cols = 4;
  const rows = 7;
  
  // Calculate viewBox size to fit all hexagons
  const viewBoxWidth = (cols - 1) * horizSpacing + hexWidth + oddRowOffset;
  const viewBoxHeight = (rows - 1) * vertSpacing + hexHeight;
  
  // Get rotation for a specific hexagon
  // Rotation is defined per row: rotation[rowIndex][colIndex]
  // First 3 rows are configured, then pattern repeats for rows 3-5, 6-8, etc.
  const getRotation = (row: number, col: number): number => {
    if (!rotation || rotation.length === 0) return 0;
    
    // Map row to one of the first 3 configured rows (0, 1, 2 -> repeat)
    const configRow = row % rotation.length;
    const rowConfig = rotation[configRow];
    
    if (!rowConfig || rowConfig.length === 0) return 0;
    
    // Get rotation for this column in the row (wrap if more columns than config)
    return rowConfig[col % rowConfig.length] || 0;
  };

  // Generate hexagon positions
  const hexagons = useMemo(() => {
    const result: { x: number; y: number; row: number; col: number; id: string; rot: number }[] = [];
    for (let r = 0; r < rows; r++) {
      const isOddRow = r % 2 === 1;
      const rowOffset = isOddRow ? oddRowOffset : 0;
      for (let c = 0; c < cols; c++) {
        result.push({
          x: c * horizSpacing + rowOffset,
          y: r * vertSpacing,
          row: r,
          col: c,
          id: `hex-${r}-${c}`,
          rot: getRotation(r, c),
        });
      }
    }
    return result;
  }, [rotation]);
  
  // Hexagon path for the flat-top hexagon (matching viewBox 200x173)
  const hexPath = "M50,0 L150,0 L200,86.5 L150,173 L50,173 L0,86.5 Z";
  
  return (
    <>
      <div className="p-4 bg-surface-100 rounded-xl">
        <div className="overflow-hidden rounded-lg">
          <svg
            viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
            className="w-full h-auto"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background */}
            <rect x={0} y={0} width={viewBoxWidth} height={viewBoxHeight} fill="#f1f5f9" rx={8} />
            
            {/* Render each hexagon */}
            {hexagons.map((hex) => (
              <g key={hex.id}>
                {/* White background for hexagon */}
                <path
                  d={hexPath}
                  transform={`translate(${hex.x}, ${hex.y})`}
                  fill="white"
                />
                
                {/* Mosaic content using foreignObject */}
                <foreignObject
                  x={hex.x}
                  y={hex.y}
                  width={hexWidth}
                  height={hexHeight}
                >
                  <div
                    style={{ 
                      width: hexWidth, 
                      height: hexHeight,
                      clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
                      transform: hex.rot ? `rotate(${hex.rot}deg)` : undefined,
                      transformOrigin: 'center center',
                    }}
                    className="[&>svg]:w-full [&>svg]:h-full"
                    dangerouslySetInnerHTML={{ __html: coloredSvg }}
                  />
                </foreignObject>
                
                {/* Hexagon border on top */}
                <path
                  d={hexPath}
                  transform={`translate(${hex.x}, ${hex.y})`}
                  fill="none"
                  stroke="#cbd5e1"
                  strokeWidth={2}
                />
              </g>
            ))}
          </svg>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-3 flex items-center justify-center gap-4 text-xs text-surface-500">
        <div className="flex items-center gap-1.5">
          <svg viewBox="0 0 20 17.3" className="h-4 w-4">
            <path d="M5,0 L15,0 L20,8.65 L15,17.3 L5,17.3 L0,8.65 Z" fill="white" stroke="#94a3b8" strokeWidth={1} />
          </svg>
          <span>Hexagonal tile</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-medium">Honeycomb</span>
          <span>pattern</span>
        </div>
      </div>
    </>
  );
}

// G1 (Water Drop / Fish Scale) pattern matrix
function G1Matrix({
  coloredSvg,
  rotation,
}: {
  coloredSvg: string;
  rotation?: number[][];
}) {
  // G1 tile dimensions based on the SVG path (approximately 200x200 viewBox)
  const tileWidth = 200;
  const tileHeight = 200;
  
  // The fish scale pattern tessellates with:
  // - Offset rows (odd rows shifted by half tile width)
  // - Overlapping tiles (each row overlaps the previous)
  const horizSpacing = tileWidth; // Full width spacing
  const vertSpacing = tileHeight * 0.5; // 50% overlap vertically
  const oddRowOffset = tileWidth / 2; // Half tile offset for odd rows
  
  // Grid configuration
  const cols = 5;
  const rows = 8;
  
  // Calculate viewBox size to fit all tiles
  const viewBoxWidth = (cols - 1) * horizSpacing + tileWidth + oddRowOffset;
  const viewBoxHeight = (rows - 1) * vertSpacing + tileHeight;
  
  // Get rotation for a specific tile
  const getRotation = (row: number, col: number): number => {
    if (!rotation || rotation.length === 0) return 0;
    const configRow = row % rotation.length;
    const rowConfig = rotation[configRow];
    if (!rowConfig || rowConfig.length === 0) return 0;
    return rowConfig[col % rowConfig.length] || 0;
  };
  
  // G1 path - water drop / fish scale shape
  const g1Path = "m 199.83512,96.616655 c -53.99305,0 -97.92227,-42.779053 -99.68404,-96.46120487 h -0.10364 c -1.347232,0 -2.590831,0 -3.834431,0.10363345 C 94.451246,52.593994 52.389262,94.641846 0.15798792,96.610884 c 0,1.139968 0.016323,2.307282 0.016323,3.343615 0,55.133021 44.74012308,99.799051 99.87313908,99.799051 55.13302,0 99.98706,-44.66635 99.79905,-99.799051 z";
  
  // Generate tile positions
  const tiles = useMemo(() => {
    const result: { x: number; y: number; row: number; col: number; id: string; rot: number }[] = [];
    for (let r = 0; r < rows; r++) {
      const isOddRow = r % 2 === 1;
      const rowOffset = isOddRow ? oddRowOffset : 0;
      for (let c = 0; c < cols; c++) {
        result.push({
          x: c * horizSpacing + rowOffset,
          y: r * vertSpacing,
          row: r,
          col: c,
          id: `g1-${r}-${c}`,
          rot: getRotation(r, c),
        });
      }
    }
    return result;
  }, [rotation]);
  
  return (
    <>
      <div className="p-4 bg-surface-100 rounded-xl">
        <div className="overflow-hidden rounded-lg">
          <svg
            viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
            className="w-full h-auto"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background */}
            <rect x={0} y={0} width={viewBoxWidth} height={viewBoxHeight} fill="#f1f5f9" rx={8} />
            
            {/* Define clip path for G1 shape */}
            <defs>
              <clipPath id="g1-clip">
                <path d={g1Path} />
              </clipPath>
            </defs>
            
            {/* Render each G1 tile */}
            {tiles.map((tile) => (
              <g key={tile.id}>
                {/* White background for tile */}
                <path
                  d={g1Path}
                  transform={`translate(${tile.x}, ${tile.y})`}
                  fill="white"
                />
                
                {/* Mosaic content using foreignObject */}
                <foreignObject
                  x={tile.x}
                  y={tile.y}
                  width={tileWidth}
                  height={tileHeight}
                >
                  <div
                    style={{
                      width: tileWidth,
                      height: tileHeight,
                      clipPath: `path('${g1Path}')`,
                      transform: tile.rot ? `rotate(${tile.rot}deg)` : undefined,
                      transformOrigin: 'center center',
                    }}
                    className="[&>svg]:w-full [&>svg]:h-full"
                    dangerouslySetInnerHTML={{ __html: coloredSvg }}
                  />
                </foreignObject>
                
                {/* Tile border on top */}
                <path
                  d={g1Path}
                  transform={`translate(${tile.x}, ${tile.y})`}
                  fill="none"
                  stroke="#cbd5e1"
                  strokeWidth={2}
                />
              </g>
            ))}
          </svg>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-3 flex items-center justify-center gap-4 text-xs text-surface-500">
        <div className="flex items-center gap-1.5">
          <svg viewBox="0 0 20 20" className="h-4 w-4">
            <path 
              d="m 19.983512,9.6616655 c -5.399305,0 -9.792227,-4.2779053 -9.968404,-9.6461205 h -0.010364 c -0.1347232,0 -0.2590831,0 -0.3834431,0.0103634 C 9.4451246,5.2593994 5.2389262,9.4641846 0.015798792,9.6610884 c 0,0.1139968 0.001632,0.2307282 0.001632,0.3343616 0,5.5133021 4.474012308,9.9799051 9.987313908,9.9799051 5.51330,0 9.99871,-4.46664 9.97991,-9.9799051 z"
              fill="white" 
              stroke="#94a3b8" 
              strokeWidth={0.5} 
            />
          </svg>
          <span>G1 tile (Fish Scale)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-medium">120×120mm</span>
          <span>pattern</span>
        </div>
      </div>
    </>
  );
}

// Rectangular pattern matrix
function RectangularMatrix({
  coloredSvg,
  pattern,
  aspectRatio,
  tileColor,
}: {
  coloredSvg: string;
  pattern: RectanglePattern;
  aspectRatio: number;
  tileColor: string;
}) {
  // Render different pattern layouts
  const renderPattern = () => {
    switch (pattern) {
      case "brick":
        return renderBrickPattern();
      case "stack-bond":
        return renderStackBondPattern();
      case "herringbone":
        return renderHerringbonePattern();
      default:
        return renderStackBondPattern();
    }
  };

  // Brick pattern: offset rows by 50% of tile width
  const renderBrickPattern = () => {
    const rows = 8;
    const tilesPerRow = 3;
    const gap = 4; // gap in pixels
    
    return (
      <div className="overflow-hidden rounded-lg">
        <div className="flex flex-col" style={{ gap: `${gap}px` }}>
          {Array.from({ length: rows }).map((_, rowIndex) => {
            const isOffset = rowIndex % 2 === 1;
            // Offset by half a tile width for odd rows
            const offsetPercent = isOffset ? (100 / tilesPerRow / 2) : 0;
            
            return (
              <div
                key={rowIndex}
                className="flex"
                style={{
                  gap: `${gap}px`,
                  transform: `translateX(-${offsetPercent}%)`,
                }}
              >
                {/* Add extra tile at start for offset rows */}
                {Array.from({ length: tilesPerRow + 1 }).map((_, colIndex) => (
                  <div
                    key={colIndex}
                    className="flex-shrink-0"
                    style={{
                      width: `${100 / tilesPerRow}%`,
                    }}
                  >
                    <div
                      className="overflow-hidden rounded-sm bg-white shadow-sm"
                      style={{ aspectRatio: `${aspectRatio} / 1` }}
                    >
                      <div
                        className="h-full w-full [&>svg]:w-full [&>svg]:h-full"
                        dangerouslySetInnerHTML={{ __html: coloredSvg }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Stack bond pattern: aligned columns
  const renderStackBondPattern = () => {
    const rows = 8;
    const tilesPerRow = 3;
    
    return (
      <div className="flex flex-col gap-1">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="flex gap-1">
            {Array.from({ length: tilesPerRow }).map((_, colIndex) => (
              <div key={colIndex} className="flex-1">
                <div
                  className="overflow-hidden rounded-sm bg-white shadow-sm"
                  style={{ aspectRatio: `${aspectRatio} / 1` }}
                >
                  <div
                    className="h-full w-full [&>svg]:w-full [&>svg]:h-full"
                    dangerouslySetInnerHTML={{ __html: coloredSvg }}
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  // Herringbone pattern: L-shapes interlocking, rotated 45° to form inverted V
  // Dynamically calculates tile dimensions based on aspectRatio
  const renderHerringbonePattern = () => {
    const viewBoxSize = 200;
    const g = 0.8; // gap between tiles (grout line)
    const center = viewBoxSize / 2;
    
    // Calculate tile dimensions to match brick/stack-bond visual size
    // Target: ~3 tile widths visible across the viewBox
    const targetTilesAcross = 3;
    const effectiveWidth = viewBoxSize / Math.sqrt(2); // Account for 45° rotation
    
    // Calculate tile width to fit target number of tiles
    const hW = effectiveWidth / targetTilesAcross; // Horizontal tile width
    const hH = hW / aspectRatio; // Horizontal tile height (maintains aspect ratio)
    
    // Vertical tile: rotated 90°, so swap dimensions
    const vW = hH; // Vertical tile width = horizontal tile height
    const vH = hW; // Vertical tile height = horizontal tile width
    
    const rotateTransform = `rotate(45, ${center}, ${center})`;
    
    // L-shape dimensions: horizontal tile on top, vertical tile below-left
    const lWidth = hW; // Width of L-shape
    const lHeight = hH + g + vH; // Total height of L-shape
    
    // Steps for pattern repetition
    const stepX = vW + g; // Diagonal step X (along the L column)
    const stepY = hH + g; // Diagonal step Y (along the L column)
    const columnSpacing = hW + g; // Horizontal spacing between columns
    
    // Calculate coverage needed: after 45° rotation, we need to cover corners
    // The diagonal of the viewbox is viewBoxSize * sqrt(2) ≈ 283
    const coverageNeeded = viewBoxSize * Math.sqrt(2);
    
    // Number of L-shapes per diagonal column (extra to cover bottom)
    const lShapesPerColumn = Math.ceil(coverageNeeded / (stepX + stepY)) + 8;
    
    // Number of columns to fill width
    const numColumns = Math.ceil(coverageNeeded / columnSpacing) + 2;
    
    const tiles: React.ReactNode[] = [];
    
    // Start position: offset to ensure full coverage after 45° rotation
    // We need to start further left to cover the left side of the viewbox
    const startX = center - coverageNeeded * 0.75;
    const startY = center - coverageNeeded * 0.25;
    
    // Generate columns of L shapes
    for (let colIdx = 0; colIdx < numColumns; colIdx++) {
      const colOffsetX = colIdx * columnSpacing;
      const colOffsetY = -colIdx * columnSpacing;
      
      for (let i = 0; i < lShapesPerColumn; i++) {
        const baseX = startX + i * stepX + colOffsetX;
        const baseY = startY + i * stepY + colOffsetY;
        
        // H: horizontal tile (top of L)
        tiles.push(
          <rect
            key={`h${colIdx}-${i}`}
            x={baseX}
            y={baseY}
            width={hW}
            height={hH}
            fill={tileColor}
            rx={1}
            transform={rotateTransform}
          />
        );
        
        // V: vertical tile (bottom-left of L)
        tiles.push(
          <rect
            key={`v${colIdx}-${i}`}
            x={baseX}
            y={baseY + hH + g}
            width={vW}
            height={vH}
            fill={tileColor}
            rx={1}
            transform={rotateTransform}
          />
        );
      }
    }
    
    return (
      <div className="relative overflow-hidden rounded-lg" style={{ aspectRatio: "1 / 1" }}>
        <svg
          viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
          className="w-full h-full"
          preserveAspectRatio="xMidYMid slice"
        >
          <rect x={0} y={0} width={viewBoxSize} height={viewBoxSize} fill="#f1f5f9" rx={8} />
          {tiles}
        </svg>
      </div>
    );
  };

  return (
    <>
      <div className="p-4 bg-surface-100 rounded-xl">
        {renderPattern()}
      </div>

      {/* Legend */}
      <div className="mt-3 flex items-center justify-center gap-4 text-xs text-surface-500">
        <div className="flex items-center gap-1.5">
          <div 
            className="h-2 w-4 rounded-sm bg-white shadow-sm" 
            style={{ aspectRatio: `${aspectRatio} / 1` }}
          />
          <span>Rectangular tile</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-medium capitalize">{pattern.replace("-", " ")}</span>
          <span>pattern</span>
        </div>
      </div>
    </>
  );
}

export function TileMatrix({
  svg,
  parts,
  rotation = defaultRotation,
  showBorder = false,
  className,
  tileWidth,
  tileHeight,
  pattern,
  shape = "square",
  borderData,
}: TileMatrixProps) {
  // Apply colors to SVG
  const coloredSvg = useMemo(() => applyColorsToSvg(svg, parts), [svg, parts]);

  // Calculate aspect ratio for rectangular tiles
  const aspectRatio = tileWidth && tileHeight ? tileWidth / tileHeight : 1;
  const isRectangular = shape === "rectangle" && pattern && tileWidth && tileHeight && aspectRatio !== 1;
  const isHexagonal = shape === "hexagon";
  const isG1 = shape === "g1";

  // Determine which matrix to render based on shape
  const renderMatrix = () => {
    if (isG1) {
      return <G1Matrix coloredSvg={coloredSvg} rotation={rotation} />;
    }
    
    if (isHexagonal) {
      return <HexagonalMatrix coloredSvg={coloredSvg} rotation={rotation} />;
    }
    
    if (isRectangular) {
      return (
        <RectangularMatrix
          coloredSvg={coloredSvg}
          pattern={pattern!}
          aspectRatio={aspectRatio}
          tileColor={parts[0]?.colorHex ?? "#94a3b8"}
        />
      );
    }
    
    return (
      <SquareMatrix
        coloredSvg={coloredSvg}
        rotation={rotation}
        showBorder={showBorder}
        borderData={borderData}
      />
    );
  };

  return (
    <div className={cn("w-full", className)}>
      {renderMatrix()}
    </div>
  );
}
