import type { MedusaProduct } from '../lib/types'
import { useCart } from '../context/CartContext'
import type { CartItem } from '../lib/cart.types'

interface MenuItemProps {
  product: MedusaProduct
}

export function MenuItem({ product }: MenuItemProps) {
  const price = product.variants[0]?.prices[0]
  const formattedPrice = price
    ? `$${price.amount.toLocaleString('es-AR')}`
    : '—'

  return (
    <div className="bg-brand-surface p-4 flex flex-col gap-3 transition-transform duration-200 hover:-translate-y-1">
      {product.thumbnail ? (
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-40 object-cover"
        />
      ) : (
        <div className="w-full h-40 bg-brand-muted flex items-center justify-center">
          <span className="text-brand-accent font-bold text-sm uppercase tracking-widest">
            Foto
          </span>
        </div>
      )}

      <div className="flex flex-col gap-1">
        <h3 className="text-brand-text font-bold text-lg uppercase tracking-wide">
          {product.title}
        </h3>
        <p className="text-brand-text/60 text-sm leading-relaxed">
          {product.description}
        </p>
      </div>

      <span className="text-brand-accent font-black text-xl mt-auto">
        {formattedPrice}
      </span>

      <AddToCartControls product={product} priceAmount={price?.amount ?? 0} />
    </div>
  )
}

function AddToCartControls({
  product,
  priceAmount,
}: {
  product: MedusaProduct
  priceAmount: number
}) {
  const { state, addItem, updateQuantity } = useCart()

  const cartItem = state.items.find(
    (item) => item.productId === product.id,
  )

  if (!cartItem) {
    return (
      <button
        onClick={() => {
          const item: CartItem = {
            productId: product.id,
            title: product.title,
            price: priceAmount,
            quantity: 1,
          }
          addItem(item)
        }}
        className="w-full mt-1 bg-brand-accent text-black font-bold py-2 rounded text-sm uppercase tracking-wider hover:bg-brand-accent-hover transition-colors"
        aria-label={`Agregar ${product.title} al carrito`}
      >
        Agregar
      </button>
    )
  }

  return (
    <div className="flex items-center justify-between mt-1 bg-brand-muted rounded px-3 py-2">
      <button
        onClick={() => updateQuantity(product.id, cartItem.quantity - 1)}
        className="w-8 h-8 rounded-full bg-brand-surface flex items-center justify-center font-bold text-sm hover:bg-brand-accent hover:text-black transition-colors"
        aria-label={`Disminuir cantidad de ${product.title}`}
      >
        −
      </button>
      <span className="font-bold text-brand-text">{cartItem.quantity}</span>
      <button
        onClick={() => updateQuantity(product.id, cartItem.quantity + 1)}
        className="w-8 h-8 rounded-full bg-brand-surface flex items-center justify-center font-bold text-sm hover:bg-brand-accent hover:text-black transition-colors"
        aria-label={`Aumentar cantidad de ${product.title}`}
      >
        +
      </button>
    </div>
  )
}
