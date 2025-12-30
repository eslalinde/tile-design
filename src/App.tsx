import { useState, useCallback } from "react";
import { Layout } from "@/components/layout";
import { Stepper, defaultSteps } from "@/components/Stepper";
import { CategoryNav } from "@/components/CategoryNav";
import { MosaicGrid } from "@/components/MosaicGrid";
import { MosaicBuilder } from "@/components/builder";
import type { CategoryName } from "@/data/categories";
import type { Mosaic } from "@/hooks/useMosaics";
import { Palette, Grid3X3, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

type AppStep = 1 | 2 | 3 | 4;

function App() {
  // Navigation state
  const [currentStep, setCurrentStep] = useState<AppStep>(1);
  const [selectedCategory, setSelectedCategory] = useState<CategoryName | null>(null);
  const [selectedMosaic, setSelectedMosaic] = useState<Mosaic | null>(null);

  // Handle category selection
  const handleSelectCategory = useCallback((category: CategoryName) => {
    setSelectedCategory(category);
    setCurrentStep(2);
    setSelectedMosaic(null); // Reset mosaic when category changes
  }, []);

  // Handle mosaic selection
  const handleSelectMosaic = useCallback((mosaic: Mosaic) => {
    setSelectedMosaic(mosaic);
    setCurrentStep(3);
  }, []);

  // Handle back to tiles
  const handleBackToTiles = useCallback(() => {
    setSelectedMosaic(null);
    setCurrentStep(2);
  }, []);

  // Handle step navigation
  const handleStepClick = useCallback(
    (stepId: number) => {
      if (stepId === 1) {
        setCurrentStep(1);
        setSelectedCategory(null);
        setSelectedMosaic(null);
      } else if (stepId === 2 && selectedCategory) {
        setCurrentStep(2);
        setSelectedMosaic(null);
      } else if (stepId === 3 && selectedMosaic) {
        setCurrentStep(3);
      }
    },
    [selectedCategory, selectedMosaic]
  );

  return (
    <Layout>
      {/* Stepper - Always visible */}
      <Stepper
        steps={defaultSteps}
        currentStep={currentStep}
        onStepClick={handleStepClick}
      />

      <AnimatePresence mode="wait">
        {/* Step 1: Category Selection */}
        {currentStep === 1 && (
          <motion.div
            key="step-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-surface-50 py-12 sm:py-16">
              {/* Decorative background pattern */}
              <div className="absolute inset-0 opacity-[0.03]">
                <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern
                      id="mosaic-pattern"
                      x="0"
                      y="0"
                      width="60"
                      height="60"
                      patternUnits="userSpaceOnUse"
                    >
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
                  Create stunning custom floor mosaics with our interactive
                  designer. Choose from beautiful patterns and customize every
                  color.
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

            {/* Step 1 Content */}
            <section className="py-12">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                  <h2 className="font-display text-2xl font-semibold text-surface-900">
                    Step 1: Choose a Category
                  </h2>
                  <p className="mt-2 text-surface-600">
                    Select the type of mosaic you want to design.
                  </p>
                </div>

                <CategoryNav
                  selectedCategory={selectedCategory}
                  onSelectCategory={handleSelectCategory}
                />
              </div>
            </section>
          </motion.div>
        )}

        {/* Step 2: Tile Selection */}
        {currentStep === 2 && selectedCategory && (
          <motion.div
            key="step-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Category Navigation */}
            <section className="border-b border-surface-200 bg-white">
              <CategoryNav
                selectedCategory={selectedCategory}
                onSelectCategory={handleSelectCategory}
              />
            </section>

            {/* Step 2 Content */}
            <section className="py-12">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="rounded-2xl border border-surface-200 bg-white p-8 shadow-card">
                  <div className="text-center mb-8">
                    <h2 className="font-display text-2xl font-semibold text-surface-900">
                      Step 2: Choose a Tile
                    </h2>
                    <p className="mt-2 text-surface-600">
                      Select a mosaic from the{" "}
                      <span className="font-medium capitalize">
                        {selectedCategory}
                      </span>{" "}
                      collection to start customizing.
                    </p>
                  </div>

                  {/* Mosaic grid with tiles from Supabase */}
                  <MosaicGrid
                    category={selectedCategory}
                    onSelectMosaic={handleSelectMosaic}
                    selectedMosaicId={selectedMosaic?.id}
                  />
                </div>
              </div>
            </section>
          </motion.div>
        )}

        {/* Step 3: Design Builder */}
        {currentStep === 3 && selectedMosaic && (
          <motion.div
            key="step-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="flex-1"
          >
            <MosaicBuilder mosaic={selectedMosaic} onBack={handleBackToTiles} />
          </motion.div>
        )}

        {/* Step 4: Save/Quote - Placeholder */}
        {currentStep === 4 && (
          <motion.div
            key="step-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <section className="py-12">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="rounded-2xl border border-surface-200 bg-white p-8 shadow-card text-center">
                  <h2 className="font-display text-2xl font-semibold text-surface-900">
                    Step 4: Save or Quote
                  </h2>
                  <p className="mt-2 text-surface-600">
                    Save your design or request a quote.
                  </p>
                  <p className="mt-8 text-surface-400 italic">
                    (This step will be implemented in a future phase)
                  </p>
                </div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}

export default App;
