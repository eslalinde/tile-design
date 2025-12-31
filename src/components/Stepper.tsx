import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export interface Step {
  id: number;
  label: string;
  description?: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (stepId: number) => void;
}

export function Stepper({ steps, currentStep, onStepClick }: StepperProps) {
  return (
    <div className="w-full bg-white border-b border-surface-200">
      <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6 lg:px-8">
        <nav aria-label="Progress">
          <ol className="flex items-center justify-between">
            {steps.map((step, index) => {
              const isCompleted = step.id < currentStep;
              const isCurrent = step.id === currentStep;
              const isClickable = onStepClick && step.id <= currentStep;

              return (
                <li key={step.id} className="relative flex-1">
                  <div className="flex items-center justify-center">
                    {/* Connector line */}
                    {index > 0 && (
                      <div
                        className={cn(
                          "absolute top-4 h-0.5",
                          isCompleted || isCurrent
                            ? "bg-brand-600"
                            : "bg-surface-200"
                        )}
                        style={{ 
                          width: "100%", 
                          left: "-50%",
                        }}
                      />
                    )}

                    {/* Step circle and label */}
                    <button
                      type="button"
                      onClick={() => isClickable && onStepClick?.(step.id)}
                      disabled={!isClickable}
                      className={cn(
                        "group relative flex flex-col items-center",
                        isClickable ? "cursor-pointer" : "cursor-default"
                      )}
                    >
                      <span
                        className={cn(
                          "relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all duration-200",
                          isCompleted
                            ? "border-brand-600 bg-brand-600 text-white"
                            : isCurrent
                            ? "border-brand-600 bg-white text-brand-600 ring-4 ring-brand-100"
                            : "border-surface-300 bg-white text-surface-400"
                        )}
                      >
                        {isCompleted ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          step.id
                        )}
                      </span>

                      <span
                        className={cn(
                          "mt-2 text-xs font-medium sm:text-sm",
                          isCurrent
                            ? "text-brand-600"
                            : isCompleted
                            ? "text-surface-700"
                            : "text-surface-400"
                        )}
                      >
                        {step.label}
                      </span>

                      {step.description && (
                        <span
                          className={cn(
                            "hidden text-xs sm:block",
                            isCurrent || isCompleted
                              ? "text-surface-500"
                              : "text-surface-400"
                          )}
                        >
                          {step.description}
                        </span>
                      )}
                    </button>
                  </div>
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </div>
  );
}

export const defaultSteps: Step[] = [
  { id: 1, label: "Category" },
  { id: 2, label: "Tile" },
  { id: 3, label: "Design" },
  { id: 4, label: "Save / Quote" },
];
