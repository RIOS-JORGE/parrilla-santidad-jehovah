import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from '../lib/constants'

export function WhatsAppBanner() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

  return (
    <section className="bg-[#1a1a1a] text-[#f5f5f5] px-4 py-16 md:py-20">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-black mb-4">
          Hacé tu pedido por WhatsApp
        </h2>

        <p className="text-[#f5f5f5]/70 mb-8 text-lg">
          Escribinos y te armamos tu pedido al instante.
        </p>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-[#f59e0b] text-[#0a0a0a] font-bold text-lg px-10 py-4 hover:bg-[#f59e0b]/90 transition-colors"
        >
          {/* WhatsApp SVG icon */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.002 0C5.376 0 0 5.376 0 12.002c0 2.12.552 4.186 1.6 5.992L0 24l6.184-1.536A11.94 11.94 0 0012.002 24C18.626 24 24 18.624 24 12.002 24 5.376 18.626 0 12.002 0zm7.084 16.997c-.316.89-1.252 1.78-2.06 2.06-.546.188-1.246.28-3.496-.752-2.748-1.26-4.5-4.356-4.638-4.556-.148-.2-1.1-1.472-1.1-2.808s.7-1.996.948-2.276c.248-.28.548-.28.748-.28.2 0 .4 0 .572.004.184.004.428-.068.668.516.252.596.852 2.06.928 2.212.076.152.124.332.024.532-.1.2-.152.32-.3.5-.152.18-.3.328-.448.528-.148.2-.3.416-.128.812.172.396.764 1.26 1.644 2.04 1.128 1.004 2.08 1.316 2.38 1.46.284.136.448.112.612-.072.164-.184.7-.816.888-1.096.188-.28.376-.248.636-.148.26.1 1.644.812 1.928.96.284.148.472.22.544.344.068.124.068.724-.252 1.424z"
            />
          </svg>
          Pedí acá
        </a>
      </div>
    </section>
  )
}
