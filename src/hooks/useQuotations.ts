import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import type { Tables } from "@/types/database";

export type Quotation = Tables<"quotations">;

export interface QuotationWithDetails extends Quotation {
  mosaicName: string;
  mosaicCategory: string;
  quantityMosaic: number;
  quantityBorder: number;
}

interface UseQuotationsResult {
  quotations: QuotationWithDetails[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

// Helper to parse mosaic snapshot
function parseMosaicSnapshot(snapshot: unknown): { name: string; category: string } {
  if (typeof snapshot === "object" && snapshot !== null) {
    const s = snapshot as Record<string, unknown>;
    return {
      name: typeof s.mosaicName === "string" ? s.mosaicName : "Unknown",
      category: typeof s.category === "string" ? s.category : "Unknown",
    };
  }
  return { name: "Unknown", category: "Unknown" };
}

// Helper to parse metadata
function parseMetadata(metadata: unknown): { quantityMosaic: number; quantityBorder: number } {
  if (typeof metadata === "object" && metadata !== null) {
    const m = metadata as Record<string, unknown>;
    return {
      quantityMosaic: typeof m.quantity_mosaic === "number" ? m.quantity_mosaic : 0,
      quantityBorder: typeof m.quantity_border === "number" ? m.quantity_border : 0,
    };
  }
  return { quantityMosaic: 0, quantityBorder: 0 };
}

export function useQuotations(): UseQuotationsResult {
  const { isAuthenticated, profile } = useAuth();
  const [quotations, setQuotations] = useState<QuotationWithDetails[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchQuotations = useCallback(async () => {
    if (!isAuthenticated || !profile?.id) {
      setQuotations([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from("quotations")
        .select("*")
        .eq("user_id", profile.id)
        .order("created_at", { ascending: false });

      if (fetchError) {
        throw new Error(fetchError.message);
      }

      // Transform data to include parsed details
      const quotationsWithDetails: QuotationWithDetails[] = (data || []).map((q) => {
        const { name, category } = parseMosaicSnapshot(q.mosaic_snapshot);
        const { quantityMosaic, quantityBorder } = parseMetadata(q.metadata);
        
        return {
          ...q,
          mosaicName: name,
          mosaicCategory: category,
          quantityMosaic,
          quantityBorder,
        };
      });

      setQuotations(quotationsWithDetails);
    } catch (err) {
      console.error("Failed to fetch quotations:", err);
      setError(err instanceof Error ? err : new Error("Failed to fetch quotations"));
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, profile?.id]);

  // Fetch quotations when auth state changes
  useEffect(() => {
    fetchQuotations();
  }, [fetchQuotations]);

  return {
    quotations,
    isLoading,
    error,
    refetch: fetchQuotations,
  };
}
