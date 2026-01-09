import { useEffect, useState } from "react";
import { exchangeCodeForSession } from "@/lib/auth";
import { Loader2, CheckCircle, XCircle } from "lucide-react";

type CallbackStatus = "loading" | "success" | "error";

interface AuthCallbackProps {
  onComplete?: () => void;
}

export function AuthCallback({ onComplete }: AuthCallbackProps) {
  const [status, setStatus] = useState<CallbackStatus>("loading");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function handleCallback() {
      try {
        // Get the code from URL
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");

        if (!code) {
          // Check for error in URL (Supabase error format)
          const errorDescription = params.get("error_description");
          if (errorDescription) {
            throw new Error(errorDescription);
          }
          throw new Error("No authorization code found");
        }

        // Exchange code for session
        const { error: authError } = await exchangeCodeForSession(code);

        if (authError) {
          throw authError;
        }

        setStatus("success");

        // Clean up URL and redirect after short delay
        setTimeout(() => {
          // Remove the auth callback path and params
          window.history.replaceState({}, "", "/");
          onComplete?.();
        }, 1500);
      } catch (err) {
        console.error("Auth callback error:", err);
        setError(err instanceof Error ? err.message : "Authentication failed");
        setStatus("error");
      }
    }

    handleCallback();
  }, [onComplete]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-50">
      <div className="mx-auto max-w-md rounded-2xl bg-white p-8 text-center shadow-card">
        {status === "loading" && (
          <>
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-brand-600" />
            <h2 className="mt-4 font-display text-xl font-semibold text-surface-900">
              Verificando...
            </h2>
            <p className="mt-2 text-surface-600">
              Estamos confirmando tu identidad
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="mt-4 font-display text-xl font-semibold text-surface-900">
              ¡Verificación exitosa!
            </h2>
            <p className="mt-2 text-surface-600">
              Redirigiendo al diseñador...
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <XCircle className="h-10 w-10 text-red-600" />
            </div>
            <h2 className="mt-4 font-display text-xl font-semibold text-surface-900">
              Error de verificación
            </h2>
            <p className="mt-2 text-surface-600">{error}</p>
            <button
              type="button"
              onClick={() => {
                window.history.replaceState({}, "", "/");
                window.location.reload();
              }}
              className="mt-6 rounded-xl bg-surface-900 px-6 py-2.5 font-medium text-white transition-colors hover:bg-surface-800"
            >
              Volver al inicio
            </button>
          </>
        )}
      </div>
    </div>
  );
}
