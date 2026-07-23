import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import type { Product, Category } from '../../lib/types'
import { AdminProductForm } from './AdminProductForm'

export function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [showForm, setShowForm] = useState(false)

  async function load() {
    setLoading(true)
    setError(null)

    const [prodResult, catResult] = await Promise.all([
      supabase
        .from('products')
        .select('*')
        .order('id', { ascending: true }),
      supabase
        .from('categories')
        .select('*')
        .order('name', { ascending: true }),
    ])

    if (prodResult.error) {
      setError(prodResult.error.message)
    } else {
      setProducts(prodResult.data ?? [])
    }

    if (catResult.error) {
      setError(catResult.error.message)
    } else {
      setCategories(catResult.data ?? [])
    }

    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  async function handleDelete(id: number) {
    if (!confirm('¿Eliminar este producto?')) return

    const { error: err } = await supabase
      .from('products')
      .delete()
      .eq('id', id)

    if (err) {
      alert(err.message)
      return
    }

    setProducts((prev) => prev.filter((p) => p.id !== id))
  }

  async function handleToggleActive(product: Product) {
    const { error: err } = await supabase
      .from('products')
      .update({ is_active: !product.is_active })
      .eq('id', product.id)

    if (err) {
      alert(err.message)
      return
    }

    setProducts((prev) =>
      prev.map((p) =>
        p.id === product.id ? { ...p, is_active: !p.is_active } : p,
      ),
    )
  }

  if (loading) {
    return (
      <p className="text-brand-text/50 text-sm">Cargando productos...</p>
    )
  }

  if (editingId !== null || showForm) {
    const product = editingId !== null
      ? products.find((p) => p.id === editingId)
      : undefined

    return (
      <AdminProductForm
        product={product}
        categories={categories}
        onSaved={() => {
          setEditingId(null)
          setShowForm(false)
          load()
        }}
        onCancel={() => {
          setEditingId(null)
          setShowForm(false)
        }}
      />
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-bold text-xl uppercase tracking-wide">
          Productos
        </h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-brand-accent text-black font-bold px-4 py-2 text-sm uppercase tracking-wider hover:bg-brand-accent-hover transition-colors"
        >
          + Nuevo
        </button>
      </div>

      {error && (
        <p className="text-red-400 text-sm mb-4">{error}</p>
      )}

      {products.length === 0 && !error && (
        <p className="text-brand-text/50 text-sm">
          No hay productos todavía. Creá el primero.
        </p>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-brand-muted text-brand-text/50 text-xs uppercase tracking-wider">
              <th className="text-left py-3 px-2">Título</th>
              <th className="text-left py-3 px-2">Categoría</th>
              <th className="text-right py-3 px-2">Precio</th>
              <th className="text-center py-3 px-2">Activo</th>
              <th className="text-right py-3 px-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              const cat = categories.find(
                (c) => c.id === product.category_id,
              )
              return (
                <tr
                  key={product.id}
                  className="border-b border-brand-muted/50 hover:bg-brand-surface/50"
                >
                  <td className="py-3 px-2 font-medium">
                    <div className="flex items-center gap-3">
                      {product.thumbnail_url && (
                        <img
                          src={product.thumbnail_url}
                          alt=""
                          className="w-8 h-8 object-cover rounded"
                        />
                      )}
                      {product.title}
                    </div>
                  </td>
                  <td className="py-3 px-2 text-brand-text/60">
                    {cat?.name ?? '—'}
                  </td>
                  <td className="py-3 px-2 text-right">
                    ${product.price.toLocaleString('es-AR')}
                  </td>
                  <td className="py-3 px-2 text-center">
                    <button
                      onClick={() => handleToggleActive(product)}
                      className={`text-xs px-2 py-1 rounded font-bold uppercase tracking-wider ${
                        product.is_active
                          ? 'bg-green-900/30 text-green-400'
                          : 'bg-red-900/30 text-red-400'
                      }`}
                    >
                      {product.is_active ? 'Sí' : 'No'}
                    </button>
                  </td>
                  <td className="py-3 px-2 text-right">
                    <button
                      onClick={() => setEditingId(product.id)}
                      className="text-brand-accent hover:underline text-xs mr-3"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-400 hover:underline text-xs"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
