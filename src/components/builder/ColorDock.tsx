import { cn } from "@/lib/utils";
import { HexColorsList, type MosaicColor } from "@/data/colors";
import { Check, ChevronUp, ChevronDown } from "lucide-react";
import { useState } from "react";

interface ColorDockProps {
  selectedColor: string | null;
  onSelectColor: (color: MosaicColor) => void;
  recentColors?: string[];
  selectedPartId: string | null;
}

function ColorButton({
  color,
  isSelected,
  onClick,
  size = "normal",
}: {
  color: MosaicColor;
  isSelected: boolean;
  onClick: () => void;
  size?: "small" | "normal";
}) {
  const brightness = parseInt(color.hex.slice(1), 16);
  const isDark = brightness < 0x888888;

  return (
    <button
      type="button"
      onClick={onClick}
      title={color.name}
      className={cn(
        "group relative rounded-md transition-all duration-150 flex-shrink-0",
        "hover:scale-125 hover:shadow-lg hover:z-20",
        "focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1 focus:ring-offset-surface-800",
        size === "small" ? "h-6 w-6" : "h-8 w-8",
        isSelected && "ring-2 ring-white ring-offset-2 ring-offset-surface-800 scale-110 z-10"
      )}
      style={{ backgroundColor: color.hex }}
    >
      {isSelected && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Check
            className={cn(
              "drop-shadow-md",
              size === "small" ? "h-3 w-3" : "h-4 w-4",
              isDark ? "text-white" : "text-surface-800"
            )}
          />
        </span>
      )}

      {/* Tooltip */}
      <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-surface-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none z-30">
        {color.name}
      </span>
    </button>
  );
}

export function ColorDock({
  selectedColor,
  onSelectColor,
  recentColors = [],
  selectedPartId,
}: ColorDockProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const recentColorObjects = recentColors
    .map((hex) => HexColorsList.find((c) => c.hex === hex))
    .filter((c): c is MosaicColor => c !== undefined)
    .slice(0, 6);

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-40 transition-all duration-300",
        "bg-gradient-to-t from-surface-900 via-surface-900 to-surface-800",
        "border-t border-surface-700 shadow-elevated",
        isExpanded ? "pb-4" : "pb-2"
      )}
    >
      {/* Expand/Collapse button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -top-8 left-1/2 -translate-x-1/2 flex items-center gap-1 rounded-t-lg bg-surface-800 px-3 py-1 text-xs text-surface-300 hover:text-white transition-colors border border-b-0 border-surface-700"
      >
        {isExpanded ? (
          <>
            <ChevronDown className="h-3 w-3" />
            <span>Collapse</span>
          </>
        ) : (
          <>
            <ChevronUp className="h-3 w-3" />
            <span>Expand Colors</span>
          </>
        )}
      </button>

      <div className="mx-auto max-w-7xl px-4">
        {/* Selection indicator */}
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-surface-400 uppercase tracking-wider">
              Colors
            </span>
            {selectedPartId ? (
              <span className="text-xs text-accent-400">
                Applying to: <span className="font-semibold">{selectedPartId}</span>
              </span>
            ) : (
              <span className="text-xs text-surface-500 italic">
                Select a part first
              </span>
            )}
          </div>

          {/* Recent colors */}
          {recentColorObjects.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-surface-500">Recent:</span>
              <div className="flex gap-1">
                {recentColorObjects.map((color) => (
                  <ColorButton
                    key={`recent-${color.hex}`}
                    color={color}
                    isSelected={selectedColor === color.hex}
                    onClick={() => onSelectColor(color)}
                    size="small"
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Color grid - All 36 colors visible */}
        <div
          className={cn(
            "transition-all duration-300 overflow-hidden",
            isExpanded ? "max-h-48" : "max-h-12"
          )}
        >
          {isExpanded ? (
            // Expanded: Responsive grid
            <div className="grid gap-1.5 py-2" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(32px, 1fr))' }}>
              {HexColorsList.map((color) => (
                <ColorButton
                  key={color.hex}
                  color={color}
                  isSelected={selectedColor === color.hex}
                  onClick={() => onSelectColor(color)}
                />
              ))}
            </div>
          ) : (
            // Collapsed: Single row, horizontally scrollable on small screens
            <div className="flex gap-1.5 py-1 overflow-x-auto scrollbar-thin scrollbar-thumb-surface-600 scrollbar-track-transparent">
              {HexColorsList.map((color) => (
                <ColorButton
                  key={color.hex}
                  color={color}
                  isSelected={selectedColor === color.hex}
                  onClick={() => onSelectColor(color)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
