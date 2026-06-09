import { useState } from 'react'
import { HeroSection } from './components/HeroSection'
import { AboutSection } from './components/AboutSection'
import { MenuSection } from './components/MenuSection'
import { HoursSection } from './components/HoursSection'
import { WhatsAppBanner } from './components/WhatsAppBanner'
import { InstagramSection } from './components/InstagramSection'
import { Footer } from './components/Footer'
import { CartProvider } from './context/CartContext'
import { CartBar } from './components/CartBar'
import { CartSheet } from './components/CartSheet'

export default function App() {
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  return (
    <CartProvider>
      <div className="min-h-screen bg-brand-bg text-brand-text">
        <HeroSection />
        <AboutSection />
        <MenuSection />
        <HoursSection />
        <WhatsAppBanner />
        <InstagramSection />
        <Footer />
        <CartBar onOpen={() => setIsSheetOpen(true)} />
        <CartSheet
          open={isSheetOpen}
          onClose={() => setIsSheetOpen(false)}
        />
      </div>
    </CartProvider>
  )
}
