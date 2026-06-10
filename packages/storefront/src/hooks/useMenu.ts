import { useState, useEffect } from 'react'
import { fetchCategories, fetchProductsByCategory } from '../lib/api'
import type { MenuCategory } from '../lib/types'

interface UseMenuReturn {
  categories: MenuCategory[]
  loading: boolean
  error: string | null
}

export function useMenu(): UseMenuReturn {
  const [categories, setCategories] = useState<MenuCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        setLoading(true)
        setError(null)

        const cats = await fetchCategories()
        const menuCategories = await Promise.all(
          cats.map(async (cat) => ({
            category: cat,
            products: await fetchProductsByCategory(cat.id),
          })),
        )

        if (!cancelled) {
          setCategories(menuCategories)
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : 'Error al cargar el menú',
          )
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [])

  return { categories, loading, error }
}
