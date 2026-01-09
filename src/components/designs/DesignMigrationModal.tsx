import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Cloud, Check, Smartphone, ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { UnifiedDesign } from "@/hooks/useSavedDesignsUnified";

interface DesignMigrationModalProps {
  isOpen: boolean;
  localDesigns: UnifiedDesign[];
  onMigrate: (designIds: string[]) => Promise<void>;
  onSkip: () => void;
  onClose: () => void;
}

export function DesignMigrationModal({
  isOpen,
  localDesigns,
  onMigrate,
  onSkip,
  onClose,
}: DesignMigrationModalProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(
    new Set(localDesigns.map((d) => d.id))
  );
  const [isMigrating, setIsMigrating] = useState(false);
  const [migratedCount, setMigratedCount] = useState(0);

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const selectAll = () => {
    setSelectedIds(new Set(localDesigns.map((d) => d.id)));
  };

  const selectNone = () => {
    setSelectedIds(new Set());
  };

  const handleMigrate = async () => {
    if (selectedIds.size === 0) {
      onSkip();
      return;
    }

    setIsMigrating(true);
    setMigratedCount(0);

    try {
      await onMigrate(Array.from(selectedIds));
      setMigratedCount(selectedIds.size);
      
      // Close after a brief success state
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error) {
      console.error("Migration failed:", error);
      setIsMigrating(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={(e) => e.target === e.currentTarget && !isMigrating && onClose()}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="relative px-6 pt-6 pb-4 bg-gradient-to-br from-brand-50 to-blue-50">
            <button
              type="button"
              onClick={onClose}
              disabled={isMigrating}
              className="absolute top-4 right-4 p-2 rounded-full text-surface-400 hover:text-surface-600 hover:bg-white/50 transition-colors disabled:opacity-50"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-100">
                <Cloud className="h-6 w-6 text-brand-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-surface-900">
                  Welcome back!
                </h2>
                <p className="text-sm text-surface-600">
                  We found saved designs
                </p>
              </div>
            </div>

            <p className="text-sm text-surface-700 leading-relaxed">
              You have <strong>{localDesigns.length} design{localDesigns.length !== 1 ? "s" : ""}</strong> saved in this browser.
              Would you like to upload them to your account to access from any device?
            </p>
          </div>

          {/* Design Selection */}
          <div className="px-6 py-4">
            {/* Selection controls */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-surface-600">
                {selectedIds.size} of {localDesigns.length} selected
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={selectAll}
                  disabled={isMigrating}
                  className="text-xs text-brand-600 hover:text-brand-700 font-medium disabled:opacity-50"
                >
                  All
                </button>
                <span className="text-surface-300">|</span>
                <button
                  type="button"
                  onClick={selectNone}
                  disabled={isMigrating}
                  className="text-xs text-surface-500 hover:text-surface-700 font-medium disabled:opacity-50"
                >
                  None
                </button>
              </div>
            </div>

            {/* Design grid */}
            <div className="grid grid-cols-3 gap-3 max-h-48 overflow-y-auto p-1">
              {localDesigns.map((design) => {
                const isSelected = selectedIds.has(design.id);
                const enhancedSvg = design.svg.replace(
                  "<svg",
                  '<svg preserveAspectRatio="xMidYMid meet"'
                );

                return (
                  <button
                    key={design.id}
                    type="button"
                    onClick={() => toggleSelection(design.id)}
                    disabled={isMigrating}
                    className={cn(
                      "relative aspect-square rounded-xl border-2 p-2 transition-all",
                      "focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2",
                      "disabled:opacity-50 disabled:cursor-not-allowed",
                      isSelected
                        ? "border-brand-500 bg-brand-50"
                        : "border-surface-200 bg-white hover:border-surface-300"
                    )}
                  >
                    {/* SVG Preview */}
                    <div
                      className="h-full w-full [&>svg]:w-full [&>svg]:h-full"
                      dangerouslySetInnerHTML={{ __html: enhancedSvg }}
                    />

                    {/* Selection indicator */}
                    <div
                      className={cn(
                        "absolute top-1 right-1 h-5 w-5 rounded-full flex items-center justify-center transition-all",
                        isSelected
                          ? "bg-brand-500 text-white"
                          : "bg-surface-100 text-surface-400"
                      )}
                    >
                      <Check className="h-3 w-3" />
                    </div>

                    {/* Local indicator */}
                    <div className="absolute bottom-1 left-1">
                      <Smartphone className="h-3 w-3 text-surface-400" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Benefits reminder */}
          <div className="px-6 py-3 bg-surface-50 border-t border-surface-100">
            <div className="flex items-start gap-2 text-xs text-surface-600">
              <Cloud className="h-4 w-4 text-brand-500 flex-shrink-0 mt-0.5" />
              <span>
                Cloud designs are available on any device and never get lost.
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="px-6 py-4 bg-white border-t border-surface-100 flex gap-3">
            <button
              type="button"
              onClick={onSkip}
              disabled={isMigrating}
              className={cn(
                "flex-1 px-4 py-2.5 text-sm font-medium rounded-xl transition-colors",
                "text-surface-600 bg-surface-100 hover:bg-surface-200",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              Maybe later
            </button>
            <button
              type="button"
              onClick={handleMigrate}
              disabled={isMigrating || selectedIds.size === 0}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl transition-all",
                "text-white bg-brand-600 hover:bg-brand-700",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              {isMigrating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Uploading...</span>
                </>
              ) : migratedCount > 0 ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>Done!</span>
                </>
              ) : (
                <>
                  <span>Upload {selectedIds.size > 0 ? `(${selectedIds.size})` : ""}</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
