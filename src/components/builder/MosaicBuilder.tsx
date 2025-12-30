import { useState, useCallback, useMemo } from "react";
import { cn } from "@/lib/utils";
import type { Mosaic } from "@/hooks/useMosaics";
import type { PartColor } from "@/types/mosaic";
import type { MosaicColor } from "@/data/colors";
import { PartSelector } from "./PartSelector";
import { ColorPalette } from "./ColorPalette";
import { TileMatrix } from "./TileMatrix";
import {
  Undo2,
  Redo2,
  Save,
  RotateCcw,
  FileText,
  ChevronLeft,
} from "lucide-react";

interface MosaicBuilderProps {
  mosaic: Mosaic;
  onBack: () => void;
}

// Initialize parts from SVG (extract default colors)
function initializePartsFromSvg(svg: string): PartColor[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svg, "image/svg+xml");
  const groups = doc.querySelectorAll("g[id^='part']");

  const parts: PartColor[] = [];

  groups.forEach((g) => {
    const id = g.getAttribute("id");
    if (!id) return;

    // Get the first shape's fill color
    const firstShape = g.querySelector("path, rect, circle, polygon, ellipse");
    const fill = firstShape?.getAttribute("fill") || "#CCCCCC";

    parts.push({
      partId: id,
      colorHex: fill.toUpperCase(),
    });
  });

  return parts;
}

// Parse rotation from mosaic metadata
function parseRotation(mosaic: Mosaic): number[][] | undefined {
  if (!mosaic.rotation) return undefined;
  
  try {
    // If rotation is already an array, use it
    if (Array.isArray(mosaic.rotation)) {
      return mosaic.rotation as number[][];
    }
    // If it's a string, try to parse it
    if (typeof mosaic.rotation === "string") {
      return JSON.parse(mosaic.rotation);
    }
  } catch {
    return undefined;
  }
  
  return undefined;
}

// Action button component
function ActionButton({
  icon: Icon,
  label,
  onClick,
  disabled,
  variant = "default",
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "default" | "primary" | "danger";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        variant === "default" && [
          "bg-white border border-surface-200 text-surface-700",
          "hover:bg-surface-50 hover:border-surface-300",
          "focus:ring-surface-400",
          "disabled:opacity-50 disabled:cursor-not-allowed",
        ],
        variant === "primary" && [
          "bg-brand-600 text-white",
          "hover:bg-brand-700",
          "focus:ring-brand-500",
          "disabled:opacity-50 disabled:cursor-not-allowed",
        ],
        variant === "danger" && [
          "bg-white border border-red-200 text-red-600",
          "hover:bg-red-50 hover:border-red-300",
          "focus:ring-red-400",
          "disabled:opacity-50 disabled:cursor-not-allowed",
        ]
      )}
    >
      <Icon className="h-4 w-4" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}

