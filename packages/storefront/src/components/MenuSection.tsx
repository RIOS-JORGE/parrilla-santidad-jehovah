import { useMenu } from '../hooks/useMenu'
import { CategoryGroup } from './CategoryGroup'

function SkeletonCard() {
  return (
    <div className="bg-brand-surface p-4 animate-pulse">
      <div className="w-full h-40 bg-brand-muted mb-3" />
      <div className="h-5 bg-brand-muted w-3/4 mb-2" />
      <div className="h-4 bg-brand-muted w-full mb-1" />
      <div className="h-4 bg-brand-muted w-2/3 mb-3" />
      <div className="h-6 bg-brand-muted w-1/3" />
    </div>
  )
}

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}

export function MenuSection() {
  const { categories, loading, error } = useMenu()

  return (
    <section className="bg-brand-bg text-brand-text px-4 py-16 md:py-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black uppercase mb-12 tracking-tight">
          Nuestro Menú
        </h2>

        {loading && <SkeletonGrid />}

        {error && (
          <p className="text-brand-text/60 text-lg text-center py-12">
            Menú no disponible por el momento
          </p>
        )}

        {!loading && !error && categories.length === 0 && (
          <p className="text-brand-text/60 text-lg text-center py-12">
            No hay productos disponibles
          </p>
        )}

        {!loading && !error && categories.length > 0 && (
          <div>
            {categories.map((cat) => (
              <CategoryGroup key={cat.category.id} category={cat} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
