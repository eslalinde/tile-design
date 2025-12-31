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
}: {
  color: MosaicColor;
  isSelected: boolean;
  onClick: () => void;
}) {
  const brightness = parseInt(color.hex.slice(1), 16);
  const isDark = brightness < 0x888888;

  return (
    <button
      type="button"
      onClick={onClick}
      title={color.name}
      className={cn(
        "group relative aspect-square rounded transition-all duration-150",
        "hover:scale-110 hover:shadow-md hover:z-20",
        "focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-1",
        "border border-surface-200",
        isSelected && "ring-2 ring-brand-500 ring-offset-1 scale-105 z-10"
      )}
      style={{ backgroundColor: color.hex }}
    >
      {isSelected && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Check
            className={cn(
              "h-3 w-3 drop-shadow-md",
              isDark ? "text-white" : "text-surface-800"
            )}
          />
        </span>
      )}

      {/* Tooltip */}
      <span className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-surface-800 px-1.5 py-0.5 text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none z-30">
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
  const [isExpanded, setIsExpanded] = useState(true);

  const recentColorObjects = recentColors
    .map((hex) => HexColorsList.find((c) => c.hex === hex))
    .filter((c): c is MosaicColor => c !== undefined)
    .slice(0, 6);

  return (
    <div className="rounded-lg border border-surface-200 bg-surface-50 overflow-hidden">
      {/* Header - Clickable to expand/collapse */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-3 py-2 bg-surface-100 hover:bg-surface-200 transition-colors"
      >
        {/* Left: Title */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-surface-600 uppercase tracking-wider">
            Colors
          </span>
          {selectedPartId && (
            <span className="text-xs text-brand-600 font-medium">
              → {selectedPartId}
            </span>
          )}
        </div>

        {/* Right: Expand/Collapse icon */}
        {isExpanded ? (
          <ChevronUp className="h-4 w-4 text-surface-400" />
        ) : (
          <ChevronDown className="h-4 w-4 text-surface-400" />
        )}
      </button>

      {/* Color grid - Collapsible */}
      <div
        className={cn(
          "transition-all duration-300 ease-in-out overflow-hidden",
          isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="p-3">
          {/* Recent colors */}
          {recentColorObjects.length > 0 && (
            <div className="mb-3 pb-3 border-b border-surface-200">
              <div className="text-[10px] font-medium text-surface-500 uppercase tracking-wider mb-2">
                Recent
              </div>
              <div className="flex gap-1.5">
                {recentColorObjects.map((color) => (
                  <button
                    key={`recent-${color.hex}`}
                    onClick={() => onSelectColor(color)}
                    className={cn(
                      "h-6 w-6 rounded border border-surface-300 cursor-pointer hover:scale-110 transition-transform",
                      selectedColor === color.hex && "ring-2 ring-brand-500"
                    )}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          )}

          {/* All colors - 6 columns grid */}
          <div className="text-[10px] font-medium text-surface-500 uppercase tracking-wider mb-2">
            All Colors
          </div>
          <div className="grid grid-cols-6 gap-1.5">
            {HexColorsList.map((color) => (
              <ColorButton
                key={color.hex}
                color={color}
                isSelected={selectedColor === color.hex}
                onClick={() => onSelectColor(color)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
