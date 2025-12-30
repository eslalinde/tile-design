import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import type { PartColor } from "@/types/mosaic";

interface PartSelectorProps {
  svg: string;
  parts: PartColor[];
  selectedPartId: string | null;
  onSelectPart: (partId: string) => void;
}

interface ParsedPart {
  id: string;
  label: string;
  currentColor: string;
}

// Parse SVG to extract parts (g elements with id starting with "part")
function parseSvgParts(svg: string, parts: PartColor[]): ParsedPart[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svg, "image/svg+xml");
  const groupElements = doc.querySelectorAll("g[id^='part']");

  const parsedParts: ParsedPart[] = [];

  groupElements.forEach((g) => {
    const id = g.getAttribute("id");
    if (!id) return;

    // Find current color from parts array
    const partColor = parts.find((p) => p.partId === id);
    
    // Get the first path/shape element to extract its fill color as fallback
    const firstShape = g.querySelector("path, rect, circle, polygon, ellipse");
    const defaultColor = firstShape?.getAttribute("fill") || "#CCCCCC";

    parsedParts.push({
      id,
      label: formatPartLabel(id),
      currentColor: partColor?.colorHex || defaultColor,
    });
  });

  // Sort by part number
  parsedParts.sort((a, b) => {
    const numA = parseInt(a.id.replace("part", "")) || 0;
    const numB = parseInt(b.id.replace("part", "")) || 0;
    return numA - numB;
  });

  return parsedParts;
}

// Format part ID to human-readable label
function formatPartLabel(partId: string): string {
  const num = partId.replace("part", "");
  return `Part ${num}`;
}

// Create a mini SVG showing just the part
function createPartThumbnail(svg: string, partId: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svg, "image/svg+xml");
  const svgElement = doc.querySelector("svg");
  
  if (!svgElement) return "";

  // Clone the SVG
  const clonedSvg = svgElement.cloneNode(true) as SVGSVGElement;
  
  // Hide all groups except the target part
  const allGroups = clonedSvg.querySelectorAll("g[id^='part']");
  allGroups.forEach((g) => {
    if (g.getAttribute("id") !== partId) {
      (g as SVGGElement).style.opacity = "0.15";
    }
  });

  return new XMLSerializer().serializeToString(clonedSvg);
}

function PartButton({
  part,
  svg,
  isSelected,
  onClick,
}: {
  part: ParsedPart;
  svg: string;
  isSelected: boolean;
  onClick: () => void;
}) {
  const thumbnailSvg = useMemo(
    () => createPartThumbnail(svg, part.id),
    [svg, part.id]
  );

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative flex flex-col items-center gap-2 rounded-lg border-2 p-2 transition-all duration-150",
        "hover:border-brand-400 hover:shadow-soft",
        "focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2",
        isSelected
          ? "border-brand-600 bg-brand-50 shadow-soft"
          : "border-surface-200 bg-white hover:bg-surface-50"
      )}
    >
      {/* Thumbnail */}
      <div
        className="h-12 w-12 overflow-hidden"
        dangerouslySetInnerHTML={{ __html: thumbnailSvg }}
      />

      {/* Label with color indicator */}
      <div className="flex items-center gap-1.5">
        <span
          className="h-3 w-3 rounded-full border border-surface-300"
          style={{ backgroundColor: part.currentColor }}
        />
        <span
          className={cn(
            "text-xs font-medium",
            isSelected ? "text-brand-700" : "text-surface-600"
          )}
        >
          {part.label}
        </span>
      </div>

      {/* Selected indicator */}
      {isSelected && (
        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-600">
          <Check className="h-3 w-3 text-white" />
        </span>
      )}
    </button>
  );
}

export function PartSelector({
  svg,
  parts,
  selectedPartId,
  onSelectPart,
}: PartSelectorProps) {
  const parsedParts = useMemo(() => parseSvgParts(svg, parts), [svg, parts]);

  if (parsedParts.length === 0) {
    return (
      <div className="rounded-lg bg-surface-100 p-4 text-center text-sm text-surface-500">
        No customizable parts found
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-surface-900">Parts</h3>
        {selectedPartId && (
          <span className="text-xs text-brand-600 font-medium">
            Selected: {formatPartLabel(selectedPartId)}
          </span>
        )}
      </div>

      <p className="text-xs text-surface-500">
        Select a part, then choose a color.
      </p>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
        {parsedParts.map((part) => (
          <PartButton
            key={part.id}
            part={part}
            svg={svg}
            isSelected={selectedPartId === part.id}
            onClick={() => onSelectPart(part.id)}
          />
        ))}
      </div>
    </div>
  );
}
