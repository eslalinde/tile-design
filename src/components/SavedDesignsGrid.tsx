import { SavedDesignCard } from "./SavedDesignCard";
import type { UnifiedDesign } from "@/hooks/useSavedDesignsUnified";
import { Palette, ArrowRight, Cloud, Smartphone, Upload, LogIn } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface SavedDesignsGridProps {
  designs: UnifiedDesign[];
  localDesigns: UnifiedDesign[];
  cloudDesigns: UnifiedDesign[];
  onEditDesign: (design: UnifiedDesign) => void;
  onDeleteDesign: (id: string) => void;
  onUploadToCloud?: (id: string) => Promise<void>;
  onUploadAllToCloud?: () => Promise<void>;
  onSwitchToCategories: () => void;
  onLogin?: () => void;
  isLoading?: boolean;
  isAuthenticated?: boolean;
}

export function SavedDesignsGrid({
  designs,
  localDesigns,
  cloudDesigns,
  onEditDesign,
  onDeleteDesign,
  onUploadToCloud,
  onUploadAllToCloud,
  onSwitchToCategories,
  onLogin,
  isLoading,
  isAuthenticated = false,
}: SavedDesignsGridProps) {
  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600" />
      </div>
    );
  }

  // Empty state
  if (designs.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center justify-center py-16 px-4"
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-brand-50 mb-6">
          <Palette className="h-10 w-10 text-brand-400" />
        </div>
        
        <h3 className="text-xl font-semibold text-surface-900 mb-2">
          No saved designs yet
        </h3>
        
        <p className="text-surface-600 text-center max-w-md mb-6">
          Choose a category and customize your first mosaic. Your designs will be saved here automatically.
        </p>
        
        <button
          type="button"
          onClick={onSwitchToCategories}
          className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-brand-600 rounded-xl hover:bg-brand-700 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
        >
          <span>Start designing</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </motion.div>
    );
  }

  // Grid with designs - sectioned view for authenticated users
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Cloud designs section - only show if authenticated and has cloud designs */}
      {isAuthenticated && cloudDesigns.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Cloud className="h-5 w-5 text-green-600" />
            <h3 className="text-lg font-semibold text-surface-900">
              Saved to my account
            </h3>
            <span className="text-sm text-surface-500">({cloudDesigns.length})</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {cloudDesigns.map((design, index) => (
              <motion.div
                key={design.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <SavedDesignCard
                  design={design}
                  onEdit={onEditDesign}
                  onDelete={onDeleteDesign}
                  showSourceBadge={true}
                />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Local designs section */}
      {localDesigns.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Smartphone className="h-5 w-5 text-amber-600" />
            <h3 className="text-lg font-semibold text-surface-900">
                {isAuthenticated ? "Only on this device" : "My designs"}
            </h3>
              <span className="text-sm text-surface-500">({localDesigns.length})</span>
            </div>
            
            {/* Upload all button - only for authenticated users */}
            {isAuthenticated && onUploadAllToCloud && localDesigns.length > 1 && (
              <button
                type="button"
                onClick={onUploadAllToCloud}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors",
                  "text-brand-700 bg-brand-50 hover:bg-brand-100"
                )}
              >
                <Upload className="h-4 w-4" />
                <span>Upload all</span>
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {localDesigns.map((design, index) => (
              <motion.div
                key={design.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <SavedDesignCard
                  design={design}
                  onEdit={onEditDesign}
                  onDelete={onDeleteDesign}
                  onUploadToCloud={isAuthenticated ? onUploadToCloud : undefined}
                  showSourceBadge={isAuthenticated}
                />
              </motion.div>
            ))}
          </div>

          {/* Info banner for non-authenticated users */}
          {!isAuthenticated && onLogin && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="mt-6 p-4 rounded-xl bg-gradient-to-r from-brand-50 to-blue-50 border border-brand-100"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 flex-shrink-0">
                  <Cloud className="h-5 w-5 text-brand-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-surface-900 mb-1">
                    Did you know you can save your designs to the cloud?
                  </h4>
                  <p className="text-sm text-surface-600 mb-3">
                    Create a free account to access your designs from any device and never lose your work.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={onLogin}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                        "text-white bg-brand-600 hover:bg-brand-700"
                      )}
                    >
                      <LogIn className="h-4 w-4" />
                      <span>Create account</span>
                    </button>
                    <button
                      type="button"
                      onClick={onLogin}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                        "text-brand-700 bg-white hover:bg-brand-50 border border-brand-200"
                      )}
                    >
                      <span>Sign in</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Info text for authenticated users with local designs */}
          {isAuthenticated && (
            <p className="mt-4 text-sm text-surface-500 flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              <span>
                Local designs are only available in this browser. 
                Upload them to your account to access from any device.
              </span>
            </p>
          )}
        </section>
      )}

      {/* Summary */}
      <p className="text-center text-sm text-surface-500 pt-4 border-t border-surface-100">
        {designs.length} {designs.length === 1 ? "saved design" : "saved designs"}
        {isAuthenticated && cloudDesigns.length > 0 && localDesigns.length > 0 && (
          <span className="text-surface-400">
            {" "}• {cloudDesigns.length} in cloud, {localDesigns.length} local
          </span>
        )}
      </p>
    </motion.div>
  );
}
