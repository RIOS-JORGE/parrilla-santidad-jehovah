import { useState, useEffect, type FormEvent } from 'react'
import { supabase } from '../../lib/supabase'
import type { Product, Category } from '../../lib/types'
import { AdminImageUpload } from './AdminImageUpload'

interface AdminProductFormProps {
  product?: Product
  categories: Category[]
  onSaved: () => void
  onCancel: () => void
}

export function AdminProductForm({
  product,
  categories,
  onSaved,
  onCancel,
}: AdminProductFormProps) {
  const [title, setTitle] = useState(product?.title ?? '')
  const [description, setDescription] = useState(product?.description ?? '')
  const [price, setPrice] = useState(product ? String(product.price) : '')
  const [categoryId, setCategoryId] = useState(
    product ? String(product.category_id) : '',
  )
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(
    product?.thumbnail_url ?? null,
  )
  const [isActive, setIsActive] = useState(product?.is_active ?? true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // If there's exactly one category, pre-select it for new products
  useEffect(() => {
    if (!product && categories.length === 1 && !categoryId) {
      setCategoryId(String(categories[0].id))
    }
  }, [categories, product, categoryId])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)

    if (!title.trim()) {
      setError('El título es obligatorio')
      return
    }
    if (!price || isNaN(Number(price)) || Number(price) <= 0) {
      setError('El precio debe ser un número válido')
      return
    }
    if (!categoryId) {
      setError('Seleccioná una categoría')
      return
    }

    setSaving(true)

    const payload = {
      title: title.trim(),
      description: description.trim() || null,
      price: Math.round(Number(price)),
      category_id: Number(categoryId),
      thumbnail_url: thumbnailUrl,
      is_active: isActive,
    }

    if (product) {
      const { error: err } = await supabase
        .from('products')
        .update(payload)
        .eq('id', product.id)

      if (err) {
        setError(err.message)
        setSaving(false)
        return
      }
    } else {
      const { error: err } = await supabase
        .from('products')
        .insert(payload)

      if (err) {
        setError(err.message)
        setSaving(false)
        return
      }
    }

    setSaving(false)
    onSaved()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-brand-surface p-6 flex flex-col gap-4"
    >
      <h3 className="font-bold text-lg uppercase tracking-wide">
        {product ? 'Editar producto' : 'Nuevo producto'}
      </h3>

      <div>
        <label className="block text-brand-text/70 text-xs uppercase tracking-wider mb-1">
          Título *
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full bg-brand-bg border border-brand-muted p-2 text-sm outline-none focus:border-brand-accent"
        />
      </div>

      <div>
        <label className="block text-brand-text/70 text-xs uppercase tracking-wider mb-1">
          Descripción
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full bg-brand-bg border border-brand-muted p-2 text-sm outline-none focus:border-brand-accent resize-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-brand-text/70 text-xs uppercase tracking-wider mb-1">
            Precio (ARS) *
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            min={1}
            className="w-full bg-brand-bg border border-brand-muted p-2 text-sm outline-none focus:border-brand-accent"
          />
        </div>

        <div>
          <label className="block text-brand-text/70 text-xs uppercase tracking-wider mb-1">
            Categoría *
          </label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
            className="w-full bg-brand-bg border border-brand-muted p-2 text-sm outline-none focus:border-brand-accent"
          >
            <option value="">Seleccionar...</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-brand-text/70 text-xs uppercase tracking-wider mb-2">
          Imagen
        </label>
        <AdminImageUpload
          currentUrl={thumbnailUrl}
          onUpload={setThumbnailUrl}
        />
      </div>

      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
          className="accent-brand-accent"
        />
        <span className="text-sm">Producto activo (visible en el menú)</span>
      </label>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <div className="flex gap-3 justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm text-brand-text/50 hover:text-brand-text transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={saving}
          className="bg-brand-accent text-black font-bold px-6 py-2 text-sm uppercase tracking-wider hover:bg-brand-accent-hover transition-colors disabled:opacity-50"
        >
          {saving ? 'Guardando...' : product ? 'Guardar' : 'Crear'}
        </button>
      </div>
    </form>
  )
}
