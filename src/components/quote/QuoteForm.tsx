import { useState, type FormEvent } from "react";
import { User, Phone, FileText, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface QuoteFormData {
  firstName: string;
  lastName: string;
  phone: string;
  quantityMosaic: number;
  quantityBorder: number;
  notes: string;
  acceptedHabeasData: boolean;
}

interface QuoteFormProps {
  email: string;
  initialData?: Partial<QuoteFormData>;
  onSubmit: (data: QuoteFormData) => Promise<void>;
  isLoading?: boolean;
}

export function QuoteForm({
  email,
  initialData,
  onSubmit,
  isLoading = false,
}: QuoteFormProps) {
  const [formData, setFormData] = useState<QuoteFormData>({
    firstName: initialData?.firstName ?? "",
    lastName: initialData?.lastName ?? "",
    phone: initialData?.phone ?? "",
    quantityMosaic: initialData?.quantityMosaic ?? 1,
    quantityBorder: initialData?.quantityBorder ?? 0,
    notes: initialData?.notes ?? "",
    acceptedHabeasData: initialData?.acceptedHabeasData ?? false,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof QuoteFormData, string>>>({});

  function validate(): boolean {
    const newErrors: Partial<Record<keyof QuoteFormData, string>> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "El nombre es requerido";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "El apellido es requerido";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "El teléfono es requerido";
    } else if (!/^[\d\s\-+()]{7,}$/.test(formData.phone)) {
      newErrors.phone = "Ingresa un número de teléfono válido";
    }

    if (formData.quantityMosaic < 1) {
      newErrors.quantityMosaic = "La cantidad debe ser al menos 1 m²";
    }

    if (!formData.acceptedHabeasData) {
      newErrors.acceptedHabeasData = "Debes aceptar el tratamiento de datos";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!validate()) return;

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error("Quote submission error:", error);
    }
  }

  function handleChange(field: keyof QuoteFormData, value: string | number | boolean) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  const inputClasses = cn(
    "w-full rounded-xl border bg-white py-3 pl-11 pr-4 text-surface-900",
    "placeholder:text-surface-400",
    "transition-colors duration-200",
    "focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20",
    "disabled:cursor-not-allowed disabled:opacity-50"
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Email display (read-only) */}
      <div className="rounded-lg bg-surface-50 px-4 py-3">
        <p className="text-xs text-surface-500">Correo electrónico</p>
        <p className="font-medium text-surface-900">{email}</p>
      </div>

      {/* Name fields */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="mb-2 block text-sm font-medium text-surface-700">
            Nombre *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-surface-400" />
            <input
              type="text"
              id="firstName"
              value={formData.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              placeholder="Tu nombre"
              disabled={isLoading}
              className={cn(inputClasses, errors.firstName && "border-red-300")}
            />
          </div>
          {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
        </div>

        <div>
          <label htmlFor="lastName" className="mb-2 block text-sm font-medium text-surface-700">
            Apellido *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-surface-400" />
            <input
              type="text"
              id="lastName"
              value={formData.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              placeholder="Tu apellido"
              disabled={isLoading}
              className={cn(inputClasses, errors.lastName && "border-red-300")}
            />
          </div>
          {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
        </div>
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="mb-2 block text-sm font-medium text-surface-700">
          Teléfono *
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-surface-400" />
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="+57 300 123 4567"
            disabled={isLoading}
            className={cn(inputClasses, errors.phone && "border-red-300")}
          />
        </div>
        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
      </div>

      {/* Quantities */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="quantityMosaic" className="mb-2 block text-sm font-medium text-surface-700">
            Cantidad de mosaico (m²) *
          </label>
          <input
            type="number"
            id="quantityMosaic"
            min="1"
            step="0.5"
            value={formData.quantityMosaic}
            onChange={(e) => handleChange("quantityMosaic", parseFloat(e.target.value) || 0)}
            disabled={isLoading}
            className={cn(
              "w-full rounded-xl border bg-white px-4 py-3 text-surface-900",
              "focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20",
              "disabled:cursor-not-allowed disabled:opacity-50",
              errors.quantityMosaic ? "border-red-300" : "border-surface-200"
            )}
          />
          {errors.quantityMosaic && <p className="mt-1 text-sm text-red-600">{errors.quantityMosaic}</p>}
        </div>

        <div>
          <label htmlFor="quantityBorder" className="mb-2 block text-sm font-medium text-surface-700">
            Cantidad de cenefa (m²)
          </label>
          <input
            type="number"
            id="quantityBorder"
            min="0"
            step="0.5"
            value={formData.quantityBorder}
            onChange={(e) => handleChange("quantityBorder", parseFloat(e.target.value) || 0)}
            disabled={isLoading}
            className={cn(
              "w-full rounded-xl border border-surface-200 bg-white px-4 py-3 text-surface-900",
              "focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20",
              "disabled:cursor-not-allowed disabled:opacity-50"
            )}
          />
          <p className="mt-1 text-xs text-surface-500">Opcional</p>
        </div>
      </div>

      {/* Notes */}
      <div>
        <label htmlFor="notes" className="mb-2 block text-sm font-medium text-surface-700">
          Notas adicionales
        </label>
        <div className="relative">
          <FileText className="absolute left-3 top-3 h-5 w-5 text-surface-400" />
          <textarea
            id="notes"
            rows={3}
            value={formData.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
            placeholder="¿Algo más que debamos saber sobre tu proyecto?"
            disabled={isLoading}
            className={cn(
              "w-full resize-none rounded-xl border border-surface-200 bg-white py-3 pl-11 pr-4 text-surface-900",
              "placeholder:text-surface-400",
              "focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20",
              "disabled:cursor-not-allowed disabled:opacity-50"
            )}
          />
        </div>
      </div>

      {/* Habeas Data checkbox */}
      <div className={cn(
        "rounded-xl border p-4",
        errors.acceptedHabeasData ? "border-red-300 bg-red-50" : "border-surface-200 bg-surface-50"
      )}>
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={formData.acceptedHabeasData}
            onChange={(e) => handleChange("acceptedHabeasData", e.target.checked)}
            disabled={isLoading}
            className="mt-0.5 h-5 w-5 rounded border-surface-300 text-accent-600 focus:ring-accent-500"
          />
          <div>
            <span className="text-sm text-surface-700">
              Acepto el{" "}
              <a
                href="/politica-datos"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-accent-600 hover:underline"
              >
                tratamiento de datos personales
              </a>{" "}
              de acuerdo con la Ley de Habeas Data de Colombia.
            </span>
            {errors.acceptedHabeasData && (
              <p className="mt-1 text-sm text-red-600">{errors.acceptedHabeasData}</p>
            )}
          </div>
        </label>
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={isLoading}
        className={cn(
          "flex w-full items-center justify-center gap-2 rounded-xl py-3.5 font-medium",
          "bg-gradient-to-r from-brand-600 to-brand-700 text-white",
          "transition-all duration-200",
          "hover:from-brand-700 hover:to-brand-800 hover:shadow-lg",
          "focus:outline-none focus:ring-2 focus:ring-brand-500/50",
          "disabled:cursor-not-allowed disabled:opacity-50"
        )}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Enviando solicitud...</span>
          </>
        ) : (
          <span>Solicitar cotización</span>
        )}
      </button>
    </form>
  );
}
