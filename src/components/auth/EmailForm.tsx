import { useState, type FormEvent } from "react";
import { Mail, ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmailFormProps {
  onSubmit: (email: string) => Promise<void>;
  isLoading?: boolean;
  submitLabel?: string;
  placeholder?: string;
}

export function EmailForm({
  onSubmit,
  isLoading = false,
  submitLabel = "Continuar",
  placeholder = "tu@email.com",
}: EmailFormProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedEmail) {
      setError("Por favor ingresa tu correo electrónico");
      return;
    }

    if (!validateEmail(trimmedEmail)) {
      setError("Por favor ingresa un correo electrónico válido");
      return;
    }

    try {
      await onSubmit(trimmedEmail);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocurrió un error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-surface-700"
        >
          Correo electrónico
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-surface-400" />
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            disabled={isLoading}
            autoComplete="email"
            autoFocus
            className={cn(
              "w-full rounded-xl border bg-white py-3 pl-11 pr-4 text-surface-900",
              "placeholder:text-surface-400",
              "transition-colors duration-200",
              "focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20",
              "disabled:cursor-not-allowed disabled:opacity-50",
              error
                ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                : "border-surface-200"
            )}
          />
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-600">{error}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={cn(
          "flex w-full items-center justify-center gap-2 rounded-xl py-3 font-medium",
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
            <span>Enviando...</span>
          </>
        ) : (
          <>
            <span>{submitLabel}</span>
            <ArrowRight className="h-5 w-5" />
          </>
        )}
      </button>
    </form>
  );
}
