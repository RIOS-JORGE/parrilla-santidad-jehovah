import {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
  useMemo,
  useCallback,
} from 'react'
import type { CartState, CartItem } from '../lib/cart.types'
import { calculateTotal, formatCartMessage, buildWhatsAppUrl } from '../lib/cart'
import { WHATSAPP_NUMBER } from '../lib/constants'

// ── Actions ──────────────────────────────────────────────────────────────

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: { productId: string } }
  | { type: 'UPDATE_QTY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | {
      type: 'UPDATE_DELIVERY_INFO'
      payload: Partial<
        Pick<CartState, 'deliveryMode' | 'address' | 'floor' | 'paymentMethod' | 'notes'>
      >
    }

// ── Initial state ────────────────────────────────────────────────────────

const initialState: CartState = {
  items: [],
  deliveryMode: 'delivery',
  address: '',
  floor: '',
  paymentMethod: 'efectivo',
  notes: '',
}

// ── Reducer ──────────────────────────────────────────────────────────────

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(
        (item) => item.productId === action.payload.productId,
      )
      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.productId === action.payload.productId
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item,
          ),
        }
      }
      return { ...state, items: [...state.items, action.payload] }
    }

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(
          (item) => item.productId !== action.payload.productId,
        ),
      }

    case 'UPDATE_QTY': {
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(
            (item) => item.productId !== action.payload.productId,
          ),
        }
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.productId === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item,
        ),
      }
    }

    case 'CLEAR_CART':
      return { ...initialState }

    case 'UPDATE_DELIVERY_INFO':
      return { ...state, ...action.payload }

    default:
      return state
  }
}

// ── Context ──────────────────────────────────────────────────────────────

interface CartContextValue {
  state: CartState
  addItem: (item: CartItem) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  updateDeliveryInfo: (
    info: Partial<
      Pick<
        CartState,
        'deliveryMode' | 'address' | 'floor' | 'paymentMethod' | 'notes'
      >
    >,
  ) => void
  totalItems: number
  totalPrice: number
  sendToWhatsApp: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

// ── Provider ─────────────────────────────────────────────────────────────

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  const addItem = useCallback(
    (item: CartItem) => dispatch({ type: 'ADD_ITEM', payload: item }),
    [],
  )
  const removeItem = useCallback(
    (productId: string) =>
      dispatch({ type: 'REMOVE_ITEM', payload: { productId } }),
    [],
  )
  const updateQuantity = useCallback(
    (productId: string, quantity: number) =>
      dispatch({ type: 'UPDATE_QTY', payload: { productId, quantity } }),
    [],
  )
  const clearCart = useCallback(
    () => dispatch({ type: 'CLEAR_CART' }),
    [],
  )
  const updateDeliveryInfo = useCallback(
    (
      info: Partial<
        Pick<
          CartState,
          'deliveryMode' | 'address' | 'floor' | 'paymentMethod' | 'notes'
        >
      >,
    ) => dispatch({ type: 'UPDATE_DELIVERY_INFO', payload: info }),
    [],
  )

  const totalItems = useMemo(
    () => state.items.reduce((sum, item) => sum + item.quantity, 0),
    [state.items],
  )
  const totalPrice = useMemo(
    () => calculateTotal(state.items),
    [state.items],
  )

  const sendToWhatsApp = useCallback(() => {
    const message = formatCartMessage(state)
    const url = buildWhatsAppUrl(message, WHATSAPP_NUMBER)
    window.open(url, '_blank')
  }, [state])

  const value = useMemo<CartContextValue>(
    () => ({
      state,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      updateDeliveryInfo,
      totalItems,
      totalPrice,
      sendToWhatsApp,
    }),
    [
      state,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      updateDeliveryInfo,
      totalItems,
      totalPrice,
      sendToWhatsApp,
    ],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// ── Hook ─────────────────────────────────────────────────────────────────

export function useCart(): CartContextValue {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
