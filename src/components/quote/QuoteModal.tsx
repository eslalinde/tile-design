import { useState, useCallback } from "react";
import { Modal } from "@/components/ui/Modal";
import { EmailForm } from "@/components/auth/EmailForm";
import { MagicLinkSent } from "@/components/auth/MagicLinkSent";
import { AuthBenefits } from "@/components/auth/AuthBenefits";
import { QuoteForm, type QuoteFormData } from "./QuoteForm";
import { useAuth } from "@/hooks/useAuth";
import { getOrCreateUserByEmail, updateUserProfile } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import type { Mosaic } from "@/hooks/useMosaics";
import type { PartColor, BorderState } from "@/types/mosaic";
import { Check } from "lucide-react";

type QuoteStep = "email" | "magic-link-sent" | "form" | "success";

interface MosaicSnapshot {
  mosaicId: string;
  mosaicName: string;
  category: string;
  svg: string;
  parts: PartColor[];
  border?: BorderState | null;
  width: number;
  height: number;
}

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  mosaic: Mosaic;
  currentSvg: string;
  parts: PartColor[];
  border?: BorderState | null;
}

export function QuoteModal({
  isOpen,
  onClose,
  mosaic,
  currentSvg,
  parts,
  border,
}: QuoteModalProps) {
  const { isAuthenticated, user, profile, sendMagicLink } = useAuth();
  
  // Determine initial step based on auth state
  const getInitialStep = (): QuoteStep => {
    if (isAuthenticated) return "form";
    return "email";
  };

  const [step, setStep] = useState<QuoteStep>(getInitialStep);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);

  // Handle email submission - sends magic link but allows form completion before verification
  const handleEmailSubmit = useCallback(
    async (emailAddress: string) => {
      setIsLoading(true);
      try {
        // Send magic link for verification
        const { error } = await sendMagicLink(emailAddress);
        if (error) {
          throw error;
        }
        setEmail(emailAddress);
        // Go directly to form - user can complete quote before verifying
        setStep("form");
      } finally {
        setIsLoading(false);
      }
    },
    [sendMagicLink]
  );

  // Handle quote form submission
  const handleQuoteSubmit = useCallback(
    async (formData: QuoteFormData) => {
      setIsLoading(true);
      try {
        const emailToUse = isAuthenticated && user?.email ? user.email : email;

        // Get or create user
        const { userId, error: userError } = await getOrCreateUserByEmail(
          emailToUse,
          formData.firstName,
          formData.lastName,
          formData.phone
        );

        if (userError || !userId) {
          throw userError || new Error("Failed to create user");
        }

        // Update user profile with habeas data acceptance
        await updateUserProfile(userId, {
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.phone,
          accepted_habeas_data: formData.acceptedHabeasData,
        });

        // Create mosaic snapshot
        const mosaicSnapshot: MosaicSnapshot = {
          mosaicId: mosaic.id,
          mosaicName: mosaic.name,
          category: mosaic.category,
          svg: currentSvg,
          parts,
          border,
          width: mosaic.width,
          height: mosaic.height,
        };

        // Create quotation
        const { error: quoteError } = await supabase.from("quotations").insert({
          user_id: userId,
          mosaic_snapshot: mosaicSnapshot,
          metadata: {
            quantity_mosaic: formData.quantityMosaic,
            quantity_border: formData.quantityBorder,
            notes: formData.notes,
          },
          status: "pending",
        });

        if (quoteError) {
          throw new Error(quoteError.message);
        }

        setStep("success");
      } catch (error) {
        console.error("Quote submission error:", error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [isAuthenticated, user, email, mosaic, currentSvg, parts, border]
  );

  // Handle magic link resend
  const handleResend = useCallback(async () => {
    if (!email) return;
    setIsResending(true);
    try {
      const { error } = await sendMagicLink(email);
      if (error) {
        throw error;
      }
    } finally {
      setIsResending(false);
    }
  }, [email, sendMagicLink]);

  // Handle back to email step
  const handleBackToEmail = useCallback(() => {
    setStep("email");
    setEmail("");
  }, []);

  // Handle modal close
  const handleClose = useCallback(() => {
    setStep(getInitialStep());
    setEmail("");
    setIsLoading(false);
    onClose();
  }, [onClose, isAuthenticated]);

  // Get title based on step
  const getTitle = () => {
    switch (step) {
      case "email":
        return "Solicitar cotización";
      case "magic-link-sent":
        return undefined;
      case "form":
        return "Completa tu solicitud";
      case "success":
        return undefined;
      default:
        return "Solicitar cotización";
    }
  };

  // Get description based on step
  const getDescription = () => {
    switch (step) {
      case "email":
        return "Ingresa tu correo para recibir la cotización";
      case "form":
        return "Revisa tu diseño y completa los datos";
      default:
        return undefined;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={getTitle()}
      description={getDescription()}
      size="xl"
    >
      <div className="p-6 pt-2">
        {step === "email" && (
          <div className="grid gap-8 md:grid-cols-2">
            {/* Left side: Form */}
            <div>
              <EmailForm
                onSubmit={handleEmailSubmit}
                isLoading={isLoading}
                submitLabel="Continuar"
              />
              <p className="mt-4 text-center text-xs text-surface-500">
                Te enviaremos un enlace de verificación a tu correo
              </p>
            </div>

            {/* Right side: Mosaic preview */}
            <div className="hidden border-l border-surface-100 pl-8 md:block">
              <MosaicPreview mosaic={mosaic} svg={currentSvg} />
            </div>
          </div>
        )}

        {step === "magic-link-sent" && (
          <MagicLinkSent
            email={email}
            onBack={handleBackToEmail}
            onResend={handleResend}
            isResending={isResending}
          />
        )}

        {step === "form" && (
          <div className="grid gap-8 md:grid-cols-5">
            {/* Left side: Form */}
            <div className="md:col-span-3">
              <QuoteForm
                email={isAuthenticated && user?.email ? user.email : email}
                initialData={{
                  firstName: profile?.first_name ?? "",
                  lastName: profile?.last_name ?? "",
                  phone: profile?.phone ?? "",
                }}
                onSubmit={handleQuoteSubmit}
                isLoading={isLoading}
              />
            </div>

            {/* Right side: Mosaic preview */}
            <div className="hidden border-l border-surface-100 pl-8 md:col-span-2 md:block">
              <MosaicPreview mosaic={mosaic} svg={currentSvg} />
              
              {/* Verification note for non-authenticated users */}
              {!isAuthenticated && email && (
                <div className="mt-4 rounded-lg bg-accent-50 p-3">
                  <p className="text-xs text-accent-700">
                    <strong>Nota:</strong> Revisa tu correo ({email}) y haz clic en el enlace para verificar tu cuenta y dar seguimiento a tu cotización.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {step === "success" && (
          <SuccessMessage onClose={handleClose} email={email || user?.email || ""} />
        )}
      </div>
    </Modal>
  );
}

// Mosaic preview component
function MosaicPreview({ mosaic, svg }: { mosaic: Mosaic; svg: string }) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-surface-700">Tu diseño</h3>
      
      {/* SVG Preview */}
      <div className="overflow-hidden rounded-xl border border-surface-200 bg-white p-4">
        <div
          className="mx-auto w-full max-w-[200px]"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      </div>

      {/* Mosaic info */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-surface-500">Nombre</span>
          <span className="font-medium text-surface-900">{mosaic.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-surface-500">Categoría</span>
          <span className="font-medium capitalize text-surface-900">{mosaic.category}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-surface-500">Dimensiones</span>
          <span className="font-medium text-surface-900">
            {mosaic.width} x {mosaic.height} mm
          </span>
        </div>
      </div>
    </div>
  );
}

// Success message component
function SuccessMessage({ onClose, email }: { onClose: () => void; email: string }) {
  return (
    <div className="py-8 text-center">
      {/* Success icon */}
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-100 to-green-200">
        <Check className="h-10 w-10 text-green-600" />
      </div>

      <h3 className="font-display text-2xl font-semibold text-surface-900">
        ¡Solicitud enviada!
      </h3>

      <p className="mx-auto mt-3 max-w-md text-surface-600">
        Hemos recibido tu solicitud de cotización. Nuestro equipo la revisará y te
        contactará pronto a <strong>{email}</strong>.
      </p>

      <div className="mt-6 rounded-xl bg-surface-50 p-4">
        <p className="text-sm text-surface-600">
          Tiempo estimado de respuesta: <strong>1-2 días hábiles</strong>
        </p>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="mt-8 rounded-xl bg-surface-900 px-8 py-3 font-medium text-white transition-colors hover:bg-surface-800"
      >
        Cerrar
      </button>
    </div>
  );
}
