import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { CartProvider } from '../context/CartContext'
import { CartSheet } from './CartSheet'
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

describe('CartSheet', () => {
  it('renders nothing when closed', () => {
    render(
      <CartSheet open={false} onClose={() => {}} />,
      { wrapper },
    )
    // Backdrop wrapper exists for animation
    expect(screen.getByTestId('cart-sheet-backdrop')).toBeInTheDocument()
    // But no content is rendered
    expect(screen.queryByText('Tu pedido')).toBeNull()
  })

  it('renders items when open', () => {
    render(
      <>
        <CartSetup
          items={[
            { productId: '1', title: 'La Clásica', price: 5500, quantity: 2 },
            { productId: '2', title: 'Papas Fritas', price: 2000, quantity: 1 },
          ]}
        />
        <CartSheet open={true} onClose={() => {}} />
      </>,
      { wrapper },
    )

    expect(screen.getByText('La Clásica')).toBeInTheDocument()
    expect(screen.getByText('Papas Fritas')).toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn()

    render(
      <>
        <CartSetup
          items={[
            { productId: '1', title: 'Burger', price: 5000, quantity: 1 },
          ]}
        />
        <CartSheet open={true} onClose={onClose} />
      </>,
      { wrapper },
    )

    fireEvent.click(screen.getByLabelText('Cerrar carrito'))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when backdrop is clicked', () => {
    const onClose = vi.fn()

    render(
      <>
        <CartSetup
          items={[
            { productId: '1', title: 'Burger', price: 5000, quantity: 1 },
          ]}
        />
        <CartSheet open={true} onClose={onClose} />
      </>,
      { wrapper },
    )

    // The backdrop has a test id — click it
    fireEvent.click(screen.getByTestId('cart-sheet-backdrop'))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('shows line total for each item', () => {
    render(
      <>
        <CartSetup
          items={[
            { productId: '1', title: 'Burger', price: 5000, quantity: 2 },
          ]}
        />
        <CartSheet open={true} onClose={() => {}} />
      </>,
      { wrapper },
    )

    // 5000 * 2 = $10.000
    const lineTotal = screen.getByTestId('line-total-1')
    expect(lineTotal).toHaveTextContent(/\$10\.?000/)
  })
})
