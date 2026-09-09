import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { CartProvider } from '../context/CartContext'
import { CartCheckout } from './CartCheckout'
import { type ReactNode } from 'react'

function wrapper({ children }: { children: ReactNode }) {
  return <CartProvider>{children}</CartProvider>
}

describe('CartCheckout', () => {
  it('renders delivery/takeaway toggle with both options', () => {
    render(<CartCheckout onClose={() => {}} />, { wrapper })

    expect(screen.getByText('Delivery')).toBeInTheDocument()
    expect(screen.getByText('Take away')).toBeInTheDocument()
  })

  it('shows address input when delivery is selected', () => {
    render(<CartCheckout onClose={() => {}} />, { wrapper })

    // Delivery is default mode, address should be visible
    expect(screen.getByLabelText('Dirección')).toBeInTheDocument()
  })

  it('shows floor/apt optional input', () => {
    render(<CartCheckout onClose={() => {}} />, { wrapper })

    expect(screen.getByLabelText('Piso / Dpto (opcional)')).toBeInTheDocument()
  })

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

  it('calls onClose after submitting', () => {
    const onClose = vi.fn()

    render(<CartCheckout onClose={onClose} />, { wrapper })

    // Set address to avoid validation error
    const addressInput = screen.getByLabelText('Dirección')
    fireEvent.change(addressInput, { target: { value: 'Calle 123' } })

    fireEvent.click(screen.getByText(/Enviar pedido por WhatsApp/))

    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
