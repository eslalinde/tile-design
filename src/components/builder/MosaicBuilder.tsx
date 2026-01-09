import { useState, useCallback, useMemo, useEffect } from "react";
import { cn } from "@/lib/utils";
import type { Mosaic } from "@/hooks/useMosaics";
import { useHistoryState } from "@/hooks/useHistoryState";
import type { PartColor, RectanglePattern, BorderState } from "@/types/mosaic";
import type { MosaicColor } from "@/data/colors";
import { CompactPartSelector } from "./CompactPartSelector";
import { ColorDock } from "./ColorDock";
import { TileMatrix, type BorderData } from "./TileMatrix";
import { PatternSelector } from "./PatternSelector";
import { BorderSelector } from "./BorderSelector";
import { getDefaultPattern } from "@/lib/patterns";
import { QuoteModal } from "@/components/quote";

// Helper to apply colors to SVG
function applyColorsToSvg(svg: string, parts: PartColor[]): string {
  if (parts.length === 0) return svg;

  const parser = new DOMParser();
  const doc = parser.parseFromString(svg, "image/svg+xml");

  parts.forEach(({ partId, colorHex }) => {
    const group = doc.getElementById(partId);
    if (!group) return;

    const elements = group.querySelectorAll("path, rect, circle, polygon, ellipse");
    elements.forEach((el) => {
      el.setAttribute("fill", colorHex);
    });
  });

  return new XMLSerializer().serializeToString(doc);
}
import {
  Undo2,
  Redo2,
  Save,
  RotateCcw,
  FileText,
  ChevronLeft,
  ChevronRight,
  Info,
  Check,
} from "lucide-react";

// Categories that support borders (square-based mosaics)
const BORDER_CATEGORIES = ["paris", "barcelona", "morocco", "square"];

