import {
  WHATSAPP_NUMBER,
  WHATSAPP_MESSAGE,
  STORE_NAME,
  STORE_DESCRIPTION,
} from '../lib/constants'

import logo from '../assets/695182834_18106716910781504_6998175745821249650_n.jpg'

export function HeroSection() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

  return (
    <section className="min-h-screen flex items-center justify-center bg-brand-bg text-brand-text px-4">
      <div className="text-center max-w-2xl">
        {/* Logo placeholder */}
        <div className="w-50 h-50 rounded-[50%] mx-auto mb-8 bg-brand-surface flex items-center justify-center">
          <img src={logo} alt={`${STORE_NAME} Logo`} className="w-50 h-50" loading="lazy" />
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-7xl font-black mb-4 leading-tight">
          {STORE_NAME}
        </h1>

        <p className="text-lg md:text-xl text-brand-text/70 mb-10 max-w-lg mx-auto">
          {STORE_DESCRIPTION}
        </p>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-brand-accent text-brand-bg font-bold text-lg px-10 py-4 hover:bg-brand-accent/90 transition-colors"
        >
          Pedí por WhatsApp
        </a>
      </div>
    </section>
  )
}
