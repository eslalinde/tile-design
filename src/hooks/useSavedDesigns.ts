import { useState, useEffect, useCallback } from "react";
import type { PartColor, RectanglePattern, MosaicShape, BorderState } from "@/types/mosaic";
import type { CategoryName } from "@/data/categories";

const STORAGE_KEY = "mosaic-saved-designs";

export interface SavedDesign {
  id: string;
  mosaicId: string;
  mosaicName: string;
  category: CategoryName;
  shape: MosaicShape;
  width: number;
  height: number;
  parts: PartColor[];
  svg: string;
  pattern?: RectanglePattern;
  border?: BorderState; // Border state including SVGs and colors
  createdAt: string;
  updatedAt: string;
  customName?: string;
}

export type SaveDesignInput = Omit<SavedDesign, "id" | "createdAt" | "updatedAt">;

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

function getStoredDesigns(): SavedDesign[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored) as SavedDesign[];
  } catch {
    console.error("Failed to parse saved designs from localStorage");
    return [];
  }
}

function setStoredDesigns(designs: SavedDesign[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(designs));
  } catch (error) {
    console.error("Failed to save designs to localStorage:", error);
  }
}

interface UseSavedDesignsResult {
  designs: SavedDesign[];
  saveDesign: (design: SaveDesignInput) => SavedDesign;
  updateDesign: (id: string, updates: Partial<SaveDesignInput>) => SavedDesign | null;
  deleteDesign: (id: string) => boolean;
  getDesignById: (id: string) => SavedDesign | undefined;
  isLoading: boolean;
}

export function useSavedDesigns(): UseSavedDesignsResult {
  const [designs, setDesigns] = useState<SavedDesign[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load designs from localStorage on mount
  useEffect(() => {
    const stored = getStoredDesigns();
    // Sort by updatedAt descending (most recent first)
    stored.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    setDesigns(stored);
    setIsLoading(false);
  }, []);

  // Save a new design
  const saveDesign = useCallback((input: SaveDesignInput): SavedDesign => {
    const now = new Date().toISOString();
    const newDesign: SavedDesign = {
      ...input,
      id: generateId(),
      createdAt: now,
      updatedAt: now,
    };

    setDesigns((prev) => {
      const updated = [newDesign, ...prev];
      setStoredDesigns(updated);
      return updated;
    });

    return newDesign;
  }, []);

  // Update an existing design
  const updateDesign = useCallback(
    (id: string, updates: Partial<SaveDesignInput>): SavedDesign | null => {
      let updatedDesign: SavedDesign | null = null;

      setDesigns((prev) => {
        const index = prev.findIndex((d) => d.id === id);
        if (index === -1) return prev;

        const existing = prev[index];
        updatedDesign = {
          ...existing,
          ...updates,
          updatedAt: new Date().toISOString(),
        };

        const updated = [...prev];
        updated[index] = updatedDesign;
        // Re-sort by updatedAt
        updated.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
        setStoredDesigns(updated);
        return updated;
      });

      return updatedDesign;
    },
    []
  );

  // Delete a design
  const deleteDesign = useCallback((id: string): boolean => {
    let deleted = false;

    setDesigns((prev) => {
      const index = prev.findIndex((d) => d.id === id);
      if (index === -1) return prev;

      deleted = true;
      const updated = prev.filter((d) => d.id !== id);
      setStoredDesigns(updated);
      return updated;
    });

    return deleted;
  }, []);

  // Get a design by ID
  const getDesignById = useCallback(
    (id: string): SavedDesign | undefined => {
      return designs.find((d) => d.id === id);
    },
    [designs]
  );

  return {
    designs,
    saveDesign,
    updateDesign,
    deleteDesign,
    getDesignById,
    isLoading,
  };
}
