import { useState, useCallback, useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import { EmailForm } from "@/components/auth/EmailForm";
import { OtpVerification } from "@/components/auth/OtpVerification";
import { QuoteForm, type QuoteFormData } from "./QuoteForm";
import { useAuth } from "@/hooks/useAuth";
import { getOrCreateUserByEmail, updateUserProfile } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import type { Mosaic } from "@/hooks/useMosaics";
import type { PartColor, BorderState } from "@/types/mosaic";
import { Check } from "lucide-react";

type QuoteStep = "email" | "otp" | "form" | "success";

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
  const { isAuthenticated, user, profile, sendOtpCode, verifyOtpCode } = useAuth();
  
  // Determine initial step based on auth state
  const getInitialStep = (): QuoteStep => {
    if (isAuthenticated) return "form";
    return "email";
  };

  const [step, setStep] = useState<QuoteStep>(getInitialStep);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);

  // Update step when auth state changes
  useEffect(() => {
    if (isAuthenticated && step === "email") {
      setStep("form");
    }
  }, [isAuthenticated, step]);

  // Handle email submission - sends OTP code
  const handleEmailSubmit = useCallback(
    async (emailAddress: string) => {
      setIsLoading(true);
      try {
        const { error } = await sendOtpCode(emailAddress);
        if (error) {
          throw error;
        }
        setEmail(emailAddress);
        setStep("otp");
      } finally {
        setIsLoading(false);
      }
    },
    [sendOtpCode]
  );

  // Handle OTP verification
  const handleVerifyOtp = useCallback(
    async (code: string) => {
      setIsVerifying(true);
      try {
        const { error } = await verifyOtpCode(email, code);
        if (error) {
          throw error;
        }
        // After successful verification, go to form
        setStep("form");
      } finally {
        setIsVerifying(false);
      }
    },
    [email, verifyOtpCode]
  );

  // Handle OTP resend
  const handleResendOtp = useCallback(async () => {
    if (!email) return;
    setIsResending(true);
    try {
      const { error } = await sendOtpCode(email);
      if (error) {
        throw error;
      }
    } finally {
      setIsResending(false);
    }
  }, [email, sendOtpCode]);

  // Handle quote form submission
  const handleQuoteSubmit = useCallback(
    async (formData: QuoteFormData) => {
      setIsLoading(true);
      try {
        const emailToUse = user?.email || email;

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
    [user, email, mosaic, currentSvg, parts, border]
  );

  // Handle back to email step
  const handleBackToEmail = useCallback(() => {
    setStep("email");
    setEmail("");
  }, []);

  // Handle modal close
  const handleClose = useCallback(() => {
    // Don't reset if authenticated - keep form state
    if (!isAuthenticated) {
      setStep("email");
      setEmail("");
    } else {
      setStep("form");
    }
    setIsLoading(false);
    setIsVerifying(false);
    onClose();
  }, [onClose, isAuthenticated]);

  // Get title based on step
  const getTitle = () => {
    switch (step) {
      case "email":
        return "Solicitar cotización";
      case "otp":
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
        return "Ingresa tu correo para verificar tu identidad";
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
                submitLabel="Enviar código"
              />
              <p className="mt-4 text-center text-xs text-surface-500">
                Te enviaremos un código de 6 dígitos para verificar tu identidad
              </p>
            </div>

            {/* Right side: Mosaic preview */}
            <div className="hidden border-l border-surface-100 pl-8 md:block">
              <MosaicPreview mosaic={mosaic} svg={currentSvg} />
            </div>
          </div>
        )}

        {step === "otp" && (
          <div className="grid gap-8 md:grid-cols-2">
            {/* Left side: OTP verification */}
            <div>
              <OtpVerification
                email={email}
                onVerify={handleVerifyOtp}
                onBack={handleBackToEmail}
                onResend={handleResendOtp}
                isVerifying={isVerifying}
                isResending={isResending}
              />
            </div>

            {/* Right side: Mosaic preview */}
            <div className="hidden border-l border-surface-100 pl-8 md:block">
              <MosaicPreview mosaic={mosaic} svg={currentSvg} />
              <div className="mt-4 rounded-lg bg-accent-50 p-3">
                <p className="text-xs text-accent-700">
                  <strong>Tu diseño está seguro.</strong> Una vez verificado, podrás completar tu cotización.
                </p>
              </div>
            </div>
          </div>
        )}

        {step === "form" && (
          <div className="grid gap-8 md:grid-cols-5">
            {/* Left side: Form */}
            <div className="md:col-span-3">
              <QuoteForm
                email={user?.email || email}
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
            </div>
          </div>
        )}

        {step === "success" && (
          <SuccessMessage onClose={handleClose} email={user?.email || email} />
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
