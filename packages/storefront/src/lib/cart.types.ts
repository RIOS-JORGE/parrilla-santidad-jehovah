export type PaymentMethod = 'efectivo' | 'transferencia'

export interface CartItem {
  productId: string
  title: string
  price: number
  quantity: number
}

export interface CartState {
  items: CartItem[]
  paymentMethod: PaymentMethod
  notes: string
}
