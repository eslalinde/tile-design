import { useState } from "react";
import { cn } from "@/lib/utils";
import type { UnifiedDesign, DesignSource } from "@/hooks/useSavedDesignsUnified";
import { Pencil, Trash2, X, Check, Cloud, Smartphone, Upload, Loader2 } from "lucide-react";

interface SavedDesignCardProps {
  design: UnifiedDesign;
  onEdit: (design: UnifiedDesign) => void;
  onDelete: (id: string) => void;
  onUploadToCloud?: (id: string) => Promise<void>;
  showSourceBadge?: boolean;
}

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMinutes < 1) return "just now";
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  
  return date.toLocaleDateString("en", { day: "numeric", month: "short" });
}

export function SavedDesignCard({ 
  design, 
  onEdit, 
  onDelete,
  onUploadToCloud,
  showSourceBadge = true,
}: SavedDesignCardProps) {
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Calculate aspect ratio from width and height
  const aspectRatio = design.width && design.height 
    ? design.width / design.height
    : 1;

  // Ensure SVG has preserveAspectRatio attribute
  const enhancedSvg = design.svg.replace(
    '<svg',
    '<svg preserveAspectRatio="xMidYMid meet"'
  );

  const displayName = design.customName || design.mosaicName;

  const handleDeleteClick = () => {
    setIsConfirmingDelete(true);
  };

  const handleConfirmDelete = () => {
    onDelete(design.id);
    setIsConfirmingDelete(false);
  };

  const handleCancelDelete = () => {
    setIsConfirmingDelete(false);
  };

  const handleUploadToCloud = async () => {
    if (!onUploadToCloud || design.source !== "local") return;
    
    setIsUploading(true);
    try {
      await onUploadToCloud(design.id);
    } finally {
      setIsUploading(false);
    }
  };

  const isLocal = design.source === "local";
  const isCloud = design.source === "cloud";
  const isSyncing = design.isSyncing || isUploading;

  return (
    <div
      className={cn(
        "group relative flex flex-col rounded-xl border-2 bg-white transition-all duration-200",
        "hover:shadow-card hover:border-brand-300",
        isConfirmingDelete ? "border-red-300" : "border-surface-200"
      )}
    >
      {/* SVG Preview Container */}
      <button
        type="button"
        onClick={() => onEdit(design)}
        className="relative w-full p-3 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-inset rounded-t-xl"
        style={{ aspectRatio }}
      >
        <div
          className="h-full w-full [&>svg]:w-full [&>svg]:h-full"
          dangerouslySetInnerHTML={{ __html: enhancedSvg }}
        />
      </button>

      {/* Card Footer */}
      <div className="flex flex-col gap-2 p-3 pt-0 border-t border-surface-100">
        {/* Name and date */}
        <div className="min-w-0">
          <h3 className="text-sm font-medium text-surface-900 truncate" title={displayName}>
            {displayName}
          </h3>
          <p className="text-xs text-surface-500">
            {formatRelativeTime(design.updatedAt)}
          </p>
        </div>

        {/* Action buttons */}
        {isConfirmingDelete ? (
          <div className="flex items-center justify-between gap-2 pt-1">
            <span className="text-xs text-red-600 font-medium">
              Delete?
            </span>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={handleCancelDelete}
                className={cn(
                  "flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md transition-colors",
                  "text-surface-600 bg-surface-100 hover:bg-surface-200"
                )}
              >
                <X className="h-3 w-3" />
                <span>No</span>
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className={cn(
                  "flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md transition-colors",
                  "text-white bg-red-500 hover:bg-red-600"
                )}
              >
                <Check className="h-3 w-3" />
                <span>Yes</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => onEdit(design)}
              className={cn(
                "flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors",
                "text-brand-700 bg-brand-50 hover:bg-brand-100"
              )}
            >
              <Pencil className="h-3 w-3" />
              <span>Edit</span>
            </button>
            <button
              type="button"
              onClick={handleDeleteClick}
              className={cn(
                "flex items-center justify-center p-1.5 rounded-lg transition-colors",
                "text-surface-400 hover:text-red-500 hover:bg-red-50"
              )}
              title="Delete design"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {/* Category badge */}
      <div className="absolute top-2 right-2">
        <span className="px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider rounded-full bg-surface-900/70 text-white">
          {design.category}
        </span>
      </div>

      {/* Source badge (local/cloud) */}
      {showSourceBadge && (
        <div className="absolute top-2 left-2">
          {isSyncing ? (
            <span className="flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-full bg-blue-100 text-blue-700">
              <Loader2 className="h-3 w-3 animate-spin" />
              <span>Sync</span>
            </span>
          ) : isCloud ? (
            <span 
              className="flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-full bg-green-100 text-green-700"
              title="Saved to cloud"
            >
              <Cloud className="h-3 w-3" />
              <span>Cloud</span>
            </span>
          ) : (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleUploadToCloud();
              }}
              disabled={!onUploadToCloud || isUploading}
              className={cn(
                "flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-full transition-colors",
                onUploadToCloud 
                  ? "bg-amber-100 text-amber-700 hover:bg-amber-200 cursor-pointer"
                  : "bg-surface-100 text-surface-500"
              )}
              title={onUploadToCloud ? "Upload to cloud" : "Only on this device"}
            >
              {onUploadToCloud ? (
                <>
                  <Upload className="h-3 w-3" />
                  <span>Upload</span>
                </>
              ) : (
                <>
                  <Smartphone className="h-3 w-3" />
                  <span>Local</span>
                </>
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
