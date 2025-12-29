import { cn } from "@/lib/utils";
import { categories, type CategoryName } from "@/data/categories";
import { motion } from "motion/react";

interface CategoryNavProps {
  selectedCategory: CategoryName | null;
  onSelectCategory: (category: CategoryName) => void;
}

export function CategoryNav({ selectedCategory, onSelectCategory }: CategoryNavProps) {
  return (
    <nav className="w-full overflow-x-auto">
      <div className="mx-auto flex max-w-4xl items-center justify-center gap-1 px-4 py-4 sm:gap-2">
        {categories.map((category, index) => {
          const isSelected = selectedCategory === category.name;

          return (
            <motion.button
              key={category.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              onClick={() => onSelectCategory(category.name as CategoryName)}
              className={cn(
                "relative whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 sm:px-4",
                isSelected
                  ? "text-white"
                  : "text-surface-600 hover:bg-surface-100 hover:text-surface-900"
              )}
            >
              {isSelected && (
                <motion.div
                  layoutId="category-pill"
                  className="absolute inset-0 rounded-lg bg-gradient-to-r from-brand-600 to-brand-700 shadow-soft"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{category.display}</span>
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}



