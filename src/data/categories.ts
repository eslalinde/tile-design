export interface Category {
  name: string;
  display: string;
}

export const categories: Category[] = [
  { name: "paris", display: "Paris" },
  { name: "barcelona", display: "Barcelona" },
  { name: "morocco", display: "Morocco" },
  { name: "square", display: "Square" },
  { name: "rectangle", display: "Rectangle" },
  { name: "hexagonal", display: "Hexagonal" },
  { name: "g1", display: "G1" },
];

export type CategoryName = (typeof categories)[number]["name"];



