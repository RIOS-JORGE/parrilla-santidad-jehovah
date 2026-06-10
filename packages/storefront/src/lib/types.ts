export interface MedusaCategory {
  id: string
  name: string
  handle: string
  rank?: number
}

export interface MedusaPrice {
  amount: number
  currency_code: string
}

export interface MedusaProductVariant {
  prices: MedusaPrice[]
}

export interface MedusaProduct {
  id: string
  title: string
  description: string
  thumbnail?: string | null
  variants: MedusaProductVariant[]
}

export interface MenuCategory {
  category: MedusaCategory
  products: MedusaProduct[]
}
