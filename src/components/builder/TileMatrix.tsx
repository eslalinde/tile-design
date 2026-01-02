import React, { useMemo, memo } from "react";
import { cn } from "@/lib/utils";
import type { PartColor, RectanglePattern } from "@/types/mosaic";

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

// Standard square grid matrix
function SquareMatrix({
  coloredSvg,
  rotation,
  showBorder,
}: {
  coloredSvg: string;
  rotation: number[][];
  showBorder: boolean;
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

  // Determine which cells are border cells
  const isBorderCell = (row: number, col: number): boolean => {
    return row === 4 || col === 4;
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
          Array.from({ length: 5 }).map((_, col) => (
            <SquareTile
              key={`${row}-${col}`}
              svg={coloredSvg}
              rotation={rotationMatrix[row][col]}
              isBorder={isBorderCell(row, col)}
              showBorder={showBorder}
              row={row}
              col={col}
            />
          ))
        )}
      </div>

      {/* Legend */}
      <div className="mt-3 flex items-center justify-center gap-4 text-xs text-surface-500">
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded-sm bg-white shadow-sm" />
          <span>Main pattern (4×4)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded-sm bg-surface-100 border border-dashed border-surface-300" />
          <span>Border area</span>
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
    const g = 1; // gap between tiles
    
    // Calculate tile dimensions based on aspectRatio
    // For herringbone, we need a base unit and scale by aspect ratio
    // aspectRatio = width / height (e.g., 3:1 means width is 3x height)
    const baseUnit = 18; // Base height unit for calculations
    
    // Horizontal tile: width = baseUnit * aspectRatio, height = baseUnit
    const hH = baseUnit;
    const hW = baseUnit * aspectRatio;
    
    // Vertical tile: rotated 90°, so width = baseUnit, height = baseUnit * aspectRatio
    const vW = baseUnit;
    const vH = baseUnit * aspectRatio;
    
    const rotateTransform = `rotate(45, ${viewBoxSize / 2}, ${viewBoxSize / 2})`;
    
    // Steps for diagonal movement of L-shapes
    const stepX = vW + g; // horizontal step for each L
    const stepY = hH + g; // vertical step for each L
    
    // Calculate column offset based on tile dimensions
    // Each column needs to offset by (hW + g) horizontally and -(hW + g) vertically
    const columnSpacing = hW + g;
    
    // Determine number of L shapes per column based on viewbox and tile size
    const diagonalLength = viewBoxSize * Math.sqrt(2); // diagonal of the viewbox
    const lShapesPerColumn = Math.ceil(diagonalLength / (stepX + stepY)) + 4;
    const numColumns = 4;
    
    // Generate column offsets dynamically
    const columnOffsets = Array.from({ length: numColumns }, (_, i) => ({
      x: i * columnSpacing,
      y: -i * columnSpacing,
    }));
    
    const tiles: React.ReactNode[] = [];
    
    // Starting position adjusted for the pattern to be centered
    const startX = -viewBoxSize * 0.3;
    const startY = -viewBoxSize * 0.1;
    
    // Generate 4 columns of L shapes
    for (let colIdx = 0; colIdx < numColumns; colIdx++) {
      const colOffset = columnOffsets[colIdx];
      
      for (let i = 0; i < lShapesPerColumn; i++) {
        const offsetX = i * stepX + colOffset.x;
        const offsetY = i * stepY + colOffset.y;
        const baseX = startX + offsetX;
        const baseY = startY + offsetY;
        
        // H: horizontal tile (horizontal rectangle)
        tiles.push(
          <rect
            key={`h${colIdx}-${i}`}
            x={baseX}
            y={baseY}
            width={hW}
            height={hH}
            fill={tileColor}
            rx={2}
            transform={rotateTransform}
          />
        );
        
        // V: vertical tile below H, aligned left
        tiles.push(
          <rect
            key={`v${colIdx}-${i}`}
            x={baseX}
            y={baseY + hH + g}
            width={vW}
            height={vH}
            fill={tileColor}
            rx={2}
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
}: TileMatrixProps) {
  // Apply colors to SVG
  const coloredSvg = useMemo(() => applyColorsToSvg(svg, parts), [svg, parts]);

  // Calculate aspect ratio for rectangular tiles
  const aspectRatio = tileWidth && tileHeight ? tileWidth / tileHeight : 1;
  const isRectangular = pattern && tileWidth && tileHeight && aspectRatio !== 1;

  return (
    <div className={cn("w-full", className)}>
      {isRectangular ? (
        <RectangularMatrix
          coloredSvg={coloredSvg}
          pattern={pattern}
          aspectRatio={aspectRatio}
          tileColor={parts[0]?.colorHex ?? "#94a3b8"}
        />
      ) : (
        <SquareMatrix
          coloredSvg={coloredSvg}
          rotation={rotation}
          showBorder={showBorder}
        />
      )}
    </div>
  );
}
