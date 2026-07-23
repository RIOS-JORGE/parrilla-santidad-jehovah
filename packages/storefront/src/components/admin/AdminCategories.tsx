import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import type { Category } from '../../lib/types'
import { AdminCategoryForm } from './AdminCategoryForm'

export function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [showForm, setShowForm] = useState(false)

  async function load() {
    setLoading(true)
    setError(null)

    const { data, error: err } = await supabase
      .from('categories')
      .select('*')
      .order('rank', { ascending: true })

    if (err) {
      setError(err.message)
    } else {
      setCategories(data ?? [])
    }

    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  async function handleDelete(id: number) {
    // Check if category has products
    const { data: products } = await supabase
      .from('products')
      .select('id', { count: 'exact', head: true })
      .eq('category_id', id)

    if (products && products.length > 0) {
      alert(
        'No se puede eliminar una categoría con productos. Movelos a otra categoría primero.',
      )
      return
    }

    if (!confirm('¿Eliminar esta categoría?')) return

    const { error: err } = await supabase
      .from('categories')
      .delete()
      .eq('id', id)

    if (err) {
      alert(err.message)
      return
    }

    setCategories((prev) => prev.filter((c) => c.id !== id))
  }

  if (loading) {
    return (
      <p className="text-brand-text/50 text-sm">Cargando categorías...</p>
    )
  }

  if (editingId !== null || showForm) {
    const category = editingId !== null
      ? categories.find((c) => c.id === editingId)
      : undefined

    return (
      <AdminCategoryForm
        category={category}
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
          Categorías
        </h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-brand-accent text-black font-bold px-4 py-2 text-sm uppercase tracking-wider hover:bg-brand-accent-hover transition-colors"
        >
          + Nueva
        </button>
      </div>

      {error && (
        <p className="text-red-400 text-sm mb-4">{error}</p>
      )}

      {categories.length === 0 && !error && (
        <p className="text-brand-text/50 text-sm">
          No hay categorías todavía. Creá la primera.
        </p>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-brand-muted text-brand-text/50 text-xs uppercase tracking-wider">
              <th className="text-left py-3 px-2">Nombre</th>
              <th className="text-left py-3 px-2">Handle</th>
              <th className="text-center py-3 px-2">Orden</th>
              <th className="text-right py-3 px-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr
                key={cat.id}
                className="border-b border-brand-muted/50 hover:bg-brand-surface/50"
              >
                <td className="py-3 px-2 font-medium">{cat.name}</td>
                <td className="py-3 px-2 text-brand-text/40 text-xs">
                  {cat.handle}
                </td>
                <td className="py-3 px-2 text-center">{cat.rank}</td>
                <td className="py-3 px-2 text-right">
                  <button
                    onClick={() => setEditingId(cat.id)}
                    className="text-brand-accent hover:underline text-xs mr-3"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="text-red-400 hover:underline text-xs"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
