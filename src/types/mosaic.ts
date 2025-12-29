import type { CategoryName } from "@/data/categories";

export type MosaicType = "mosaic" | "border";
export type MosaicShape = "square" | "hexagon" | "rectangle" | "g1";

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



