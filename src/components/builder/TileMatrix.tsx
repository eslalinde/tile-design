import { useMemo, memo } from "react";
import { cn } from "@/lib/utils";
import type { PartColor } from "@/types/mosaic";

interface TileMatrixProps {
  svg: string;
  parts: PartColor[];
  rotation?: number[][];
  showBorder?: boolean;
  className?: string;
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

// Memoized single tile component
const Tile = memo(function Tile({
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
        className="h-full w-full"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </div>
  );
});

export function TileMatrix({
  svg,
  parts,
  rotation = defaultRotation,
  showBorder = false,
  className,
}: TileMatrixProps) {
  // Apply colors to SVG
  const coloredSvg = useMemo(() => applyColorsToSvg(svg, parts), [svg, parts]);

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
  // Main tiles: (0,0) to (3,3)
  // Border: column 4 (0,4 to 4,4) and row 4 (4,0 to 4,4)
  const isBorderCell = (row: number, col: number): boolean => {
    return row === 4 || col === 4;
  };

  return (
    <div className={cn("w-full", className)}>
      <div
        className="grid gap-1 p-4 bg-surface-100 rounded-xl"
        style={{
          gridTemplateColumns: "repeat(5, 1fr)",
          aspectRatio: "1 / 1",
        }}
      >
        {Array.from({ length: 5 }).map((_, row) =>
          Array.from({ length: 5 }).map((_, col) => (
            <Tile
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
    </div>
  );
}
