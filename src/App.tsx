import { useState } from "react";
import { Layout } from "@/components/layout";
import { CategoryNav } from "@/components/CategoryNav";
import type { CategoryName } from "@/data/categories";
import { Palette, Grid3X3, Sparkles } from "lucide-react";
import { motion } from "motion/react";

function App() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryName | null>(null);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-surface-50 py-12 sm:py-16">
        {/* Decorative background pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="mosaic-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="30" height="30" fill="currentColor" />
                <rect x="30" y="30" width="30" height="30" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#mosaic-pattern)" />
          </svg>
        </div>

        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-display text-4xl font-bold tracking-tight text-surface-900 sm:text-5xl lg:text-6xl"
          >
            Design Your Perfect{" "}
            <span className="bg-gradient-to-r from-brand-600 to-accent-600 bg-clip-text text-transparent">
              Mosaic
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto mt-4 max-w-2xl text-lg text-surface-600 sm:text-xl"
          >
            Create stunning custom floor mosaics with our interactive designer. 
            Choose from beautiful patterns and customize every color.
          </motion.p>

          {/* Feature highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-6"
          >
            <div className="flex items-center gap-2 text-sm text-surface-600">
              <Palette className="h-4 w-4 text-brand-500" />
              <span>36 Colors</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-surface-600">
              <Grid3X3 className="h-4 w-4 text-brand-500" />
              <span>8 Categories</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-surface-600">
              <Sparkles className="h-4 w-4 text-brand-500" />
              <span>Infinite Combinations</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="border-b border-surface-200 bg-white">
        <CategoryNav
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </section>

      {/* Constructor Area */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {selectedCategory ? (
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl border border-surface-200 bg-white p-8 shadow-card"
            >
              <h2 className="font-display text-2xl font-semibold text-surface-900">
                {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Collection
              </h2>
              <p className="mt-2 text-surface-600">
                Select a mosaic from this collection to start customizing.
              </p>

              {/* Placeholder for mosaic grid - will be implemented in Phase 2 */}
              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square animate-pulse rounded-xl bg-surface-100"
                  />
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-16 text-center"
            >
              <div className="rounded-2xl bg-surface-100 p-6">
                <Grid3X3 className="h-12 w-12 text-surface-400" />
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold text-surface-900">
                Choose a Category
              </h3>
              <p className="mt-2 max-w-md text-surface-600">
                Select a mosaic category above to browse available designs and start creating your custom pattern.
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </Layout>
  );
}

export default App;
