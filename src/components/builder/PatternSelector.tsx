import React from "react";
import { cn } from "@/lib/utils";
import type { RectanglePattern } from "@/types/mosaic";
import { PATTERN_CONFIGS } from "@/lib/patterns";

interface PatternSelectorProps {
  selectedPattern: RectanglePattern;
  onSelectPattern: (pattern: RectanglePattern) => void;
  tileAspectRatio: number;
}

// Mini SVG previews for each pattern
function PatternPreview({ 
  pattern, 
  tileAspectRatio,
  isSelected 
}: { 
  pattern: RectanglePattern; 
  tileAspectRatio: number;
  isSelected: boolean;
}) {
  const tileWidth = 20;
  const tileHeight = tileWidth / tileAspectRatio;
  const gap = 1;
  const viewBoxSize = 60;

  // Generate pattern-specific preview
  const renderTiles = () => {
    const tiles: React.ReactNode[] = [];
    const cols = 3;
    const rows = Math.ceil(viewBoxSize / (tileHeight + gap));

    switch (pattern) {
      case "brick":
        for (let row = 0; row < rows; row++) {
          const isOffset = row % 2 === 1;
          const offsetX = isOffset ? tileWidth / 2 : 0;
          for (let col = -1; col < cols + 1; col++) {
            const x = col * (tileWidth + gap) + offsetX;
            const y = row * (tileHeight + gap);
            if (x >= -tileWidth && x < viewBoxSize) {
              tiles.push(
                <rect
                  key={`${row}-${col}`}
                  x={x}
                  y={y}
                  width={tileWidth}
                  height={tileHeight}
                  fill={isSelected ? "#0d9488" : "#94a3b8"}
                  rx={1}
                />
              );
            }
          }
        }
        break;

      case "stack-bond":
        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
            tiles.push(
              <rect
                key={`${row}-${col}`}
                x={col * (tileWidth + gap)}
                y={row * (tileHeight + gap)}
                width={tileWidth}
                height={tileHeight}
                fill={isSelected ? "#0d9488" : "#94a3b8"}
                rx={1}
              />
            );
          }
        }
        break;

      case "herringbone":
        // Herringbone: L shapes interlocking, rotated 45° to form inverted V
        const hW = 18; // horizontal tile width
        const hH = 6;  // horizontal tile height
        const vW = 6;  // vertical tile width  
        const vH = 18; // vertical tile height
        const g = 1;   // gap
        const rotateTransform = "rotate(45, 12, 20)"; // rotate 45° - moved left and down
        const stepX = vW + g; // horizontal step for each L
        const stepY = hH + g; // vertical step for each L
        
        // First column of L shapes
        for (let i = 0; i < 6; i++) {
          const offsetX = i * stepX;
          const offsetY = i * stepY;
          
          // H: horizontal tile
          tiles.push(
            <rect
              key={`h1-${i}`}
              x={5 + offsetX}
              y={2 + offsetY}
              width={hW}
              height={hH}
              fill={isSelected ? "#0d9488" : "#94a3b8"}
              rx={0.5}
              transform={rotateTransform}
            />
          );
          
          // V: vertical tile below H, aligned left
          tiles.push(
            <rect
              key={`v1-${i}`}
              x={5 + offsetX}
              y={2 + offsetY + hH + g}
              width={vW}
              height={vH}
              fill={isSelected ? "#0d9488" : "#94a3b8"}
              rx={0.5}
              transform={rotateTransform}
            />
          );
        }
        
        // Second column (identical, offset so corners meet staggered)
        const col2OffsetX = 19; // horizontal offset - a bit more to the left
        const col2OffsetY = -19; // move down a bit
        
        for (let i = 0; i < 6; i++) {
          const offsetX = i * stepX + col2OffsetX;
          const offsetY = i * stepY + col2OffsetY;
          
          // H: horizontal tile
          tiles.push(
            <rect
              key={`h2-${i}`}
              x={5 + offsetX}
              y={2 + offsetY}
              width={hW}
              height={hH}
              fill={isSelected ? "#0d9488" : "#94a3b8"}
              rx={0.5}
              transform={rotateTransform}
            />
          );
          
          // V: vertical tile below H, aligned left
          tiles.push(
            <rect
              key={`v2-${i}`}
              x={5 + offsetX}
              y={2 + offsetY + hH + g}
              width={vW}
              height={vH}
              fill={isSelected ? "#0d9488" : "#94a3b8"}
              rx={0.5}
              transform={rotateTransform}
            />
          );
        }
        break;

    }

    return tiles;
  };

  return (
    <svg
      viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
      className="w-full h-full"
    >
      <rect
        x={0}
        y={0}
        width={viewBoxSize}
        height={viewBoxSize}
        fill={isSelected ? "#f0fdfa" : "#f8fafc"}
        rx={4}
      />
      {renderTiles()}
    </svg>
  );
}

export function PatternSelector({
  selectedPattern,
  onSelectPattern,
  tileAspectRatio,
}: PatternSelectorProps) {
  return (
    <div>
      <h3 className="text-xs font-semibold text-surface-600 uppercase tracking-wider mb-3">
        Pattern Layout
      </h3>
      
      <div className="grid grid-cols-2 gap-2">
        {PATTERN_CONFIGS.map((config) => {
          const isSelected = selectedPattern === config.id;
          
          return (
            <button
              key={config.id}
              type="button"
              onClick={() => onSelectPattern(config.id)}
              className={cn(
                "relative flex flex-col items-center rounded-lg border-2 p-2 transition-all duration-150",
                "hover:border-brand-300 hover:shadow-sm",
                "focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-1",
                isSelected
                  ? "border-brand-500 bg-brand-50 shadow-sm"
                  : "border-surface-200 bg-white"
              )}
            >
              {/* Pattern Preview */}
              <div className="aspect-square w-full rounded-md overflow-hidden mb-1.5">
                <PatternPreview
                  pattern={config.id}
                  tileAspectRatio={tileAspectRatio}
                  isSelected={isSelected}
                />
              </div>
              
              {/* Pattern Name */}
              <span
                className={cn(
                  "text-xs font-medium",
                  isSelected ? "text-brand-700" : "text-surface-600"
                )}
              >
                {config.name}
              </span>
            </button>
          );
        })}
      </div>
      
      {/* Pattern Description */}
      <p className="mt-3 text-xs text-surface-500 text-center">
        {PATTERN_CONFIGS.find((c) => c.id === selectedPattern)?.description}
      </p>
    </div>
  );
}
