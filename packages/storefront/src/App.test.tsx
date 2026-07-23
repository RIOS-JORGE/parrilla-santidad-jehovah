import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import App from './App'

vi.mock('./lib/api', () => ({
  fetchCategories: vi.fn(),
  fetchProductsByCategory: vi.fn(),
}))

import { fetchCategories, fetchProductsByCategory } from './lib/api'

describe('App integration', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    vi.mocked(fetchCategories).mockResolvedValue([
      { id: 1, name: 'Hamburguesas', handle: 'hamburguesas', rank: 0, created_at: '' },
    ])

    vi.mocked(fetchProductsByCategory).mockResolvedValue([
      {
        id: 1,
        category_id: 1,
        title: 'La Clásica',
        description: 'Hamburguesa clásica con cheddar',
        price: 5500,
        thumbnail_url: null,
        is_active: true,
        created_at: '',
        updated_at: '',
      },
    ])
  })

  it('renders main sections without crashing', async () => {
    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('La Clásica')).toBeInTheDocument()
    })

    expect(screen.getByText('Nuestro Menú')).toBeInTheDocument()
  })

  it('shows CartBar after adding an item from menu', async () => {
    render(<App />)

    // Wait for menu to load
    await waitFor(() => {
      expect(screen.getByText('La Clásica')).toBeInTheDocument()
    })

    // CartBar should NOT be visible initially (no items)
    expect(screen.queryByText('Ver carrito')).toBeNull()

    // Click "Agregar" button on the menu item
    const addButton = screen.getByRole('button', { name: /Agregar/i })
    fireEvent.click(addButton)

    // CartBar should now be visible with "Ver carrito"
    expect(screen.getByText('Ver carrito')).toBeInTheDocument()
  })

  it('opens CartSheet when CartBar is clicked', async () => {
    render(<App />)

    // Wait for menu to load
    await waitFor(() => {
      expect(screen.getByText('La Clásica')).toBeInTheDocument()
    })

    // Add item
    fireEvent.click(screen.getByRole('button', { name: /Agregar/i }))

    // CartSheet should NOT be open initially
    expect(screen.queryByText('Tu pedido')).toBeNull()

    // Click "Ver carrito" on CartBar
    fireEvent.click(screen.getByText('Ver carrito'))

    // CartSheet should now be open
    expect(screen.getByText('Tu pedido')).toBeInTheDocument()
  })
})
