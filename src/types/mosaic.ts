import type { CategoryName } from "@/data/categories";

export type MosaicType = "mosaic" | "border";
export type MosaicShape = "square" | "hexagon" | "rectangle" | "g1";

// Rectangle pattern types for laying tiles
export type RectanglePattern = "brick" | "stack-bond" | "herringbone";

// Position of a tile within a pattern layout
export interface TilePosition {
  row: number;
  col: number;
  rotation: number;
  offsetX: number; // percentage offset horizontal (0-100)
  offsetY: number; // percentage offset vertical (0-100)
  span?: number;   // for patterns that need tiles to span multiple columns
}

// Configuration for each pattern type
export interface PatternConfig {
  id: RectanglePattern;
  name: string;
  description: string;
  icon: string; // SVG path or icon name
}

export interface MosaicDefinition {
  name: string;
  type: MosaicType;
  shape: MosaicShape;
  collection: CategoryName;
  width: number;
  height: number;
  rotate: number[][];
  svg: string;
  description?: string;
  svgVersion?: string;
}

export interface PartColor {
  partId: string;
  colorHex: string;
}

export interface BorderState {
  name: string;
  svg: string;
  parts: PartColor[];
}

export interface MosaicState {
  name: string;
  type: MosaicType;
  shape: MosaicShape;
  collection: CategoryName;
  xml: string;
  width: number;
  height: number;
  parts: PartColor[];
  border?: BorderState;
  updatedAt: Date;
}



