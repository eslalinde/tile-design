import { cn } from "@/lib/utils";
import { HexColorsList, type MosaicColor } from "@/data/colors";
import { Check } from "lucide-react";

interface ColorPaletteProps {
  selectedColor: string | null;
  onSelectColor: (color: MosaicColor) => void;
  recentColors?: string[];
}

// Organize colors by category for better UX
const colorGroups = {
  neutrals: HexColorsList.filter((c) =>
    ["C1", "C2", "C3", "C13", "C14", "C15", "C25", "C26", "C27"].some((code) =>
      c.name.startsWith(code)
    )
  ),
  warm: HexColorsList.filter((c) =>
    ["C5", "C6", "C7", "C17", "C18", "C19", "C30", "C31"].some((code) =>
      c.name.startsWith(code)
    )
  ),
  earth: HexColorsList.filter((c) =>
    ["C4", "C8", "C16", "C20", "C28", "C29", "C32", "C33"].some((code) =>
      c.name.startsWith(code)
    )
  ),
  cool: HexColorsList.filter((c) =>
    ["C9", "C10", "C11", "C21", "C22", "C23", "C34", "C35", "C36"].some((code) =>
      c.name.startsWith(code)
    )
  ),
  accent: HexColorsList.filter((c) =>
    ["C12", "C24"].some((code) => c.name.startsWith(code))
  ),
};

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
  return (
    <button
      type="button"
      onClick={onClick}
      title={color.name}
      className={cn(
        "group relative rounded-md transition-all duration-150",
        "hover:scale-110 hover:shadow-md hover:z-10",
        "focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-1",
        size === "small" ? "h-6 w-6" : "h-8 w-8",
        isSelected && "ring-2 ring-brand-600 ring-offset-2 scale-110 z-10"
      )}
      style={{ backgroundColor: color.hex }}
    >
      {isSelected && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Check
            className={cn(
              "drop-shadow-md",
              size === "small" ? "h-3 w-3" : "h-4 w-4",
              // Use white or black check based on color brightness
              parseInt(color.hex.slice(1), 16) > 0x888888
                ? "text-surface-800"
                : "text-white"
            )}
          />
        </span>
      )}
      
      {/* Tooltip */}
      <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-surface-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none z-20">
        {color.name}
      </span>
    </button>
  );
}

function ColorGroup({
  label,
  colors,
  selectedColor,
  onSelectColor,
}: {
  label: string;
  colors: MosaicColor[];
  selectedColor: string | null;
  onSelectColor: (color: MosaicColor) => void;
}) {
  if (colors.length === 0) return null;

  return (
    <div className="space-y-1.5">
      <span className="text-xs font-medium text-surface-500 uppercase tracking-wider">
        {label}
      </span>
      <div className="flex flex-wrap gap-1.5">
        {colors.map((color) => (
          <ColorButton
            key={color.hex}
            color={color}
            isSelected={selectedColor === color.hex}
            onClick={() => onSelectColor(color)}
          />
        ))}
      </div>
    </div>
  );
}

export function ColorPalette({
  selectedColor,
  onSelectColor,
  recentColors = [],
}: ColorPaletteProps) {
  const recentColorObjects = recentColors
    .map((hex) => HexColorsList.find((c) => c.hex === hex))
    .filter((c): c is MosaicColor => c !== undefined)
    .slice(0, 8);

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-surface-900">Colors</h3>

      {/* Recent colors */}
      {recentColorObjects.length > 0 && (
        <div className="space-y-1.5">
          <span className="text-xs font-medium text-surface-500 uppercase tracking-wider">
            Recent
          </span>
          <div className="flex flex-wrap gap-1.5">
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

      {/* Color groups */}
      <div className="space-y-3">
        <ColorGroup
          label="Neutrals"
          colors={colorGroups.neutrals}
          selectedColor={selectedColor}
          onSelectColor={onSelectColor}
        />
        <ColorGroup
          label="Warm"
          colors={colorGroups.warm}
          selectedColor={selectedColor}
          onSelectColor={onSelectColor}
        />
        <ColorGroup
          label="Earth"
          colors={colorGroups.earth}
          selectedColor={selectedColor}
          onSelectColor={onSelectColor}
        />
        <ColorGroup
          label="Cool"
          colors={colorGroups.cool}
          selectedColor={selectedColor}
          onSelectColor={onSelectColor}
        />
        <ColorGroup
          label="Accent"
          colors={colorGroups.accent}
          selectedColor={selectedColor}
          onSelectColor={onSelectColor}
        />
      </div>
    </div>
  );
}
