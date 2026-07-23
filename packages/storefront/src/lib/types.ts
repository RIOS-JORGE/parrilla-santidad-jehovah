export interface Category {
  id: number
  name: string
  handle: string
  rank: number
  created_at: string
}

export interface Product {
  id: number
  category_id: number
  title: string
  description: string | null
  price: number
  thumbnail_url: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface MenuCategory {
  category: Category
  products: Product[]
}
