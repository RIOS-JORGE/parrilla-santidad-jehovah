import { useCart } from '../context/CartContext'
import { formatPrice } from '../lib/cart'

interface CartBarProps {
  onOpen?: () => void
}

export function CartBar({ onOpen }: CartBarProps) {
  const { totalItems, totalPrice } = useCart()

  if (totalItems === 0) return null

  return (
    <div
      onClick={onOpen}
      className="fixed bottom-0 left-0 right-0 z-50 bg-brand-accent text-black px-4 py-3 pb-[env(safe-area-inset-bottom,16px)] flex items-center justify-between cursor-pointer"
    >
      <span className="font-bold">
        🛒 <span data-testid="item-count">{totalItems}</span> {totalItems === 1 ? 'item' : 'items'}
      </span>
      <span className="font-bold">{formatPrice(totalPrice)}</span>
      <span className="bg-black text-white px-4 py-1.5 rounded font-bold text-sm">
        Ver carrito
      </span>
    </div>
  )
}
