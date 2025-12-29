import { cn } from "@/lib/utils";
import { categories, type CategoryName } from "@/data/categories";

interface CategoryNavProps {
  selectedCategory: CategoryName | null;
  onSelectCategory: (category: CategoryName) => void;
}

export function CategoryNav({ selectedCategory, onSelectCategory }: CategoryNavProps) {
  return (
    <nav className="w-full overflow-x-auto">
      <div className="mx-auto flex max-w-4xl items-center justify-center gap-1 px-4 py-4 sm:gap-2">
        {categories.map((category) => {
          const isSelected = selectedCategory === category.name;

          return (
            <button
              key={category.name}
              onClick={() => onSelectCategory(category.name as CategoryName)}
              className={cn(
                "relative whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 sm:px-4",
                isSelected
                  ? "bg-gradient-to-r from-brand-600 to-brand-700 text-white shadow-soft"
                  : "text-surface-600 hover:bg-surface-100 hover:text-surface-900"
              )}
            >
              {category.display}
            </button>
          );
        })}
      </div>
    </nav>
  );
}



