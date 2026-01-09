import { Check, Sparkles, History, Bell } from "lucide-react";

const benefits = [
  {
    icon: Sparkles,
    title: "Guarda tus diseños",
    description: "Accede a tus mosaicos desde cualquier dispositivo",
  },
  {
    icon: History,
    title: "Historial de cotizaciones",
    description: "Consulta y da seguimiento a todas tus solicitudes",
  },
  {
    icon: Bell,
    title: "Notificaciones",
    description: "Recibe actualizaciones sobre el estado de tus cotizaciones",
  },
];

export function AuthBenefits() {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-surface-700">
        ¿Por qué crear una cuenta?
      </h3>
      <ul className="space-y-3">
        {benefits.map((benefit) => (
          <li key={benefit.title} className="flex gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-50">
              <benefit.icon className="h-4 w-4 text-accent-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-surface-900">
                {benefit.title}
              </p>
              <p className="text-xs text-surface-500">{benefit.description}</p>
            </div>
          </li>
        ))}
      </ul>
      
      {/* Trust indicators */}
      <div className="mt-6 flex items-center gap-2 rounded-lg bg-surface-50 p-3">
        <Check className="h-4 w-4 text-green-600" />
        <span className="text-xs text-surface-600">
          Sin contraseña. Solo tu correo electrónico.
        </span>
      </div>
    </div>
  );
}
