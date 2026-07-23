export type DeliveryMode = 'delivery' | 'takeaway'

export type PaymentMethod = 'efectivo' | 'transferencia'

export interface CartItem {
  productId: string
  title: string
  price: number
  quantity: number
}

export interface CartState {
  items: CartItem[]
  deliveryMode: DeliveryMode
  address: string
  floor?: string
  paymentMethod: PaymentMethod
  notes: string
}
