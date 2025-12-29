import { useState, useEffect } from "react";
import { supabase, type Tables } from "@/lib/supabase";

export type Mosaic = Tables<"mosaics">;

interface UseMosaicsResult {
  mosaics: Mosaic[];
  loading: boolean;
  error: string | null;
}

export function useMosaics(category: string | null): UseMosaicsResult {
  const [mosaics, setMosaics] = useState<Mosaic[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Reset state when category changes
    if (!category) {
      setMosaics([]);
      setError(null);
      return;
    }

    const fetchMosaics = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data, error: fetchError } = await supabase
          .from("mosaics")
          .select("*")
          .eq("category", category)
          .eq("is_active", true)
          .order("display_order", { ascending: true });

        if (fetchError) {
          throw new Error(fetchError.message);
        }

        setMosaics(data ?? []);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to fetch mosaics";
        setError(message);
        setMosaics([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMosaics();
  }, [category]);

  return { mosaics, loading, error };
}

