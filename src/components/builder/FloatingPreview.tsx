import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Move, X, Minimize2, Maximize2 } from "lucide-react";

interface FloatingPreviewProps {
  svg: string;
  mosaicName: string;
  selectedPartId: string | null;
}

export function FloatingPreview({
  svg,
  mosaicName,
  selectedPartId,
}: FloatingPreviewProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{ startX: number; startY: number; startPosX: number; startPosY: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);

  // Initialize position on mount - top left of matrix section
  useEffect(() => {
    if (position === null) {
      // Find the sidebar width and action bar height to calculate matrix position
      const sidebar = document.querySelector('aside');
      const actionBar = document.querySelector('[class*="sticky"]');
      
      const sidebarWidth = sidebar?.getBoundingClientRect().width || 288;
      const actionBarHeight = actionBar?.getBoundingClientRect().height || 60;
      
      // Position with some padding from the top-left of matrix area
      setPosition({
        x: sidebarWidth + 24, // sidebar width + padding
        y: actionBarHeight + 24, // action bar height + padding
      });
    }
  }, [position]);

  // Handle drag
  const handleMouseDown = (e: React.MouseEvent) => {
    // Don't start drag if clicking on a button
    if ((e.target as HTMLElement).closest('button')) return;
    if (!position) return;
    
    e.preventDefault(); // Prevent text selection
    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startPosX: position.x,
      startPosY: position.y,
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !dragRef.current) return;

      const deltaX = e.clientX - dragRef.current.startX;
      const deltaY = e.clientY - dragRef.current.startY;

      setPosition({
        x: dragRef.current.startPosX + deltaX,
        y: dragRef.current.startPosY + deltaY,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      dragRef.current = null;
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-24 right-4 z-30 flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-medium text-surface-700 shadow-elevated border border-surface-200 hover:bg-surface-50 transition-colors"
      >
        <Maximize2 className="h-4 w-4" />
        Show Preview
      </button>
    );
  }

  // Don't render until position is calculated
  if (!position) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "fixed z-30",
        isMinimized ? "w-32" : "w-40 sm:w-48"
      )}
      style={{
        left: position.x,
        top: position.y,
        userSelect: isDragging ? 'none' : 'auto',
      }}
    >
      <div
        className={cn(
          "rounded-xl bg-white shadow-elevated border-2 overflow-hidden",
          selectedPartId ? "border-brand-300" : "border-surface-200"
        )}
      >
        {/* Header - Draggable */}
        <div
          className={cn(
            "flex items-center justify-between gap-2 bg-surface-100 px-2 py-1.5 border-b border-surface-200",
            "select-none",
            isDragging ? "cursor-grabbing" : "cursor-grab"
          )}
          onMouseDown={handleMouseDown}
        >
          <div className="flex items-center gap-1.5 min-w-0 pointer-events-none">
            <Move className="h-3 w-3 text-surface-400 flex-shrink-0" />
            <span className="text-xs font-medium text-surface-600 truncate">
              {mosaicName}
            </span>
          </div>
          <div className="flex items-center gap-1 pointer-events-auto">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMinimized(!isMinimized);
              }}
              className="p-1 rounded hover:bg-surface-200 text-surface-500 hover:text-surface-700 transition-colors"
              title={isMinimized ? "Expand" : "Minimize"}
            >
              {isMinimized ? (
                <Maximize2 className="h-3 w-3" />
              ) : (
                <Minimize2 className="h-3 w-3" />
              )}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsVisible(false);
              }}
              className="p-1 rounded hover:bg-red-100 text-surface-500 hover:text-red-600 transition-colors"
              title="Hide preview"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* SVG Preview */}
        {!isMinimized && (
          <div className="p-3 bg-white">
            <div
              className="aspect-square w-full"
              dangerouslySetInnerHTML={{ __html: svg }}
            />
            {selectedPartId && (
              <div className="mt-2 text-center">
                <span className="text-xs text-brand-600 font-medium">
                  Editing: {selectedPartId}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
