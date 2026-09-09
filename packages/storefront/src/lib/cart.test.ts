import { describe, it, expect } from 'vitest'
import {
  formatPrice,
  calculateTotal,
  formatCartMessage,
  buildWhatsAppUrl,
} from './cart'
import type { CartItem, CartState } from './cart.types'

describe('formatPrice', () => {
  it('formats amount with thousands separator', () => {
    expect(formatPrice(11000)).toBe('$11.000')
  })

  it('formats zero', () => {
    expect(formatPrice(0)).toBe('$0')
  })

  it('formats small amounts without separator', () => {
    expect(formatPrice(500)).toBe('$500')
  })
})

describe('calculateTotal', () => {
  it('returns 0 for empty cart', () => {
    expect(calculateTotal([])).toBe(0)
  })

  it('sums price × quantity for single item', () => {
    const items: CartItem[] = [
      { productId: '1', title: 'Burger', price: 5000, quantity: 2 },
    ]
    expect(calculateTotal(items)).toBe(10000)
  })

  it('sums multiple items with different prices and quantities', () => {
    const items: CartItem[] = [
      { productId: '1', title: 'Burger', price: 5000, quantity: 2 },
      { productId: '2', title: 'Fries', price: 2000, quantity: 3 },
    ]
    expect(calculateTotal(items)).toBe(16000)
  })
})

describe('formatCartMessage', () => {
  const baseState: CartState = {
    items: [],
    paymentMethod: 'efectivo',
    notes: '',
  }

  it('includes header, item lines, and total', () => {
    const state: CartState = {
      ...baseState,
      items: [
        { productId: '1', title: 'La Clásica', price: 5500, quantity: 2 },
      ],
    }
    const msg = formatCartMessage(state)

    expect(msg).toContain('🍔 Pedido - Parrilla Santidad a Jehovah')
    expect(msg).toContain('2x La Clásica - $5.500')
    expect(msg).toContain('Total: $11.000')
  })

  it('always includes takeaway location', () => {
    const state: CartState = {
      ...baseState,
      items: [
        { productId: '1', title: 'Burger', price: 5000, quantity: 1 },
      ],
    }
    const msg = formatCartMessage(state)

    expect(msg).toContain('📍 Takeaway')
  })

  it('includes payment method label', () => {
    const state: CartState = {
      ...baseState,
      items: [
        { productId: '1', title: 'Burger', price: 5000, quantity: 1 },
      ],
      paymentMethod: 'transferencia',
    }
    const msg = formatCartMessage(state)

    expect(msg).toContain('💳 Pago: Transferencia')
  })

  it('shows "Sin notas" when notes are empty', () => {
    const state: CartState = {
      ...baseState,
      items: [
        { productId: '1', title: 'Burger', price: 5000, quantity: 1 },
      ],
    }
    const msg = formatCartMessage(state)

    expect(msg).toContain('📝 Sin notas')
  })

  it('includes notes when provided', () => {
    const state: CartState = {
      ...baseState,
      items: [
        { productId: '1', title: 'Burger', price: 5000, quantity: 1 },
      ],
      notes: 'Sin cebolla, por favor',
    }
    const msg = formatCartMessage(state)

    expect(msg).toContain('📝 Sin cebolla, por favor')
  })

  it('truncates message at 2048 chars', () => {
    const items: CartItem[] = Array.from({ length: 60 }, (_, i) => ({
      productId: String(i),
      title: `Producto con descripción super larga para generar un mensaje enorme número ${i}`,
      price: 1000,
      quantity: 1,
    }))
    const state: CartState = {
      ...baseState,
      items,
      notes: 'Nota '.repeat(200),
    }
    const msg = formatCartMessage(state)

    expect(msg.length).toBeLessThanOrEqual(2048)
  })
})

describe('buildWhatsAppUrl', () => {
  it('builds valid wa.me URL with encoded message', () => {
    const msg = 'Hola mundo'
    const url = buildWhatsAppUrl(msg, '5491111111111')

    expect(url).toBe('https://wa.me/5491111111111?text=Hola%20mundo')
  })

  it('encodes special characters', () => {
    const msg = 'ñandú & café ¿?'
    const url = buildWhatsAppUrl(msg, '5491111111111')

    expect(url).toContain(encodeURIComponent(msg))
    expect(url).not.toContain('ñ')
    expect(url).not.toContain('¿')
  })
})
