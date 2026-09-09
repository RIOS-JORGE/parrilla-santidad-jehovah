import {
  STORE_NAME,
  INSTAGRAM_URL,
  INSTAGRAM_HANDLE,
  WHATSAPP_NUMBER,
  STORE_ADDRESS,
  STORE_MAPS_URL,
} from '../lib/constants'

export function Footer() {
  return (
    <footer className="bg-brand-bg text-brand-text/60 px-4 py-12 border-t border-brand-surface">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="font-bold text-brand-text text-lg">{STORE_NAME}</p>
          <p className="text-sm mt-1">{STORE_ADDRESS}, Hurlingham</p>
        </div>

        <nav className="flex items-center gap-6">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-text/60 hover:text-brand-accent transition-colors text-sm font-medium"
          >
            Instagram
          </a>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-text/60 hover:text-brand-accent transition-colors text-sm font-medium"
          >
            WhatsApp
          </a>
          <a
            href={STORE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-text/60 hover:text-brand-accent transition-colors text-sm font-medium"
          >
            Google Maps
          </a>
        </nav>

        <p className="text-xs text-center md:text-right">
          &copy; {new Date().getFullYear()} {STORE_NAME}. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  )
}
