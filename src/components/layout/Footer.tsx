export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-surface-200 bg-surface-100/50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-surface-500">
            © {currentYear} Mosaicos Bien. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://www.mosaicosbien.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-surface-500 transition-colors hover:text-surface-700"
            >
              mosaicosbien.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

