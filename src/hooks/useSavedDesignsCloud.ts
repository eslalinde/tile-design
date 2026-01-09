import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import type { PartColor, RectanglePattern, MosaicShape, BorderState } from "@/types/mosaic";
import type { CategoryName } from "@/data/categories";
import type { Tables, Json } from "@/types/database";

// State stored in the JSONB column
export interface CloudDesignState {
  mosaicId: string;
  mosaicName: string;
  category: CategoryName;
  shape: MosaicShape;
  width: number;
  height: number;
  parts: PartColor[];
  svg: string;
  pattern?: RectanglePattern;
  border?: BorderState;
}

// Full design with metadata from database
export interface CloudDesign {
  id: string;
  userId: string;
  mosaicId: string;
  mosaicName: string;
  category: CategoryName;
  shape: MosaicShape;
  width: number;
  height: number;
  parts: PartColor[];
  svg: string;
  pattern?: RectanglePattern;
  border?: BorderState;
  customName?: string;
  previewUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export type SaveCloudDesignInput = Omit<CloudDesign, "id" | "userId" | "createdAt" | "updatedAt">;

// Convert database row to CloudDesign
function rowToCloudDesign(row: Tables<"user_mosaics">): CloudDesign {
  const state = row.state as unknown as CloudDesignState;
  
  return {
    id: row.id,
    userId: row.user_id,
    mosaicId: state.mosaicId || row.mosaic_id,
    mosaicName: state.mosaicName || "",
    category: state.category || ("paris" as CategoryName),
    shape: state.shape || "square",
    width: state.width || 200,
    height: state.height || 200,
    parts: state.parts || [],
    svg: state.svg || "",
    pattern: state.pattern,
    border: state.border,
    customName: row.name || undefined,
    previewUrl: row.preview_url || undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

// Convert CloudDesign to database insert format
function designToInsert(
  design: SaveCloudDesignInput,
  userId: string
): {
  user_id: string;
  mosaic_id: string;
  name: string | null;
  state: Json;
  preview_url: string | null;
} {
  const state: CloudDesignState = {
    mosaicId: design.mosaicId,
    mosaicName: design.mosaicName,
    category: design.category,
    shape: design.shape,
    width: design.width,
    height: design.height,
    parts: design.parts,
    svg: design.svg,
    pattern: design.pattern,
    border: design.border,
  };

  return {
    user_id: userId,
    mosaic_id: design.mosaicId,
    name: design.customName || null,
    state: state as unknown as Json,
    preview_url: design.previewUrl || null,
  };
}

interface UseSavedDesignsCloudResult {
  designs: CloudDesign[];
  isLoading: boolean;
  error: Error | null;
  
  // Actions
  saveDesign: (design: SaveCloudDesignInput) => Promise<CloudDesign | null>;
  updateDesign: (id: string, updates: Partial<SaveCloudDesignInput>) => Promise<CloudDesign | null>;
  deleteDesign: (id: string) => Promise<boolean>;
  getDesignById: (id: string) => CloudDesign | undefined;
  refresh: () => Promise<void>;
}

export function useSavedDesignsCloud(userId: string | null): UseSavedDesignsCloudResult {
  const [designs, setDesigns] = useState<CloudDesign[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Fetch designs from database
  const fetchDesigns = useCallback(async () => {
    if (!userId) {
      setDesigns([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from("user_mosaics")
        .select("*")
        .eq("user_id", userId)
        .order("updated_at", { ascending: false });

      if (fetchError) {
        throw new Error(fetchError.message);
      }

      const cloudDesigns = (data || []).map(rowToCloudDesign);
      setDesigns(cloudDesigns);
    } catch (err) {
      console.error("Failed to fetch cloud designs:", err);
      setError(err instanceof Error ? err : new Error("Failed to fetch designs"));
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  // Load designs on mount and when userId changes
  useEffect(() => {
    fetchDesigns();
  }, [fetchDesigns]);

  // Save a new design
  const saveDesign = useCallback(
    async (design: SaveCloudDesignInput): Promise<CloudDesign | null> => {
      if (!userId) {
        console.error("Cannot save design: no user ID");
        return null;
      }

      try {
        const insertData = designToInsert(design, userId);
        
        const { data, error: insertError } = await supabase
          .from("user_mosaics")
          .insert(insertData)
          .select()
          .single();

        if (insertError) {
          throw new Error(insertError.message);
        }

        const newDesign = rowToCloudDesign(data);
        setDesigns((prev) => [newDesign, ...prev]);
        
        return newDesign;
      } catch (err) {
        console.error("Failed to save cloud design:", err);
        setError(err instanceof Error ? err : new Error("Failed to save design"));
        return null;
      }
    },
    [userId]
  );

  // Update an existing design
  const updateDesign = useCallback(
    async (id: string, updates: Partial<SaveCloudDesignInput>): Promise<CloudDesign | null> => {
      if (!userId) {
        console.error("Cannot update design: no user ID");
        return null;
      }

      try {
        // Get current design to merge state
        const currentDesign = designs.find((d) => d.id === id);
        if (!currentDesign) {
          throw new Error("Design not found");
        }

        // Merge the current state with updates
        const mergedDesign: SaveCloudDesignInput = {
          mosaicId: updates.mosaicId ?? currentDesign.mosaicId,
          mosaicName: updates.mosaicName ?? currentDesign.mosaicName,
          category: updates.category ?? currentDesign.category,
          shape: updates.shape ?? currentDesign.shape,
          width: updates.width ?? currentDesign.width,
          height: updates.height ?? currentDesign.height,
          parts: updates.parts ?? currentDesign.parts,
          svg: updates.svg ?? currentDesign.svg,
          pattern: updates.pattern ?? currentDesign.pattern,
          border: updates.border ?? currentDesign.border,
          customName: updates.customName ?? currentDesign.customName,
          previewUrl: updates.previewUrl ?? currentDesign.previewUrl,
        };

        const state: CloudDesignState = {
          mosaicId: mergedDesign.mosaicId,
          mosaicName: mergedDesign.mosaicName,
          category: mergedDesign.category,
          shape: mergedDesign.shape,
          width: mergedDesign.width,
          height: mergedDesign.height,
          parts: mergedDesign.parts,
          svg: mergedDesign.svg,
          pattern: mergedDesign.pattern,
          border: mergedDesign.border,
        };

        const { data, error: updateError } = await supabase
          .from("user_mosaics")
          .update({
            name: mergedDesign.customName || null,
            state: state as unknown as Json,
            preview_url: mergedDesign.previewUrl || null,
          })
          .eq("id", id)
          .eq("user_id", userId)
          .select()
          .single();

        if (updateError) {
          throw new Error(updateError.message);
        }

        const updatedDesign = rowToCloudDesign(data);
        setDesigns((prev) => {
          const index = prev.findIndex((d) => d.id === id);
          if (index === -1) return prev;
          
          const updated = [...prev];
          updated[index] = updatedDesign;
          // Re-sort by updatedAt
          updated.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
          return updated;
        });

        return updatedDesign;
      } catch (err) {
        console.error("Failed to update cloud design:", err);
        setError(err instanceof Error ? err : new Error("Failed to update design"));
        return null;
      }
    },
    [userId, designs]
  );

  // Delete a design
  const deleteDesign = useCallback(
    async (id: string): Promise<boolean> => {
      if (!userId) {
        console.error("Cannot delete design: no user ID");
        return false;
      }

      try {
        const { error: deleteError } = await supabase
          .from("user_mosaics")
          .delete()
          .eq("id", id)
          .eq("user_id", userId);

        if (deleteError) {
          throw new Error(deleteError.message);
        }

        setDesigns((prev) => prev.filter((d) => d.id !== id));
        return true;
      } catch (err) {
        console.error("Failed to delete cloud design:", err);
        setError(err instanceof Error ? err : new Error("Failed to delete design"));
        return false;
      }
    },
    [userId]
  );

  // Get design by ID
  const getDesignById = useCallback(
    (id: string): CloudDesign | undefined => {
      return designs.find((d) => d.id === id);
    },
    [designs]
  );

  return {
    designs,
    isLoading,
    error,
    saveDesign,
    updateDesign,
    deleteDesign,
    getDesignById,
    refresh: fetchDesigns,
  };
}
