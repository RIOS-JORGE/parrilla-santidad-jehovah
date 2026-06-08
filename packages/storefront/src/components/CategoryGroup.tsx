import type { MenuCategory } from '../lib/types'
import { MenuItem } from './MenuItem'

interface CategoryGroupProps {
  category: MenuCategory
}

export function CategoryGroup({ category }: CategoryGroupProps) {
  return (
    <div className="mb-12">
      <h3 className="text-[#f5f5f5] font-black text-2xl uppercase mb-6 tracking-wide">
        {category.category.name}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {category.products.map((product) => (
          <MenuItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
