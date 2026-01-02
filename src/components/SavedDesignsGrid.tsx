import { SavedDesignCard } from "./SavedDesignCard";
import type { SavedDesign } from "@/hooks/useSavedDesigns";
import { Palette, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

interface SavedDesignsGridProps {
  designs: SavedDesign[];
  onEditDesign: (design: SavedDesign) => void;
  onDeleteDesign: (id: string) => void;
  onSwitchToCategories: () => void;
  isLoading?: boolean;
}

export function SavedDesignsGrid({
  designs,
  onEditDesign,
  onDeleteDesign,
  onSwitchToCategories,
  isLoading,
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

  // Grid with designs
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {designs.map((design, index) => (
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
            />
          </motion.div>
        ))}
      </div>
      
      {/* Helper text */}
      <p className="mt-6 text-center text-sm text-surface-500">
        {designs.length} {designs.length === 1 ? "saved design" : "saved designs"}
      </p>
    </motion.div>
  );
}
