import type { MedusaProduct } from '../lib/types'

interface MenuItemProps {
  product: MedusaProduct
}

export function MenuItem({ product }: MenuItemProps) {
  const price = product.variants[0]?.prices[0]
  const formattedPrice = price
    ? `$${price.amount.toLocaleString('es-AR')}`
    : '—'

  return (
    <div className="bg-[#1a1a1a] p-4 flex flex-col gap-3 transition-transform duration-200 hover:-translate-y-1">
      {product.thumbnail ? (
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-40 object-cover"
        />
      ) : (
        <div className="w-full h-40 bg-[#2a2a2a] flex items-center justify-center">
          <span className="text-[#f59e0b] font-bold text-sm uppercase tracking-widest">
            Foto
          </span>
        </div>
      )}

      <div className="flex flex-col gap-1">
        <h3 className="text-[#f5f5f5] font-bold text-lg uppercase tracking-wide">
          {product.title}
        </h3>
        <p className="text-[#f5f5f5]/60 text-sm leading-relaxed">
          {product.description}
        </p>
      </div>

      <span className="text-[#f59e0b] font-black text-xl mt-auto">
        {formattedPrice}
      </span>
    </div>
  )
}
