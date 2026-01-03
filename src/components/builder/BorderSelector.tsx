import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronUp, ChevronDown, Check, X } from "lucide-react";
import { useAllBorders } from "@/hooks/useBorders";
import type { BorderDefinition, BorderState } from "@/types/mosaic";
import { extractPartsFromSvg } from "@/hooks/useBorders";

interface BorderSelectorProps {
  selectedBorder: BorderState | null;
  onSelectBorder: (border: BorderState | null) => void;
}

// Initialize border state from a BorderDefinition
export function initializeBorderState(border: BorderDefinition): BorderState {
  return {
    definitionId: border.id,
    name: border.name,
    cornerSvg: border.cornerSvg,
    sideSvg1: border.sideSvg1,
    sideSvg2: border.sideSvg2,
    cornerParts: extractPartsFromSvg(border.cornerSvg),
    sideParts1: extractPartsFromSvg(border.sideSvg1),
    sideParts2: border.sideSvg2 ? extractPartsFromSvg(border.sideSvg2) : undefined,
  };
}

// Border preview component
function BorderPreview({
  border,
  isSelected,
  onSelect,
}: {
  border: BorderDefinition;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const hasAlternatingSides = !!border.sideSvg2;

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "relative w-full rounded-lg p-2 text-left transition-all duration-150",
        "border bg-white hover:bg-surface-50",
        isSelected
          ? "border-brand-500 ring-2 ring-brand-200"
          : "border-surface-200 hover:border-surface-300"
      )}
    >
      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-brand-500 flex items-center justify-center shadow-sm">
          <Check className="h-3 w-3 text-white" />
        </div>
      )}

      {/* Border Preview Grid - Always 3 columns */}
      <div className="grid grid-cols-3 gap-1.5">
        {/* Corner Preview */}
        <div className="flex flex-col items-center">
          <div
            className="aspect-square w-full rounded overflow-hidden bg-surface-50 border border-surface-200 [&>svg]:w-full [&>svg]:h-full"
            dangerouslySetInnerHTML={{ __html: border.cornerSvg }}
          />
          <span className="text-[8px] text-surface-400 mt-0.5 font-medium uppercase tracking-wide">
            Corner
          </span>
        </div>

        {/* Side 1 Preview */}
        <div className="flex flex-col items-center">
          <div
            className="aspect-square w-full rounded overflow-hidden bg-surface-50 border border-surface-200 [&>svg]:w-full [&>svg]:h-full"
            dangerouslySetInnerHTML={{ __html: border.sideSvg1 }}
          />
          <span className="text-[8px] text-surface-400 mt-0.5 font-medium uppercase tracking-wide">
            {hasAlternatingSides ? "Side 1" : "Side"}
          </span>
        </div>

        {/* Side 2 Preview or placeholder */}
        <div className="flex flex-col items-center">
          {hasAlternatingSides && border.sideSvg2 ? (
            <>
              <div
                className="aspect-square w-full rounded overflow-hidden bg-surface-50 border border-surface-200 [&>svg]:w-full [&>svg]:h-full"
                dangerouslySetInnerHTML={{ __html: border.sideSvg2 }}
              />
              <span className="text-[8px] text-surface-400 mt-0.5 font-medium uppercase tracking-wide">
                Side 2
              </span>
            </>
          ) : (
            <>
              <div className="aspect-square w-full rounded bg-surface-50 border border-dashed border-surface-200" />
              <span className="text-[8px] text-surface-300 mt-0.5">—</span>
            </>
          )}
        </div>
      </div>

      {/* Border Name */}
      <p className="mt-1.5 text-xs font-medium text-surface-700 truncate text-center">
        {border.name}
      </p>
    </button>
  );
}

// No border option
function NoBorderOption({
  isSelected,
  onSelect,
}: {
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "relative w-full rounded-lg p-2 text-left transition-all duration-150",
        "border bg-white hover:bg-surface-50",
        isSelected
          ? "border-brand-500 ring-2 ring-brand-200"
          : "border-surface-200 hover:border-surface-300"
      )}
    >
      {isSelected && (
        <div className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-brand-500 flex items-center justify-center shadow-sm">
          <Check className="h-3 w-3 text-white" />
        </div>
      )}

      <div className="aspect-[3/1] flex items-center justify-center bg-surface-50 rounded border border-dashed border-surface-300">
        <X className="h-4 w-4 text-surface-400" />
      </div>

      <p className="mt-1.5 text-xs font-medium text-surface-500 text-center">
        No border
      </p>
    </button>
  );
}

export function BorderSelector({
  selectedBorder,
  onSelectBorder,
}: BorderSelectorProps) {
  const [isExpanded, setIsExpanded] = useState(false); // Collapsed by default
  const { borders, loading, error } = useAllBorders();

  const handleSelectBorder = (border: BorderDefinition) => {
    if (selectedBorder?.definitionId === border.id) {
      // Deselect if already selected
      onSelectBorder(null);
    } else {
      // Initialize and select
      onSelectBorder(initializeBorderState(border));
    }
  };

  const handleSelectNoBorder = () => {
    onSelectBorder(null);
  };

  // Only show if there are borders available for this category
  if (!loading && borders.length === 0) {
    return null;
  }

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
            Border
          </span>
          {selectedBorder && (
            <span className="text-xs text-brand-600 font-medium truncate max-w-[120px]">
              → {selectedBorder.name}
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

      {/* Content - Collapsible */}
      <div
        className={cn(
          "transition-all duration-300 ease-in-out",
          isExpanded ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        )}
      >
        <div className="p-3 max-h-[280px] overflow-y-auto">
          {loading ? (
            <div className="space-y-2">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="h-20 rounded-lg bg-surface-200 animate-pulse"
                />
              ))}
            </div>
          ) : error ? (
            <p className="text-xs text-red-500 text-center py-2">{error}</p>
          ) : (
            <div className="space-y-2">
              {/* No border option */}
              <NoBorderOption
                isSelected={selectedBorder === null}
                onSelect={handleSelectNoBorder}
              />

              {/* Available borders */}
              {borders.map((border) => (
                <BorderPreview
                  key={border.id}
                  border={border}
                  isSelected={selectedBorder?.definitionId === border.id}
                  onSelect={() => handleSelectBorder(border)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
