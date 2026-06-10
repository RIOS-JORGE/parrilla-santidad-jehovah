import { useCart } from '../context/CartContext'
import { formatPrice } from '../lib/cart'
import { CartCheckout } from './CartCheckout'

interface CartSheetProps {
  open: boolean
  onClose: () => void
}

export function CartSheet({ open, onClose }: CartSheetProps) {
  const { state, updateQuantity, totalPrice } = useCart()

  return (
    <div
      className={`fixed inset-0 z-50 flex items-end transition-all duration-300 ${
        open ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
    >
      {/* Backdrop */}
      <div
        data-testid="cart-sheet-backdrop"
        className={`fixed inset-0 transition-opacity duration-300 ${
          open ? 'bg-black/50 opacity-100' : 'bg-black/0 opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Sheet panel */}
      <div
        data-testid="cart-sheet-panel"
        className={`relative z-10 w-full bg-brand-surface text-brand-text rounded-t-2xl max-h-[85vh] flex flex-col transition-transform duration-300 ${
          open ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        {open && (
          <>
            {/* Header (fixed) */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-brand-muted shrink-0">
              <h2 className="text-lg font-bold uppercase tracking-wide">
                Tu pedido
              </h2>
              <button
                onClick={onClose}
                aria-label="Cerrar carrito"
                className="text-brand-text/60 hover:text-brand-text text-2xl leading-none"
              >
                ✕
              </button>
            </div>

            {/* Scrollable content: items + total + checkout */}
            <div className="flex-1 overflow-y-auto px-4 py-2">
              {/* Item list */}
              {state.items.length === 0 && (
                <p className="text-brand-text/60 text-center py-8">
                  No hay items en tu carrito
                </p>
              )}

              {state.items.map((item) => (
                <div
                  key={item.productId}
                  className="flex items-center justify-between py-3 border-b border-brand-muted/50 last:border-0"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">
                      {item.title}
                    </p>
                    <p className="text-brand-text/60 text-xs">
                      {formatPrice(item.price)} c/u
                    </p>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-2 ml-3">
                    <button
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity - 1)
                      }
                      className="w-8 h-8 rounded-full bg-brand-muted flex items-center justify-center font-bold text-sm hover:bg-brand-accent hover:text-black transition-colors"
                      aria-label={`Disminuir cantidad de ${item.title}`}
                    >
                      −
                    </button>
                    <span
                      className="w-6 text-center font-bold"
                      data-testid={`qty-${item.productId}`}
                    >
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity + 1)
                      }
                      className="w-8 h-8 rounded-full bg-brand-muted flex items-center justify-center font-bold text-sm hover:bg-brand-accent hover:text-black transition-colors"
                      aria-label={`Aumentar cantidad de ${item.title}`}
                    >
                      +
                    </button>
                  </div>

                  <span
                    className="font-bold text-sm ml-4 w-16 text-right"
                    data-testid={`line-total-${item.productId}`}
                  >
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}

              {/* Total */}
              <div className="mt-2 pt-3 border-t border-brand-muted flex items-center justify-between bg-brand-surface sticky bottom-0">
                <span className="font-bold uppercase text-sm">Total</span>
                <span className="font-black text-lg text-brand-accent">
                  {formatPrice(totalPrice)}
                </span>
              </div>

              {/* Checkout form */}
              <div className="mt-4 pb-4">
                <CartCheckout onClose={onClose} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
