import { cn } from "@/lib/utils";
import type { Mosaic } from "@/hooks/useMosaics";

interface MosaicCardProps {
  mosaic: Mosaic;
  onClick?: (mosaic: Mosaic) => void;
  isSelected?: boolean;
}

export function MosaicCard({ mosaic, onClick, isSelected }: MosaicCardProps) {
  return (
    <button
      type="button"
      onClick={() => onClick?.(mosaic)}
      className={cn(
        "group relative aspect-square w-full overflow-hidden rounded-xl border-2 bg-white p-2 transition-all duration-200",
        "hover:shadow-card hover:border-brand-300",
        "focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2",
        isSelected
          ? "border-brand-500 shadow-card ring-2 ring-brand-500 ring-offset-2"
          : "border-surface-200"
      )}
    >
      {/* SVG Container */}
      <div
        className="h-full w-full"
        dangerouslySetInnerHTML={{ __html: mosaic.svg }}
      />

      {/* Hover overlay with name */}
      <div
        className={cn(
          "absolute inset-0 flex items-end justify-center bg-gradient-to-t from-surface-900/80 via-surface-900/20 to-transparent p-3",
          "opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        )}
      >
        <span className="text-sm font-medium text-white">{mosaic.name}</span>
      </div>
    </button>
  );
}

