import { useState, useCallback } from "react";
import { Modal } from "@/components/ui/Modal";
import { EmailForm } from "./EmailForm";
import { MagicLinkSent } from "./MagicLinkSent";
import { AuthBenefits } from "./AuthBenefits";
import { useAuth } from "@/hooks/useAuth";

type AuthStep = "email" | "magic-link-sent";

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
  description = "Te enviaremos un enlace mágico para continuar",
}: AuthModalProps) {
  const { sendMagicLink } = useAuth();
  const [step, setStep] = useState<AuthStep>("email");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const handleSendMagicLink = useCallback(
    async (emailAddress: string) => {
      setIsLoading(true);
      try {
        const { error } = await sendMagicLink(emailAddress);
        if (error) {
          throw error;
        }
        setEmail(emailAddress);
        setStep("magic-link-sent");
      } finally {
        setIsLoading(false);
      }
    },
    [sendMagicLink]
  );

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

  const handleBack = useCallback(() => {
    setStep("email");
    setEmail("");
  }, []);

  const handleClose = useCallback(() => {
    // Reset state when closing
    setStep("email");
    setEmail("");
    setIsLoading(false);
    onClose();
  }, [onClose]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={step === "email" ? title : undefined}
      description={step === "email" ? description : undefined}
      size="lg"
    >
      <div className="p-6 pt-2">
        {step === "email" ? (
          <div className="grid gap-8 md:grid-cols-2">
            {/* Left side: Form */}
            <div>
              <EmailForm
                onSubmit={handleSendMagicLink}
                isLoading={isLoading}
                submitLabel="Enviar enlace"
              />
            </div>

            {/* Right side: Benefits */}
            <div className="hidden border-l border-surface-100 pl-8 md:block">
              <AuthBenefits />
            </div>
          </div>
        ) : (
          <MagicLinkSent
            email={email}
            onBack={handleBack}
            onResend={handleResend}
            isResending={isResending}
          />
        )}
      </div>
    </Modal>
  );
}