export function MosaicBuilder({ mosaic, onBack }: MosaicBuilderProps) {
  // State
  const [parts, setParts] = useState<PartColor[]>(() =>
    initializePartsFromSvg(mosaic.svg)
  );
  const [selectedPartId, setSelectedPartId] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [recentColors, setRecentColors] = useState<string[]>([]);

  // Parse rotation from mosaic
  const rotation = useMemo(() => parseRotation(mosaic), [mosaic]);

  // Update SVG with current parts colors
  const currentSvg = useMemo(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(mosaic.svg, "image/svg+xml");

    parts.forEach(({ partId, colorHex }) => {
      const group = doc.getElementById(partId);
      if (!group) return;

      const elements = group.querySelectorAll(
        "path, rect, circle, polygon, ellipse"
      );
      elements.forEach((el) => {
        el.setAttribute("fill", colorHex);
      });
    });

    return new XMLSerializer().serializeToString(doc);
  }, [mosaic.svg, parts]);

  // Handle part selection
  const handleSelectPart = useCallback((partId: string) => {
    setSelectedPartId(partId);
  }, []);

  // Handle color selection
  const handleSelectColor = useCallback(
    (color: MosaicColor) => {
      setSelectedColor(color.hex);

      // If a part is selected, apply the color
      if (selectedPartId) {
        setParts((prev) =>
          prev.map((part) =>
            part.partId === selectedPartId
              ? { ...part, colorHex: color.hex }
              : part
          )
        );

        // Add to recent colors
        setRecentColors((prev) => {
          const filtered = prev.filter((c) => c !== color.hex);
          return [color.hex, ...filtered].slice(0, 8);
        });
      }
    },
    [selectedPartId]
  );

  // Reset colors to original
  const handleReset = useCallback(() => {
    setParts(initializePartsFromSvg(mosaic.svg));
    setSelectedPartId(null);
    setSelectedColor(null);
  }, [mosaic.svg]);

  return (
    <div className="flex flex-col h-full min-h-[600px]">
      {/* Action Bar */}
      <div className="flex items-center justify-between gap-4 border-b border-surface-200 bg-white px-4 py-3">
        {/* Left: Back button */}
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm font-medium text-surface-600 hover:text-surface-900 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Back to tiles</span>
        </button>

        {/* Center: Mosaic name */}
        <h2 className="font-display text-lg font-semibold text-surface-900 hidden sm:block">
          {mosaic.name}
        </h2>

        {/* Right: Action buttons */}
        <div className="flex items-center gap-2">
          <ActionButton
            icon={Undo2}
            label="Undo"
            disabled
            onClick={() => {}}
          />
          <ActionButton
            icon={Redo2}
            label="Redo"
            disabled
            onClick={() => {}}
          />
          <div className="hidden sm:block w-px h-6 bg-surface-200" />
          <ActionButton
            icon={RotateCcw}
            label="Reset"
            variant="danger"
            onClick={handleReset}
          />
          <ActionButton
            icon={Save}
            label="Save"
            onClick={() => {}}
          />
          <ActionButton
            icon={FileText}
            label="Quote"
            variant="primary"
            onClick={() => {}}
          />
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Parts, Colors, Preview */}
        <aside className="w-72 flex-shrink-0 overflow-y-auto border-r border-surface-200 bg-surface-50 p-4 lg:w-80">
          <div className="space-y-6">
            {/* SVG Preview */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-surface-900">
                Preview
              </h3>
              <div
                className={cn(
                  "aspect-square rounded-xl border-2 bg-white p-4 shadow-soft",
                  "transition-all duration-150",
                  selectedPartId
                    ? "border-brand-200"
                    : "border-surface-200"
                )}
              >
                <div
                  className="h-full w-full"
                  dangerouslySetInnerHTML={{ __html: currentSvg }}
                />
              </div>
            </div>

            {/* Parts Selector */}
            <PartSelector
              svg={currentSvg}
              parts={parts}
              selectedPartId={selectedPartId}
              onSelectPart={handleSelectPart}
            />

            {/* Color Palette */}
            <ColorPalette
              selectedColor={selectedColor}
              onSelectColor={handleSelectColor}
              recentColors={recentColors}
            />
          </div>
        </aside>

        {/* Main Area - Tile Matrix */}
        <main className="flex-1 overflow-y-auto bg-surface-100 p-6 lg:p-8">
          <div className="mx-auto max-w-2xl">
            {/* Instructions */}
            {!selectedPartId && (
              <div className="mb-6 rounded-lg bg-brand-50 border border-brand-200 p-4 text-center">
                <p className="text-sm text-brand-700">
                  <span className="font-semibold">Tip:</span> Select a part from
                  the sidebar, then choose a color to customize your mosaic.
                </p>
              </div>
            )}

            {/* Matrix */}
            <TileMatrix
              svg={currentSvg}
              parts={parts}
              rotation={rotation}
              showBorder={mosaic.category === "border"}
            />

            {/* Info panel */}
            <div className="mt-6 rounded-lg bg-white border border-surface-200 p-4">
              <dl className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
                <div>
                  <dt className="text-surface-500">Tile</dt>
                  <dd className="font-medium text-surface-900">{mosaic.name}</dd>
                </div>
                <div>
                  <dt className="text-surface-500">Category</dt>
                  <dd className="font-medium text-surface-900 capitalize">
                    {mosaic.category}
                  </dd>
                </div>
                <div>
                  <dt className="text-surface-500">Dimensions</dt>
                  <dd className="font-medium text-surface-900">
                    {mosaic.width}×{mosaic.height} cm
                  </dd>
                </div>
                <div>
                  <dt className="text-surface-500">Parts</dt>
                  <dd className="font-medium text-surface-900">
                    {parts.length}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
