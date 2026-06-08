import {
  STORE_NAME,
  INSTAGRAM_URL,
  INSTAGRAM_HANDLE,
  WHATSAPP_NUMBER,
} from '../lib/constants'

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-[#f5f5f5]/60 px-4 py-12 border-t border-[#1a1a1a]">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="font-bold text-[#f5f5f5] text-lg">{STORE_NAME}</p>
          <p className="text-sm mt-1">Hamburguesas artesanales en Baradero</p>
        </div>

        <nav className="flex items-center gap-6">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#f5f5f5]/60 hover:text-[#f59e0b] transition-colors text-sm font-medium"
          >
            Instagram
          </a>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#f5f5f5]/60 hover:text-[#f59e0b] transition-colors text-sm font-medium"
          >
            WhatsApp
          </a>
          <a
            href={`https://instagram.com/${INSTAGRAM_HANDLE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#f5f5f5]/60 hover:text-[#f59e0b] transition-colors text-sm font-medium"
          >
            @{INSTAGRAM_HANDLE}
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
