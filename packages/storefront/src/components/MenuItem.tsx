import type { Product } from '../lib/types'
import { useCart } from '../context/CartContext'
import type { CartItem } from '../lib/cart.types'

interface MenuItemProps {
  product: Product
}

export function MenuItem({ product }: MenuItemProps) {
  const formattedPrice = `$${product.price.toLocaleString('es-AR')}`

  return (
    <div className="bg-brand-surface p-4 flex flex-col gap-3 transition-transform duration-200 hover:-translate-y-1">
      {product.thumbnail_url ? (
        <img
          src={product.thumbnail_url}
          alt={product.title}
          loading="lazy"
          className="w-full h-70 object-contain"
        />
      ) : (
        <div className="w-full h-70 bg-brand-muted flex items-center justify-center">
          <span className="text-brand-accent font-bold text-sm uppercase tracking-widest">
            Foto
          </span>
        </div>
      )}

      <div className="flex flex-col gap-1">
        <h4 className="text-brand-text font-bold text-lg uppercase tracking-wide">
          {product.title}
        </h4>
        <p className="text-brand-text/60 text-sm leading-relaxed">
          {product.description}
        </p>
      </div>

      <span className="text-brand-accent font-black text-xl mt-auto">
        {formattedPrice}
      </span>

      <AddToCartControls product={product} />
    </div>
  )
}

function AddToCartControls({ product }: { product: Product }) {
  const { state, addItem, updateQuantity } = useCart()
  const productId = String(product.id)

  const cartItem = state.items.find(
    (item) => item.productId === productId,
  )

  if (!cartItem) {
    return (
      <button
        onClick={() => {
          const item: CartItem = {
            productId,
            title: product.title,
            price: product.price,
            quantity: 1,
          }
          addItem(item)
        }}
        className="w-full mt-1 bg-brand-accent text-black font-bold py-2 text-sm uppercase tracking-wider hover:bg-brand-accent-hover transition-colors"
        aria-label={`Agregar ${product.title} al carrito`}
      >
        Agregar
      </button>
    )
  }

  return (
    <div className="flex items-center justify-between mt-1 bg-brand-muted rounded px-3 py-2">
      <button
        onClick={() => updateQuantity(productId, cartItem.quantity - 1)}
        className="w-8 h-8 rounded-full bg-brand-surface flex items-center justify-center font-bold text-sm hover:bg-brand-accent hover:text-black transition-colors"
        aria-label={`Disminuir cantidad de ${product.title}`}
      >
        −
      </button>
      <span className="font-bold text-brand-text">{cartItem.quantity}</span>
      <button
        onClick={() => updateQuantity(productId, cartItem.quantity + 1)}
        className="w-8 h-8 rounded-full bg-brand-surface flex items-center justify-center font-bold text-sm hover:bg-brand-accent hover:text-black transition-colors"
        aria-label={`Aumentar cantidad de ${product.title}`}
      >
        +
      </button>
    </div>
  )
}
