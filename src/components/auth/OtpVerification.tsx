import { useState } from "react";
import { OtpInput } from "./OtpInput";
import { Mail, ArrowLeft, RefreshCw, Loader2, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface OtpVerificationProps {
  email: string;
  onVerify: (code: string) => Promise<void>;
  onBack: () => void;
  onResend: () => Promise<void>;
  isVerifying?: boolean;
  isResending?: boolean;
}

export function OtpVerification({
  email,
  onVerify,
  onBack,
  onResend,
  isVerifying = false,
  isResending = false,
}: OtpVerificationProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [resendSuccess, setResendSuccess] = useState(false);

  async function handleVerify() {
    if (code.length !== 6) {
      setError("Ingresa el código de 6 dígitos");
      return;
    }

    setError(null);
    try {
      await onVerify(code);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Código inválido. Intenta de nuevo.");
      setCode("");
    }
  }

  async function handleResend() {
    setError(null);
    setResendSuccess(false);
    try {
      await onResend();
      setResendSuccess(true);
      setCode("");
      // Hide success message after 3 seconds
      setTimeout(() => setResendSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al reenviar el código");
    }
  }

  // Auto-submit when 6 digits are entered
  function handleCodeChange(newCode: string) {
    setCode(newCode);
    setError(null);
    
    if (newCode.length === 6) {
      // Small delay to show the complete code before verifying
      setTimeout(() => {
        onVerify(newCode).catch((err) => {
          setError(err instanceof Error ? err.message : "Código inválido. Intenta de nuevo.");
          setCode("");
        });
      }, 150);
    }
  }

  return (
    <div className="text-center">
      {/* Email icon */}
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-accent-100 to-accent-200">
        <Mail className="h-10 w-10 text-accent-600" />
      </div>

      <h3 className="font-display text-xl font-semibold text-surface-900">
        Ingresa el código
      </h3>
      
      <p className="mt-2 text-surface-600">
        Enviamos un código de 6 dígitos a
      </p>
      
      <p className="mt-1 font-medium text-surface-900">{email}</p>

      {/* OTP Input */}
      <div className="mt-8">
        <OtpInput
          value={code}
          onChange={handleCodeChange}
          disabled={isVerifying}
          error={!!error}
        />
      </div>

      {/* Error message */}
      {error && (
        <p className="mt-4 text-sm text-red-600">{error}</p>
      )}

      {/* Resend success message */}
      {resendSuccess && (
        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-green-600">
          <CheckCircle className="h-4 w-4" />
          <span>Código reenviado</span>
        </div>
      )}

      {/* Verify button */}
      <button
        type="button"
        onClick={handleVerify}
        disabled={code.length !== 6 || isVerifying}
        className={cn(
          "mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-3 font-medium",
          "bg-gradient-to-r from-brand-600 to-brand-700 text-white",
          "transition-all duration-200",
          "hover:from-brand-700 hover:to-brand-800",
          "disabled:cursor-not-allowed disabled:opacity-50"
        )}
      >
        {isVerifying ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Verificando...</span>
          </>
        ) : (
          <span>Verificar código</span>
        )}
      </button>

      {/* Actions */}
      <div className="mt-6 flex flex-col gap-3">
        <button
          type="button"
          onClick={handleResend}
          disabled={isResending}
          className={cn(
            "flex w-full items-center justify-center gap-2 rounded-xl border border-surface-200 py-2.5 text-sm font-medium text-surface-700",
            "transition-colors duration-200",
            "hover:bg-surface-50",
            "disabled:cursor-not-allowed disabled:opacity-50"
          )}
        >
          <RefreshCw className={cn("h-4 w-4", isResending && "animate-spin")} />
          <span>{isResending ? "Reenviando..." : "Reenviar código"}</span>
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
      <div className="mt-6 rounded-xl bg-surface-50 p-4">
        <p className="text-sm text-surface-600">
          El código expira en <strong>10 minutos</strong>. Si no lo ves, revisa tu carpeta de spam.
        </p>
      </div>
    </div>
  );
}
