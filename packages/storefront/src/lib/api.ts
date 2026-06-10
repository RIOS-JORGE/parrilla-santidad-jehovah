import type { MedusaCategory, MedusaProduct } from './types'

const PUBLISHABLE_API_KEY = import.meta.env.VITE_MEDUSA_PUBLISHABLE_KEY || ''

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
    '/api/store/product-categories?fields=*id,name,handle,rank',
  )
  return data.product_categories
}

/**
 * Transform absolute backend URLs to relative so they go through the Vite proxy.
 * Medusa's local file service returns URLs like http://localhost:9000/static/...
 * which break on mobile/other devices. We strip the origin so the browser
 * requests them from the same host as the page.
 */
function sanitizeImageUrl(url?: string | null): string | undefined {
  if (!url) return undefined
  try {
    const parsed = new URL(url)
    if (parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1') {
      return parsed.pathname + parsed.search
    }
  } catch {
    // Not a valid URL, return as-is
  }
  return url
}

export async function fetchProductsByCategory(
  categoryId: string,
): Promise<MedusaProduct[]> {
  const data = await request<ProductsResponse>(
    `/api/store/products?category_id[]=${categoryId}&fields=*variants.prices,title,description,thumbnail,handle`,
  )
  return data.products.map((p) => ({
    ...p,
    thumbnail: sanitizeImageUrl(p.thumbnail),
  }))
}
