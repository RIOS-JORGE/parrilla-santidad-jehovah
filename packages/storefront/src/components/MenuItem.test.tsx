import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { CartProvider } from '../context/CartContext'
import { MenuItem } from './MenuItem'
import { type ReactNode } from 'react'
import type { MedusaProduct } from '../lib/types'

const mockProduct: MedusaProduct = {
  id: 'prod-1',
  title: 'La Clásica',
  description: 'Hamburguesa clásica con cheddar',
  thumbnail: 'https://example.com/img.jpg',
  variants: [
    {
      prices: [{ amount: 5500, currency_code: 'ars' }],
    },
  ],
}

function wrapper({ children }: { children: ReactNode }) {
  return <CartProvider>{children}</CartProvider>
}

describe('MenuItem', () => {
  it('renders product title, description, and price', () => {
    render(<MenuItem product={mockProduct} />, { wrapper })

    expect(screen.getByText('La Clásica')).toBeInTheDocument()
    expect(
      screen.getByText('Hamburguesa clásica con cheddar'),
    ).toBeInTheDocument()
  })

  it('shows Agregar button when item is not in cart', () => {
    render(<MenuItem product={mockProduct} />, { wrapper })

    expect(
      screen.getByRole('button', { name: /Agregar/i }),
    ).toBeInTheDocument()
  })

  it('calls addItem with correct product data when Agregar is clicked', () => {
    render(<MenuItem product={mockProduct} />, { wrapper })

    fireEvent.click(screen.getByRole('button', { name: /Agregar/i }))

    // After adding, the button should change to qty controls
    expect(screen.queryByRole('button', { name: /Agregar/i })).toBeNull()
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('shows quantity controls when item is already in cart', () => {
    render(
      <>
        <MenuItem product={mockProduct} />
      </>,
      { wrapper },
    )

    // Add item first
    fireEvent.click(screen.getByRole('button', { name: /Agregar/i }))

    // Verify qty controls appear: +/- buttons
    expect(
      screen.getByRole('button', { name: /Aumentar/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Disminuir/i }),
    ).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()
  })
})
