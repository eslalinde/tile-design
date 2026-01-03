import { useMemo } from "react";
import { cn } from "@/lib/utils";
import type { PartColor, BorderState } from "@/types/mosaic";

interface CompactPartSelectorProps {
  svg: string;
  parts: PartColor[];
  selectedPartId: string | null;
  onSelectPart: (partId: string) => void;
  borderState?: BorderState | null;
}

interface ParsedPart {
  id: string;
  label: string;
  currentColor: string;
  number: number;
}

// Parse SVG to extract parts
function parseSvgParts(svg: string, parts: PartColor[]): ParsedPart[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svg, "image/svg+xml");
  const groupElements = doc.querySelectorAll("g[id^='part']");

  const parsedParts: ParsedPart[] = [];

  groupElements.forEach((g) => {
    const id = g.getAttribute("id");
    if (!id) return;

    const partColor = parts.find((p) => p.partId === id);
    const firstShape = g.querySelector("path, rect, circle, polygon, ellipse");
    const defaultColor = firstShape?.getAttribute("fill") || "#CCCCCC";
    const number = parseInt(id.replace("part", "")) || 0;

    parsedParts.push({
      id,
      label: `P${number}`,
      currentColor: partColor?.colorHex || defaultColor,
      number,
    });
  });

  parsedParts.sort((a, b) => a.number - b.number);
  return parsedParts;
}

// Parse border parts (shared across all border components)
function parseBorderParts(parts: PartColor[]): ParsedPart[] {
  return parts
    .map((p) => {
      const number = parseInt(p.partId.replace("part", "")) || 0;
      return {
        id: `border:${p.partId}`, // Prefix with "border:" to distinguish from mosaic parts
        label: `P${number}`,
        currentColor: p.colorHex,
        number,
      };
    })
    .sort((a, b) => a.number - b.number);
}

// Part button component
function PartButton({
  part,
  isSelected,
  onSelect,
}: {
  part: ParsedPart;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "group relative flex items-center gap-2 rounded-lg px-3 py-2 transition-all duration-150",
        "border-2 hover:shadow-soft",
        "focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2",
        isSelected
          ? "border-brand-600 bg-brand-50 shadow-soft"
          : "border-surface-200 bg-white hover:border-brand-300 hover:bg-surface-50"
      )}
    >
      {/* Color indicator */}
      <span
        className={cn(
          "h-5 w-5 rounded-full border-2 transition-transform",
          isSelected ? "border-brand-600 scale-110" : "border-surface-300"
        )}
        style={{ backgroundColor: part.currentColor }}
      />

      {/* Part label */}
      <span
        className={cn(
          "text-sm font-medium",
          isSelected ? "text-brand-700" : "text-surface-700"
        )}
      >
        {part.label}
      </span>
    </button>
  );
}

export function CompactPartSelector({
  svg,
  parts,
  selectedPartId,
  onSelectPart,
  borderState,
}: CompactPartSelectorProps) {
  const parsedParts = useMemo(() => parseSvgParts(svg, parts), [svg, parts]);

  // Parse border parts if border is selected (shared across all components)
  const borderParts = useMemo(() => {
    if (!borderState) return null;
    return parseBorderParts(borderState.parts);
  }, [borderState]);

  // Get display name for selected part
  const getSelectedPartDisplay = () => {
    if (!selectedPartId) return null;
    
    // Check if it's a border part (format: "border:part1")
    if (selectedPartId.startsWith("border:")) {
      const partId = selectedPartId.replace("border:", "");
      return `Border ${partId}`;
    }
    
    return selectedPartId;
  };

  if (parsedParts.length === 0 && !borderParts) {
    return (
      <div className="rounded-lg bg-surface-100 p-3 text-center text-sm text-surface-500">
        No customizable parts
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Mosaic Parts Section */}
      {parsedParts.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-surface-900">Tile Parts</h3>
            <span className="text-xs text-surface-500">{parsedParts.length} parts</span>
          </div>

          {/* Compact grid of mosaic parts */}
          <div className="flex flex-wrap gap-2">
            {parsedParts.map((part) => (
              <PartButton
                key={part.id}
                part={part}
                isSelected={selectedPartId === part.id}
                onSelect={() => onSelectPart(part.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Border Parts Section */}
      {borderParts && borderParts.length > 0 && (
        <div className="space-y-3">
          {/* Separator */}
          <div className="flex items-center gap-2">
            <div className="flex-1 h-px bg-surface-200" />
            <span className="text-xs font-semibold text-surface-500 uppercase tracking-wider">
              Border
            </span>
            <div className="flex-1 h-px bg-surface-200" />
          </div>

          {/* Border parts (shared across corner and sides) */}
          <div className="bg-surface-50 rounded-lg p-3 border border-surface-200">
            <div className="flex flex-wrap gap-1.5">
              {borderParts.map((part) => (
                <PartButton
                  key={part.id}
                  part={part}
                  isSelected={selectedPartId === part.id}
                  onSelect={() => onSelectPart(part.id)}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Instruction text */}
      <p className="text-xs text-surface-500">
        {selectedPartId
          ? `Click a color below to apply to ${getSelectedPartDisplay()}`
          : "Select a part, then choose a color from the palette below"}
      </p>
    </div>
  );
}
