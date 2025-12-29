import { Hexagon } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-surface-200 bg-surface-50/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-soft">
            <Hexagon className="h-5 w-5" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-xl font-semibold tracking-tight text-surface-900">
              Mosaicos Bien
            </span>
            <span className="text-xs text-surface-500">Custom Mosaic Designer</span>
          </div>
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          <a
            href="https://www.mosaicosbien.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-surface-600 transition-colors hover:text-surface-900"
          >
            Visit Website
          </a>
        </nav>
      </div>
    </header>
  );
}



