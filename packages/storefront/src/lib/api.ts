import { supabase } from './supabase'
import type { Category, Product } from './types'

export async function fetchCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('rank', { ascending: true })

  if (error) throw new Error(error.message)
  return data ?? []
}

export async function fetchProductsByCategory(
  categoryId: number,
): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category_id', categoryId)
    .eq('is_active', true)
    .order('id', { ascending: true })

  if (error) throw new Error(error.message)
  return data ?? []
}
