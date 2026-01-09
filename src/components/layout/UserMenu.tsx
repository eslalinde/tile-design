import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { 
  User, 
  LogOut, 
  FileText, 
  ChevronDown,
  Mail,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";

interface UserMenuProps {
  onViewQuotations: () => void;
  onLogin: () => void;
}

export function UserMenu({ onViewQuotations, onLogin }: UserMenuProps) {
  const { isAuthenticated, isLoading, profile, user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close menu on escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const handleSignOut = async () => {
    setIsOpen(false);
    await signOut();
  };

  const handleViewQuotations = () => {
    setIsOpen(false);
    onViewQuotations();
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center gap-2 rounded-lg bg-surface-100 px-3 py-2">
        <Loader2 className="h-4 w-4 animate-spin text-surface-400" />
      </div>
    );
  }

  // Not authenticated - show login button
  if (!isAuthenticated) {
    return (
      <button
        type="button"
        onClick={onLogin}
        className={cn(
          "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium",
          "bg-brand-600 text-white",
          "transition-colors duration-200",
          "hover:bg-brand-700"
        )}
      >
        <User className="h-4 w-4" />
        <span>Iniciar sesión</span>
      </button>
    );
  }

  // Authenticated - show user menu
  const displayName = profile?.first_name || user?.email?.split("@")[0] || "Usuario";
  const displayEmail = user?.email || "";

  return (
    <div className="relative" ref={menuRef}>
      {/* Menu trigger button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium",
          "border border-surface-200 bg-white",
          "transition-all duration-200",
          "hover:bg-surface-50 hover:border-surface-300",
          isOpen && "bg-surface-50 border-surface-300"
        )}
      >
        {/* Avatar */}
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-xs font-semibold text-white">
          {displayName.charAt(0).toUpperCase()}
        </div>
        <span className="hidden sm:inline text-surface-700">{displayName}</span>
        <ChevronDown className={cn(
          "h-4 w-4 text-surface-400 transition-transform duration-200",
          isOpen && "rotate-180"
        )} />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-xl border border-surface-200 bg-white py-2 shadow-elevated">
          {/* User info header */}
          <div className="border-b border-surface-100 px-4 pb-3 pt-1">
            <p className="font-medium text-surface-900">{displayName}</p>
            <p className="flex items-center gap-1 text-sm text-surface-500">
              <Mail className="h-3 w-3" />
              {displayEmail}
            </p>
          </div>

          {/* Menu items */}
          <div className="py-1">
            <button
              type="button"
              onClick={handleViewQuotations}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-surface-700 transition-colors hover:bg-surface-50"
            >
              <FileText className="h-4 w-4 text-surface-400" />
              <span>Mis cotizaciones</span>
            </button>
          </div>

          {/* Sign out */}
          <div className="border-t border-surface-100 pt-1">
            <button
              type="button"
              onClick={handleSignOut}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-red-600 transition-colors hover:bg-red-50"
            >
              <LogOut className="h-4 w-4" />
              <span>Cerrar sesión</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
