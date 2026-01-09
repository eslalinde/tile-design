import { useState, useCallback } from "react";
import { Modal } from "@/components/ui/Modal";
import { EmailForm } from "./EmailForm";
import { OtpVerification } from "./OtpVerification";
import { AuthBenefits } from "./AuthBenefits";
import { useAuth } from "@/hooks/useAuth";
import { CheckCircle } from "lucide-react";

type AuthStep = "email" | "otp" | "success";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  title?: string;
  description?: string;
}

export function AuthModal({
  isOpen,
  onClose,
  onSuccess,
  title = "Ingresa tu correo",
  description = "Te enviaremos un código de verificación",
}: AuthModalProps) {
  const { sendOtpCode, verifyOtpCode } = useAuth();
  const [step, setStep] = useState<AuthStep>("email");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);

  // Send OTP code to email
  const handleSendCode = useCallback(
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

  // Verify the OTP code
  const handleVerify = useCallback(
    async (code: string) => {
      setIsVerifying(true);
      try {
        const { error } = await verifyOtpCode(email, code);
        if (error) {
          throw error;
        }
        setStep("success");
        // Close modal and call success callback after short delay
        setTimeout(() => {
          onSuccess?.();
          onClose();
        }, 1500);
      } finally {
        setIsVerifying(false);
      }
    },
    [email, verifyOtpCode, onSuccess, onClose]
  );

  // Resend OTP code
  const handleResend = useCallback(async () => {
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

  // Go back to email step
  const handleBack = useCallback(() => {
    setStep("email");
    setEmail("");
  }, []);

  // Handle modal close
  const handleClose = useCallback(() => {
    // Reset state when closing
    setStep("email");
    setEmail("");
    setIsLoading(false);
    setIsVerifying(false);
    onClose();
  }, [onClose]);

  // Get title based on step
  const getTitle = () => {
    switch (step) {
      case "email":
        return title;
      case "otp":
        return undefined;
      case "success":
        return undefined;
      default:
        return title;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={getTitle()}
      description={step === "email" ? description : undefined}
      size="lg"
    >
      <div className="p-6 pt-2">
        {step === "email" && (
          <div className="grid gap-8 md:grid-cols-2">
            {/* Left side: Form */}
            <div>
              <EmailForm
                onSubmit={handleSendCode}
                isLoading={isLoading}
                submitLabel="Enviar código"
              />
            </div>

            {/* Right side: Benefits */}
            <div className="hidden border-l border-surface-100 pl-8 md:block">
              <AuthBenefits />
            </div>
          </div>
        )}

        {step === "otp" && (
          <OtpVerification
            email={email}
            onVerify={handleVerify}
            onBack={handleBack}
            onResend={handleResend}
            isVerifying={isVerifying}
            isResending={isResending}
          />
        )}

        {step === "success" && (
          <div className="py-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="mt-4 font-display text-xl font-semibold text-surface-900">
              ¡Bienvenido!
            </h3>
            <p className="mt-2 text-surface-600">
              Has iniciado sesión correctamente
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
}
