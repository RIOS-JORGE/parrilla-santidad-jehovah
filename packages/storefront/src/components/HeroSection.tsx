import {
  WHATSAPP_NUMBER,
  WHATSAPP_MESSAGE,
  STORE_NAME,
  STORE_DESCRIPTION,
} from '../lib/constants'

export function HeroSection() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-[#f5f5f5] px-4">
      <div className="text-center max-w-2xl">
        {/* Logo placeholder */}
        <div className="w-28 h-28 mx-auto mb-8 bg-[#1a1a1a] flex items-center justify-center">
          <span className="text-3xl font-black text-[#f59e0b] tracking-widest">
            LOGO
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tight">
          {STORE_NAME}
        </h1>

        <p className="text-lg md:text-xl text-[#f5f5f5]/70 mb-10 max-w-lg mx-auto">
          {STORE_DESCRIPTION}
        </p>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-[#f59e0b] text-[#0a0a0a] font-bold text-lg px-10 py-4 hover:bg-[#f59e0b]/90 transition-colors"
        >
          Pedí por WhatsApp
        </a>
      </div>
    </section>
  )
}
