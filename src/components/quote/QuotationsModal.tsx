import { Modal } from "@/components/ui/Modal";
import { useQuotations, type QuotationWithDetails } from "@/hooks/useQuotations";
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Package,
  Loader2,
  RefreshCw
} from "lucide-react";
import { cn } from "@/lib/utils";

interface QuotationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Status badge component
function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { icon: typeof Clock; label: string; className: string }> = {
    pending: {
      icon: Clock,
      label: "Pendiente",
      className: "bg-yellow-50 text-yellow-700 border-yellow-200",
    },
    reviewed: {
      icon: AlertCircle,
      label: "En revisión",
      className: "bg-blue-50 text-blue-700 border-blue-200",
    },
    quoted: {
      icon: FileText,
      label: "Cotizado",
      className: "bg-purple-50 text-purple-700 border-purple-200",
    },
    accepted: {
      icon: CheckCircle,
      label: "Aceptado",
      className: "bg-green-50 text-green-700 border-green-200",
    },
    rejected: {
      icon: XCircle,
      label: "Rechazado",
      className: "bg-red-50 text-red-700 border-red-200",
    },
    expired: {
      icon: XCircle,
      label: "Expirado",
      className: "bg-surface-50 text-surface-500 border-surface-200",
    },
  };

  const { icon: Icon, label, className } = config[status] || config.pending;

  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
      className
    )}>
      <Icon className="h-3 w-3" />
      {label}
    </span>
  );
}

// Format date helper
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("es-CO", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

// Quotation card component
function QuotationCard({ quotation }: { quotation: QuotationWithDetails }) {
  return (
    <div className="rounded-xl border border-surface-200 bg-white p-4 transition-shadow hover:shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          {/* Mosaic name */}
          <h4 className="font-medium text-surface-900 truncate">
            {quotation.mosaicName}
          </h4>
          
          {/* Category */}
          <p className="mt-0.5 text-sm text-surface-500 capitalize">
            {quotation.mosaicCategory}
          </p>
          
          {/* Quantities */}
          <div className="mt-2 flex flex-wrap gap-3 text-sm">
            <span className="flex items-center gap-1 text-surface-600">
              <Package className="h-3.5 w-3.5" />
              {quotation.quantityMosaic} m² mosaico
            </span>
            {quotation.quantityBorder > 0 && (
              <span className="text-surface-600">
                + {quotation.quantityBorder} m² cenefa
              </span>
            )}
          </div>
          
          {/* Date */}
          <p className="mt-2 text-xs text-surface-400">
            {formatDate(quotation.created_at)}
          </p>
        </div>

        {/* Status badge */}
        <StatusBadge status={quotation.status} />
      </div>

      {/* Price (if quoted) */}
      {quotation.quoted_price && (
        <div className="mt-3 rounded-lg bg-green-50 p-3">
          <p className="text-xs text-green-600">Precio cotizado</p>
          <p className="text-lg font-semibold text-green-700">
            ${quotation.quoted_price.toLocaleString("es-CO")} {quotation.currency}
          </p>
          {quotation.valid_until && (
            <p className="mt-1 text-xs text-green-600">
              Válido hasta: {formatDate(quotation.valid_until)}
            </p>
          )}
        </div>
      )}

      {/* Notes */}
      {quotation.notes && (
        <div className="mt-3 rounded-lg bg-surface-50 p-3">
          <p className="text-xs text-surface-500">Notas</p>
          <p className="mt-1 text-sm text-surface-700">{quotation.notes}</p>
        </div>
      )}
    </div>
  );
}

// Empty state component
function EmptyState() {
  return (
    <div className="py-12 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-surface-100">
        <FileText className="h-8 w-8 text-surface-400" />
      </div>
      <h3 className="mt-4 font-medium text-surface-900">
        No tienes cotizaciones
      </h3>
      <p className="mt-2 text-sm text-surface-500">
        Diseña un mosaico y solicita una cotización para verla aquí.
      </p>
    </div>
  );
}

export function QuotationsModal({ isOpen, onClose }: QuotationsModalProps) {
  const { quotations, isLoading, error, refetch } = useQuotations();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Mis cotizaciones"
      description="Historial de tus solicitudes de cotización"
      size="lg"
    >
      <div className="p-6 pt-2">
        {/* Refresh button */}
        {!isLoading && quotations.length > 0 && (
          <div className="mb-4 flex justify-end">
            <button
              type="button"
              onClick={refetch}
              className="flex items-center gap-1.5 text-sm text-surface-500 hover:text-surface-700"
            >
              <RefreshCw className="h-4 w-4" />
              Actualizar
            </button>
          </div>
        )}

        {/* Loading state */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-brand-600" />
          </div>
        )}

        {/* Error state */}
        {error && !isLoading && (
          <div className="rounded-lg bg-red-50 p-4 text-center">
            <p className="text-sm text-red-600">{error.message}</p>
            <button
              type="button"
              onClick={refetch}
              className="mt-2 text-sm font-medium text-red-700 hover:underline"
            >
              Intentar de nuevo
            </button>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !error && quotations.length === 0 && <EmptyState />}

        {/* Quotations list */}
        {!isLoading && !error && quotations.length > 0 && (
          <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
            {quotations.map((quotation) => (
              <QuotationCard key={quotation.id} quotation={quotation} />
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
}
