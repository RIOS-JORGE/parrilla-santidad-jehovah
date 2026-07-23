import { useState, type FormEvent } from 'react'
import { supabase } from '../../lib/supabase'
import type { Category } from '../../lib/types'

interface AdminCategoryFormProps {
  category?: Category
  onSaved: () => void
  onCancel: () => void
}

export function AdminCategoryForm({
  category,
  onSaved,
  onCancel,
}: AdminCategoryFormProps) {
  const [name, setName] = useState(category?.name ?? '')
  const [rank, setRank] = useState(category ? String(category.rank) : '0')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)

    if (!name.trim()) {
      setError('El nombre es obligatorio')
      return
    }

    setSaving(true)

    const handle = name
      .toLowerCase()
      .replace(/[^a-záéíóúñ0-9\s-]/g, '')
      .replace(/\s+/g, '-')

    const payload = {
      name: name.trim(),
      handle,
      rank: Math.round(Number(rank) || 0),
    }

    if (category) {
      const { error: err } = await supabase
        .from('categories')
        .update(payload)
        .eq('id', category.id)

      if (err) {
        setError(err.message)
        setSaving(false)
        return
      }
    } else {
      const { error: err } = await supabase
        .from('categories')
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
      className="bg-brand-surface p-6 flex flex-col gap-4 max-w-md"
    >
      <h3 className="font-bold text-lg uppercase tracking-wide">
        {category ? 'Editar categoría' : 'Nueva categoría'}
      </h3>

      <div>
        <label className="block text-brand-text/70 text-xs uppercase tracking-wider mb-1">
          Nombre *
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoFocus
          className="w-full bg-brand-bg border border-brand-muted p-2 text-sm outline-none focus:border-brand-accent"
        />
      </div>

      <div>
        <label className="block text-brand-text/70 text-xs uppercase tracking-wider mb-1">
          Orden
        </label>
        <input
          type="number"
          value={rank}
          onChange={(e) => setRank(e.target.value)}
          min={0}
          className="w-full bg-brand-bg border border-brand-muted p-2 text-sm outline-none focus:border-brand-accent"
        />
        <p className="text-brand-text/40 text-xs mt-1">
          Número menor = aparece primero en el menú
        </p>
      </div>

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
          {saving ? 'Guardando...' : category ? 'Guardar' : 'Crear'}
        </button>
      </div>
    </form>
  )
}
