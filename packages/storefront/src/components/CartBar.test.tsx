import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { CartProvider } from '../context/CartContext'
import { CartBar } from './CartBar'
import { useEffect, type ReactNode } from 'react'
import { useCart } from '../context/CartContext'
import type { CartItem } from '../lib/cart.types'

function CartSetup({ items }: { items: CartItem[] }) {
  const { addItem } = useCart()
  useEffect(() => {
    items.forEach(addItem)
  }, [])
  return null
}

function wrapper({ children }: { children: ReactNode }) {
  return <CartProvider>{children}</CartProvider>
}

describe('CartBar', () => {
  it('renders nothing when cart is empty', () => {
    const { container } = render(<CartBar />, { wrapper })
    expect(container.textContent).toBe('')
  })

  it('displays item count and total when items are in cart', () => {
    render(
      <>
        <CartSetup
          items={[
            { productId: '1', title: 'La Clásica', price: 5500, quantity: 2 },
          ]}
        />
        <CartBar />
      </>,
      { wrapper },
    )

    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('Ver carrito')).toBeInTheDocument()
  })

  it('displays total price formatted', () => {
    render(
      <>
        <CartSetup
          items={[
            { productId: '1', title: 'Burger', price: 5000, quantity: 1 },
            { productId: '2', title: 'Fries', price: 2000, quantity: 3 },
          ]}
        />
        <CartBar />
      </>,
      { wrapper },
    )

    // Total = 5000*1 + 2000*3 = 11000 → $11.000
    expect(screen.getByText(/\$11\.?000/)).toBeInTheDocument()
  })

  it('calls onOpen callback when clicked', () => {
    const onOpen = vi.fn()

    render(
      <>
        <CartSetup
          items={[
            { productId: '1', title: 'Burger', price: 5000, quantity: 1 },
          ]}
        />
        <CartBar onOpen={onOpen} />
      </>,
      { wrapper },
    )

    fireEvent.click(screen.getByText('Ver carrito'))
    expect(onOpen).toHaveBeenCalledTimes(1)
  })
})
