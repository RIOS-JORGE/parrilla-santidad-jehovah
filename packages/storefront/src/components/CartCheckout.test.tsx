import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CartProvider } from '../context/CartContext'
import { CartCheckout } from './CartCheckout'
import { type ReactNode } from 'react'

function wrapper({ children }: { children: ReactNode }) {
  return <CartProvider>{children}</CartProvider>
}

describe('CartCheckout', () => {
  it('renders payment method selector with two options', () => {
    render(<CartCheckout onClose={vi.fn()} />, { wrapper })

    expect(screen.getByLabelText('Efectivo')).toBeInTheDocument()
    expect(screen.getByLabelText('Transferencia')).toBeInTheDocument()
  })

  it('renders notes textarea', () => {
    render(<CartCheckout onClose={() => {}} />, { wrapper })

    expect(screen.getByLabelText('Notas (opcional)')).toBeInTheDocument()
  })

  it('renders submit button with WhatsApp icon text', () => {
    render(<CartCheckout onClose={() => {}} />, { wrapper })

    expect(screen.getByText(/Enviar pedido por WhatsApp/)).toBeInTheDocument()
  })
})
