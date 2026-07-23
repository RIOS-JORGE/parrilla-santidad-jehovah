import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { AdminProducts } from './AdminProducts'
import { AdminCategories } from './AdminCategories'

type AdminTab = 'products' | 'categories'

export function AdminLayout() {
  const { user, signOut } = useAuth()
  const [tab, setTab] = useState<AdminTab>('products')

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text">
      {/* Header */}
      <header className="bg-brand-surface border-b border-brand-muted">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="font-black text-lg uppercase tracking-wide">
              Admin
            </h1>
            <span className="text-brand-text/50 text-sm">
              {user?.email}
            </span>
          </div>
          <button
            onClick={signOut}
            className="text-sm text-brand-text/50 hover:text-brand-accent transition-colors"
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      {/* Tab navigation */}
      <div className="border-b border-brand-muted">
        <div className="max-w-6xl mx-auto px-4 flex gap-0">
          <button
            onClick={() => setTab('products')}
            className={`px-6 py-3 text-sm uppercase tracking-wider font-bold transition-colors ${
              tab === 'products'
                ? 'text-brand-accent border-b-2 border-brand-accent'
                : 'text-brand-text/50 hover:text-brand-text'
            }`}
          >
            Productos
          </button>
          <button
            onClick={() => setTab('categories')}
            className={`px-6 py-3 text-sm uppercase tracking-wider font-bold transition-colors ${
              tab === 'categories'
                ? 'text-brand-accent border-b-2 border-brand-accent'
                : 'text-brand-text/50 hover:text-brand-text'
            }`}
          >
            Categorías
          </button>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {tab === 'products' ? <AdminProducts /> : <AdminCategories />}
      </main>
    </div>
  )
}
