import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { CartProvider, useCart } from './CartContext'
import type { CartItem } from '../lib/cart.types'

describe('CartContext', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('starts with empty cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider })

    expect(result.current.state.items).toEqual([])
    expect(result.current.totalItems).toBe(0)
    expect(result.current.totalPrice).toBe(0)
  })

  it('adds a new item to cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider })

    act(() => {
      result.current.addItem({
        productId: '1',
        title: 'La Clásica',
        price: 5500,
        quantity: 1,
      })
    })

    expect(result.current.state.items).toHaveLength(1)
    expect(result.current.state.items[0]).toEqual({
      productId: '1',
      title: 'La Clásica',
      price: 5500,
      quantity: 1,
    })
    expect(result.current.totalItems).toBe(1)
    expect(result.current.totalPrice).toBe(5500)
  })

  it('increments quantity when adding an existing item', () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider })
    const item: CartItem = {
      productId: '1',
      title: 'La Clásica',
      price: 5500,
      quantity: 1,
    }

    act(() => {
      result.current.addItem(item)
    })
    act(() => {
      result.current.addItem({ ...item, quantity: 2 })
    })

    expect(result.current.state.items).toHaveLength(1)
    expect(result.current.state.items[0].quantity).toBe(3)
    expect(result.current.totalItems).toBe(3)
    expect(result.current.totalPrice).toBe(16500)
  })

  it('removes an item by productId', () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider })

    act(() => {
      result.current.addItem({
        productId: '1',
        title: 'Burger',
        price: 5000,
        quantity: 1,
      })
      result.current.addItem({
        productId: '2',
        title: 'Fries',
        price: 2000,
        quantity: 1,
      })
    })
    act(() => {
      result.current.removeItem('1')
    })

    expect(result.current.state.items).toHaveLength(1)
    expect(result.current.state.items[0].productId).toBe('2')
    expect(result.current.totalItems).toBe(1)
    expect(result.current.totalPrice).toBe(2000)
  })

  it('updates quantity for an item', () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider })

    act(() => {
      result.current.addItem({
        productId: '1',
        title: 'Burger',
        price: 5000,
        quantity: 1,
      })
    })
    act(() => {
      result.current.updateQuantity('1', 5)
    })

    expect(result.current.state.items[0].quantity).toBe(5)
    expect(result.current.totalItems).toBe(5)
    expect(result.current.totalPrice).toBe(25000)
  })

  it('removes item when quantity is set to 0', () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider })

    act(() => {
      result.current.addItem({
        productId: '1',
        title: 'Burger',
        price: 5000,
        quantity: 1,
      })
    })
    act(() => {
      result.current.updateQuantity('1', 0)
    })

    expect(result.current.state.items).toHaveLength(0)
    expect(result.current.totalItems).toBe(0)
    expect(result.current.totalPrice).toBe(0)
  })

  it('removes item when quantity is set to negative', () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider })

    act(() => {
      result.current.addItem({
        productId: '1',
        title: 'Burger',
        price: 5000,
        quantity: 1,
      })
    })
    act(() => {
      result.current.updateQuantity('1', -1)
    })

    expect(result.current.state.items).toHaveLength(0)
  })

  it('clears entire cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider })

    act(() => {
      result.current.addItem({
        productId: '1',
        title: 'Burger',
        price: 5000,
        quantity: 2,
      })
      result.current.addItem({
        productId: '2',
        title: 'Fries',
        price: 2000,
        quantity: 3,
      })
    })
    act(() => {
      result.current.clearCart()
    })

    expect(result.current.state.items).toEqual([])
    expect(result.current.totalItems).toBe(0)
    expect(result.current.totalPrice).toBe(0)
  })

  it('updates payment method and notes', () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider })

    act(() => {
      result.current.updateDeliveryInfo({
        paymentMethod: 'transferencia',
        notes: 'Gracias',
      })
    })

    expect(result.current.state.paymentMethod).toBe('transferencia')
    expect(result.current.state.notes).toBe('Gracias')
  })

  it('sendToWhatsApp builds URL and opens window', () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider })
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null)

    act(() => {
      result.current.addItem({
        productId: '1',
        title: 'Burger',
        price: 5000,
        quantity: 1,
      })
    })
    act(() => {
      result.current.sendToWhatsApp()
    })

    expect(openSpy).toHaveBeenCalledTimes(1)
    const url = openSpy.mock.calls[0][0] as string
    expect(url).toMatch(/^https:\/\/wa\.me\/\d+\?text=/)
    expect(decodeURIComponent(url)).toContain('🍔 Pedido - Parrilla Santidad a Jehovah')
    expect(decodeURIComponent(url)).toContain('📍 Takeaway')
    expect(decodeURIComponent(url)).toContain('💳 Pago: Efectivo')
  })

  it('throws when useCart is used outside CartProvider', () => {
    expect(() => {
      renderHook(() => useCart())
    }).toThrow('useCart must be used within a CartProvider')
  })
})
