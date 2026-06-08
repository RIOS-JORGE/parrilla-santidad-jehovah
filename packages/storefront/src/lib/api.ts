import type { MedusaCategory, MedusaProduct } from './types'

const PUBLISHABLE_API_KEY = '' // TODO: configure from env or runtime

async function request<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(endpoint, {
    ...options,
    headers: {
      'x-publishable-api-key': PUBLISHABLE_API_KEY,
      ...options?.headers,
    },
  })

  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`)
  }

  const json = await res.json()
  return json as T
}

interface CategoriesResponse {
  product_categories: MedusaCategory[]
}

interface ProductsResponse {
  products: MedusaProduct[]
}

export async function fetchCategories(): Promise<MedusaCategory[]> {
  const data = await request<CategoriesResponse>(
    '/api/store/product-categories',
  )
  return data.product_categories
}

export async function fetchProductsByCategory(
  categoryId: string,
): Promise<MedusaProduct[]> {
  const data = await request<ProductsResponse>(
    `/api/store/products?category_id[]=${categoryId}`,
  )
  return data.products
}
