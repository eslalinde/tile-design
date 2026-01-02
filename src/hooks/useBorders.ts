import { useState, useEffect, useCallback } from "react";
import { supabase, type Tables } from "@/lib/supabase";
import type { BorderDefinition, PartColor } from "@/types/mosaic";
import type { CategoryName } from "@/data/categories";

export type BorderDefinitionRow = Tables<"border_definitions">;

// Transform database row to BorderDefinition type
function transformBorderDefinition(row: BorderDefinitionRow): BorderDefinition {
  return {
    id: row.id,
    name: row.name,
    category: row.category as CategoryName,
    cornerSvg: row.corner_svg,
    sideSvg1: row.side_svg_1,
    sideSvg2: row.side_svg_2 ?? undefined,
    defaultColors: row.default_colors as Record<string, string> | undefined,
    description: row.description ?? undefined,
    displayOrder: row.display_order,
  };
}

// Extract parts from an SVG string
export function extractPartsFromSvg(svg: string): PartColor[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svg, "image/svg+xml");
  const groups = doc.querySelectorAll("g[id^='part']");

  const parts: PartColor[] = [];

  groups.forEach((g) => {
    const id = g.getAttribute("id");
    if (!id) return;

    const firstShape = g.querySelector("path, rect, circle, polygon, ellipse");
    const fill = firstShape?.getAttribute("fill") || "#CCCCCC";

    parts.push({
      partId: id,
      colorHex: fill.toUpperCase(),
    });
  });

  return parts;
}

interface UseBordersResult {
  borders: BorderDefinition[];
  loading: boolean;
  error: string | null;
  getBorderById: (id: string) => BorderDefinition | undefined;
}

export function useBorders(category: string | null): UseBordersResult {
  const [borders, setBorders] = useState<BorderDefinition[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Reset state when category changes
    if (!category) {
      setBorders([]);
      setError(null);
      return;
    }

    const fetchBorders = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data, error: fetchError } = await supabase
          .from("border_definitions")
          .select("*")
          .eq("category", category)
          .eq("is_active", true)
          .order("display_order", { ascending: true });

        if (fetchError) {
          throw new Error(fetchError.message);
        }

        const transformedBorders = (data ?? []).map(transformBorderDefinition);
        setBorders(transformedBorders);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to fetch borders";
        setError(message);
        setBorders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBorders();
  }, [category]);

  const getBorderById = useCallback(
    (id: string): BorderDefinition | undefined => {
      return borders.find((b) => b.id === id);
    },
    [borders]
  );

  return { borders, loading, error, getBorderById };
}

// Hook to load all borders across all categories (for general use)
export function useAllBorders(): UseBordersResult {
  const [borders, setBorders] = useState<BorderDefinition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllBorders = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data, error: fetchError } = await supabase
          .from("border_definitions")
          .select("*")
          .eq("is_active", true)
          .order("category", { ascending: true })
          .order("display_order", { ascending: true });

        if (fetchError) {
          throw new Error(fetchError.message);
        }

        const transformedBorders = (data ?? []).map(transformBorderDefinition);
        setBorders(transformedBorders);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to fetch borders";
        setError(message);
        setBorders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllBorders();
  }, []);

  const getBorderById = useCallback(
    (id: string): BorderDefinition | undefined => {
      return borders.find((b) => b.id === id);
    },
    [borders]
  );

  return { borders, loading, error, getBorderById };
}
