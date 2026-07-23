import { useState, useEffect } from 'react'
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
import { AuthProvider } from './context/AuthContext'
import { AdminLayout } from './components/admin/AdminLayout'
import { AdminLogin } from './components/admin/AdminLogin'
import { useAuth } from './context/AuthContext'

function AppContent() {
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  return (
    <CartProvider>
      <div className="min-h-screen bg-brand-bg text-brand-text">
        <main>
          <HeroSection />
          <AboutSection />
          <MenuSection />
          <HoursSection />
          <WhatsAppBanner />
          <InstagramSection />
        </main>
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

function AdminApp() {
  const { session, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center">
        <p className="text-brand-text/50 text-sm">Cargando...</p>
      </div>
    )
  }

  if (!session) {
    return <AdminLogin />
  }

  return <AdminLayout />
}

function Router() {
  const [path, setPath] = useState(window.location.pathname)

  useEffect(() => {
    const handlePopState = () => setPath(window.location.pathname)
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  if (path.startsWith('/admin')) {
    return (
      <AuthProvider>
        <AdminApp />
      </AuthProvider>
    )
  }

  return <AppContent />
}

export default function App() {
  return <Router />
}
