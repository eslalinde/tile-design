import { Mail, ArrowLeft, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface MagicLinkSentProps {
  email: string;
  onBack: () => void;
  onResend: () => Promise<void>;
  isResending?: boolean;
}

export function MagicLinkSent({
  email,
  onBack,
  onResend,
  isResending = false,
}: MagicLinkSentProps) {
  return (
    <div className="text-center">
      {/* Animated envelope icon */}
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-accent-100 to-accent-200">
        <Mail className="h-10 w-10 text-accent-600" />
      </div>

      <h3 className="font-display text-xl font-semibold text-surface-900">
        ¡Revisa tu correo!
      </h3>
      
      <p className="mt-2 text-surface-600">
        Enviamos un enlace mágico a
      </p>
      
      <p className="mt-1 font-medium text-surface-900">{email}</p>

      <div className="mt-6 rounded-xl bg-surface-50 p-4">
        <p className="text-sm text-surface-600">
          Haz clic en el enlace del correo para continuar. El enlace expira en 1 hora.
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <button
          type="button"
          onClick={onResend}
          disabled={isResending}
          className={cn(
            "flex w-full items-center justify-center gap-2 rounded-xl border border-surface-200 py-2.5 text-sm font-medium text-surface-700",
            "transition-colors duration-200",
            "hover:bg-surface-50",
            "disabled:cursor-not-allowed disabled:opacity-50"
          )}
        >
          <RefreshCw className={cn("h-4 w-4", isResending && "animate-spin")} />
          <span>{isResending ? "Reenviando..." : "Reenviar enlace"}</span>
        </button>

        <button
          type="button"
          onClick={onBack}
          className="flex items-center justify-center gap-2 py-2 text-sm text-surface-500 hover:text-surface-700"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Usar otro correo</span>
        </button>
      </div>

      {/* Help text */}
      <p className="mt-6 text-xs text-surface-400">
        ¿No recibiste el correo? Revisa tu carpeta de spam o{" "}
        <button
          type="button"
          onClick={onResend}
          className="text-accent-600 hover:underline"
        >
          reenvíalo
        </button>
      </p>
    </div>
  );
}
