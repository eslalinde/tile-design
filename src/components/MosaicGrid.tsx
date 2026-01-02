import { motion } from "motion/react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { useMosaics, type Mosaic } from "@/hooks/useMosaics";
import { MosaicCard } from "./MosaicCard";

interface MosaicGridProps {
  category: string;
  onSelectMosaic?: (mosaic: Mosaic) => void;
  selectedMosaicId?: string;
}

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="aspect-square animate-pulse rounded-xl bg-surface-100"
          style={{ animationDelay: `${i * 100}ms` }}
        />
      ))}
    </div>
  );
}

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="rounded-full bg-red-100 p-4">
        <AlertCircle className="h-8 w-8 text-red-500" />
      </div>
      <h3 className="mt-4 font-display text-lg font-semibold text-surface-900">
        Failed to load mosaics
      </h3>
      <p className="mt-2 max-w-md text-sm text-surface-600">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-700"
        >
          <RefreshCw className="h-4 w-4" />
          Try again
        </button>
      )}
    </div>
  );
}

function EmptyState({ category }: { category: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <p className="text-surface-600">
        No mosaics found in the{" "}
        <span className="font-medium capitalize">{category}</span> collection.
      </p>
    </div>
  );
}

export function MosaicGrid({
  category,
  onSelectMosaic,
  selectedMosaicId,
}: MosaicGridProps) {
  const { mosaics, loading, error } = useMosaics(category);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <ErrorState
        message={error}
        onRetry={() => window.location.reload()}
      />
    );
  }

  if (mosaics.length === 0) {
    return <EmptyState category={category} />;
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 items-start">
      {mosaics.map((mosaic, index) => (
        <motion.div
          key={mosaic.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            delay: index * 0.05,
            ease: "easeOut",
          }}
        >
          <MosaicCard
            mosaic={mosaic}
            onClick={onSelectMosaic}
            isSelected={selectedMosaicId === mosaic.id}
          />
        </motion.div>
      ))}
    </div>
  );
}

