import { HeroSection } from './components/HeroSection'
import { AboutSection } from './components/AboutSection'
import { MenuSection } from './components/MenuSection'
import { HoursSection } from './components/HoursSection'
import { WhatsAppBanner } from './components/WhatsAppBanner'
import { InstagramSection } from './components/InstagramSection'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-text">
      <HeroSection />
      <AboutSection />
      <MenuSection />
      <HoursSection />
      <WhatsAppBanner />
      <InstagramSection />
      <Footer />
    </div>
  )
}