// Collapsible Info Panel Component
function InfoPanel({ 
  mosaic, 
  partsCount,
  selectedBorder,
  coloredBorderSvgs,
}: { 
  mosaic: Mosaic; 
  partsCount: number;
  selectedBorder: BorderState | null;
  coloredBorderSvgs?: {
    cornerSvg: string;
    sideSvg1: string;
    sideSvg2?: string;
  } | null;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // Calculate aspect ratio for proportional preview
  const aspectRatio = mosaic.width && mosaic.height 
    ? mosaic.width / mosaic.height 
    : 1;

  if (isCollapsed) {
    return (
      <div className="flex-shrink-0 border-l border-surface-200 bg-white">
        <button
          onClick={() => setIsCollapsed(false)}
          className="h-full w-10 flex flex-col items-center justify-center gap-2 hover:bg-surface-50 transition-colors"
          title="Show info panel"
        >
          <Info className="h-4 w-4 text-surface-400" />
          <ChevronLeft className="h-4 w-4 text-surface-400" />
        </button>
      </div>
    );
  }

  return (
    <aside className="w-56 flex-shrink-0 border-l border-surface-200 bg-white lg:w-64 overflow-y-auto">
      {/* Header with collapse button */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-surface-200">
        <h3 className="text-xs font-semibold text-surface-600 uppercase tracking-wider">
          Tile Info
        </h3>
        <button
          onClick={() => setIsCollapsed(true)}
          className="p-1 rounded hover:bg-surface-100 transition-colors"
          title="Hide info panel"
        >
          <ChevronRight className="h-4 w-4 text-surface-400" />
        </button>
      </div>

      <div className="p-4">
        {/* Original SVG Preview - proportional */}
        <div className="mb-4">
          <h4 className="text-[10px] font-semibold text-surface-500 uppercase tracking-wider mb-2">
            Original
          </h4>
          <div className="rounded-lg bg-surface-50 p-3 border border-surface-200">
            <div
              className="w-full [&>svg]:w-full [&>svg]:h-full"
              style={{ aspectRatio }}
              dangerouslySetInnerHTML={{ __html: mosaic.svg }}
            />
          </div>
        </div>

        {/* Tile Info */}
        <div className="mb-4">
          <h4 className="text-[10px] font-semibold text-surface-500 uppercase tracking-wider mb-2">
            Details
          </h4>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between gap-2">
              <dt className="text-surface-500">Name</dt>
              <dd className="font-medium text-surface-900 truncate">
                {mosaic.name}
              </dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt className="text-surface-500">Category</dt>
              <dd className="font-medium text-surface-900 capitalize">
                {mosaic.category}
              </dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt className="text-surface-500">Dimensions</dt>
              <dd className="font-medium text-surface-900">
                {mosaic.width}×{mosaic.height}
              </dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt className="text-surface-500">Parts</dt>
              <dd className="font-medium text-surface-900">{partsCount}</dd>
            </div>
          </dl>
        </div>

        {/* Border Info - Only shown when a border is selected */}
        {selectedBorder && coloredBorderSvgs && (
          <div className="pt-4 border-t border-surface-200">
            <h4 className="text-[10px] font-semibold text-surface-500 uppercase tracking-wider mb-2">
              Border
            </h4>
            <p className="text-sm font-medium text-surface-900 mb-3">
              {selectedBorder.name}
            </p>
            
            {/* Border SVG Previews - Using colored SVGs */}
            <div className="grid grid-cols-3 gap-2">
              {/* Corner */}
              <div className="flex flex-col items-center">
                <div
                  className="aspect-square w-full rounded bg-surface-50 border border-surface-200 overflow-hidden [&>svg]:w-full [&>svg]:h-full"
                  dangerouslySetInnerHTML={{ __html: coloredBorderSvgs.cornerSvg }}
                />
                <span className="text-[9px] text-surface-400 mt-1 font-medium uppercase">
                  Corner
                </span>
              </div>
              
              {/* Side 1 */}
              <div className="flex flex-col items-center">
                <div
                  className="aspect-square w-full rounded bg-surface-50 border border-surface-200 overflow-hidden [&>svg]:w-full [&>svg]:h-full"
                  dangerouslySetInnerHTML={{ __html: coloredBorderSvgs.sideSvg1 }}
                />
                <span className="text-[9px] text-surface-400 mt-1 font-medium uppercase">
                  {coloredBorderSvgs.sideSvg2 ? "Side 1" : "Side"}
                </span>
              </div>
              
              {/* Side 2 (if exists) */}
              {coloredBorderSvgs.sideSvg2 ? (
                <div className="flex flex-col items-center">
                  <div
                    className="aspect-square w-full rounded bg-surface-50 border border-surface-200 overflow-hidden [&>svg]:w-full [&>svg]:h-full"
                    dangerouslySetInnerHTML={{ __html: coloredBorderSvgs.sideSvg2 }}
                  />
                  <span className="text-[9px] text-surface-400 mt-1 font-medium uppercase">
                    Side 2
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="aspect-square w-full rounded bg-surface-50 border border-dashed border-surface-200" />
                  <span className="text-[9px] text-surface-300 mt-1">—</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

interface MosaicBuilderProps {
  mosaic: Mosaic;
  onBack: () => void;
  onSave?: (
    mosaic: Mosaic,
    parts: PartColor[],
    currentSvg: string,
    pattern?: RectanglePattern,
    border?: BorderState | null
  ) => void;
  initialParts?: PartColor[];
  initialPattern?: RectanglePattern;
  initialBorder?: BorderState | null;
  isEditingExisting?: boolean;
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
    if (Array.isArray(mosaic.rotation)) {
      return mosaic.rotation as number[][];
    }
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

export function MosaicBuilder({
  mosaic,
  onBack,
  onSave,
  initialParts,
  initialPattern,
  initialBorder,
  isEditingExisting = false,
}: MosaicBuilderProps) {
  // State with undo/redo history
  const {
    state: parts,
    set: setParts,
    undo,
    redo,
    reset: resetParts,
    canUndo,
    canRedo,
  } = useHistoryState<PartColor[]>(() => 
    initialParts || initializePartsFromSvg(mosaic.svg)
  );

  const [selectedPartId, setSelectedPartId] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [recentColors, setRecentColors] = useState<string[]>([]);
  
  // Save feedback state
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");
  
  // Quote modal state
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  
  // Pattern state for rectangular tiles
  const [selectedPattern, setSelectedPattern] = useState<RectanglePattern>(
    () => initialPattern || getDefaultPattern(mosaic.shape) || "brick"
  );

  // Border state for square tiles
  const [selectedBorder, setSelectedBorder] = useState<BorderState | null>(
    () => initialBorder ?? null
  );

  // Parse rotation from mosaic
  const rotation = useMemo(() => parseRotation(mosaic), [mosaic]);
  
  // Check if mosaic is rectangular
  const isRectangular = mosaic.shape === "rectangle";
  const tileAspectRatio = mosaic.width && mosaic.height ? mosaic.width / mosaic.height : 1;

  // Check if mosaic supports borders
  const supportsBorder = BORDER_CATEGORIES.includes(mosaic.category);

  // Convert BorderState to BorderData for TileMatrix with colored SVGs
  // All border components use the same shared parts
  const borderData: BorderData | undefined = useMemo(() => {
    if (!selectedBorder) return undefined;
    const { parts: borderParts } = selectedBorder;
    return {
      cornerSvg: applyColorsToSvg(selectedBorder.cornerSvg, borderParts),
      sideSvg1: applyColorsToSvg(selectedBorder.sideSvg1, borderParts),
      sideSvg2: selectedBorder.sideSvg2
        ? applyColorsToSvg(selectedBorder.sideSvg2, borderParts)
        : undefined,
      cornerParts: borderParts,
      sideParts1: borderParts,
      sideParts2: borderParts,
    };
  }, [selectedBorder]);

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
        // Check if it's a border part (format: "border:part1")
        if (selectedPartId.startsWith("border:") && selectedBorder) {
          const partId = selectedPartId.replace("border:", "");
          
          // Update border part color (shared across all border components)
          setSelectedBorder((prev) => {
            if (!prev) return prev;
            return {
              ...prev,
              parts: prev.parts.map((p) =>
                p.partId === partId ? { ...p, colorHex: color.hex } : p
              ),
            };
          });
        } else {
          // Update mosaic part color
          setParts((draft) => {
            const part = draft.find((p) => p.partId === selectedPartId);
            if (part) {
              part.colorHex = color.hex;
            }
          });
        }

        // Add to recent colors
        setRecentColors((prev) => {
          const filtered = prev.filter((c) => c !== color.hex);
          return [color.hex, ...filtered].slice(0, 6);
        });
      }
    },
    [selectedPartId, selectedBorder, setParts]
  );

  // Reset colors to original
  const handleReset = useCallback(() => {
    resetParts(initializePartsFromSvg(mosaic.svg));
    setSelectedPartId(null);
    setSelectedColor(null);
  }, [mosaic.svg, resetParts]);

  // Handle save design
  const handleSave = useCallback(() => {
    if (!onSave) return;
    
    setSaveStatus("saving");
    
    // Call the save function with all design data including border
    onSave(
      mosaic,
      parts,
      currentSvg,
      isRectangular ? selectedPattern : undefined,
      selectedBorder
    );
    
    // Show saved feedback
    setSaveStatus("saved");
    
    // Reset after 2 seconds
    setTimeout(() => {
      setSaveStatus("idle");
    }, 2000);
  }, [onSave, mosaic, parts, currentSvg, isRectangular, selectedPattern, selectedBorder]);

  // Keyboard shortcuts for undo/redo/save
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Ctrl+Z (Windows/Linux) or Cmd+Z (Mac)
      const isUndo = (e.ctrlKey || e.metaKey) && e.key === "z" && !e.shiftKey;
      // Check for Ctrl+Shift+Z or Ctrl+Y (Windows/Linux) or Cmd+Shift+Z (Mac)
      const isRedo =
        ((e.ctrlKey || e.metaKey) && e.key === "z" && e.shiftKey) ||
        ((e.ctrlKey || e.metaKey) && e.key === "y");
      // Check for Ctrl+S (Windows/Linux) or Cmd+S (Mac)
      const isSave = (e.ctrlKey || e.metaKey) && e.key === "s";

      if (isUndo) {
        e.preventDefault();
        undo();
      } else if (isRedo) {
        e.preventDefault();
        redo();
      } else if (isSave) {
        e.preventDefault();
        handleSave();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [undo, redo, handleSave]);

  return (
    <div className="flex flex-col min-h-0">
      {/* Action Bar - Sticky below stepper (header 64px + stepper ~88px = ~152px) */}
      <div className="relative flex items-center justify-between gap-4 border-b border-surface-200 bg-white px-4 py-3 sticky top-[152px] z-30 shadow-sm flex-shrink-0">
        {/* Left: Back button */}
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm font-medium text-surface-600 hover:text-surface-900 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Back</span>
        </button>

        {/* Center: Mosaic name - Absolutely centered */}
        <h2 className="absolute left-1/2 -translate-x-1/2 font-display text-lg font-semibold text-surface-900">
          {mosaic.name}
        </h2>

        {/* Right: Action buttons */}
        <div className="flex items-center gap-2">
          <ActionButton icon={Undo2} label="Undo" disabled={!canUndo} onClick={undo} />
          <ActionButton icon={Redo2} label="Redo" disabled={!canRedo} onClick={redo} />
          <div className="hidden sm:block w-px h-6 bg-surface-200" />
          <ActionButton
            icon={RotateCcw}
            label="Reset"
            variant="danger"
            onClick={handleReset}
          />
          <ActionButton
            icon={saveStatus === "saved" ? Check : Save}
            label={
              saveStatus === "saving"
                ? "Saving..."
                : saveStatus === "saved"
                ? "Saved"
                : "Save"
            }
            onClick={handleSave}
            disabled={saveStatus === "saving"}
            variant={saveStatus === "saved" ? "primary" : "default"}
          />
          <ActionButton
            icon={FileText}
            label="Quote"
            variant="primary"
            onClick={() => setIsQuoteModalOpen(true)}
          />
        </div>
      </div>

      {/* Main content - Two column layout */}
      <div className="flex">
        {/* Left Sidebar - Parts & Colors (Actions) */}
        <aside className="w-64 flex-shrink-0 border-r border-surface-200 bg-white lg:w-72 overflow-y-auto">
          <div className="p-4">
            {/* Pattern Selector - Only for rectangular tiles */}
            {isRectangular && (
              <div className="mb-5">
                <PatternSelector
                  selectedPattern={selectedPattern}
                  onSelectPattern={setSelectedPattern}
                  tileAspectRatio={tileAspectRatio}
                />
              </div>
            )}

            {/* Border Selector - Only for square-based tiles */}
            {supportsBorder && (
              <div className="mb-5">
                <BorderSelector
                  selectedBorder={selectedBorder}
                  onSelectBorder={setSelectedBorder}
                />
              </div>
            )}
            
            {/* Parts Selector */}
            <CompactPartSelector
              svg={currentSvg}
              parts={parts}
              selectedPartId={selectedPartId}
              onSelectPart={handleSelectPart}
              borderState={selectedBorder}
            />

            {/* Color Palette */}
            <div className="mt-5">
              <ColorDock
                selectedColor={selectedColor}
                onSelectColor={handleSelectColor}
                recentColors={recentColors}
                selectedPartId={selectedPartId}
              />
            </div>
          </div>
        </aside>

        {/* Main Area - Tile Matrix */}
        <main className="flex-1 bg-surface-100">
          <div className="p-4 lg:p-6 mx-auto max-w-xl">
            {/* Instructions */}
            {!selectedPartId && (
              <div className="mb-4 rounded-lg bg-brand-50 border border-brand-200 p-3 text-center">
                <p className="text-sm text-brand-700">
                  <span className="font-semibold">Getting started:</span> Select a part from the sidebar, then pick a color from the palette.
                </p>
              </div>
            )}

            {/* Matrix - Hero element */}
            <TileMatrix
              svg={currentSvg}
              parts={parts}
              rotation={rotation}
              showBorder={!!selectedBorder}
              borderData={borderData}
              tileWidth={mosaic.width}
              tileHeight={mosaic.height}
              pattern={isRectangular ? selectedPattern : undefined}
              shape={mosaic.shape}
            />
          </div>
        </main>

        {/* Right Sidebar - Info Panel (Reference, Collapsible) */}
        <InfoPanel 
          mosaic={mosaic} 
          partsCount={parts.length} 
          selectedBorder={selectedBorder}
          coloredBorderSvgs={borderData ? {
            cornerSvg: borderData.cornerSvg,
            sideSvg1: borderData.sideSvg1,
            sideSvg2: borderData.sideSvg2,
          } : null}
        />
      </div>

      {/* Quote Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        mosaic={mosaic}
        currentSvg={currentSvg}
        parts={parts}
        border={selectedBorder}
      />
    </div>
  );
}
