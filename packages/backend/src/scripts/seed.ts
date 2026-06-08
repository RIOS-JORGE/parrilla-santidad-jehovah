import type { MedusaContainer } from '@medusajs/framework'
import { Modules } from '@medusajs/framework/utils'
import { createProductsWorkflow } from '@medusajs/medusa/core-flows'

interface CategoryData {
  name: string
  handle: string
  rank: number
}

interface ProductData {
  title: string
  handle: string
  description: string
  categoryHandle: string
  variants: Array<{
    title: string
    prices: Array<{
      amount: number
      currency_code: string
    }>
  }>
}

const categoriesData: CategoryData[] = [
  { name: 'Simples', handle: 'simples', rank: 0 },
  { name: 'Dobles', handle: 'dobles', rank: 1 },
  { name: 'Papas', handle: 'papas', rank: 2 },
  { name: 'Bebidas', handle: 'bebidas', rank: 3 },
]

const productsData: ProductData[] = [
  {
    title: 'La Clásica',
    handle: 'la-clasica',
    description: '120g carne, cheddar, lechuga, tomate',
    categoryHandle: 'simples',
    variants: [
      {
        title: 'Único',
        prices: [{ amount: 5500, currency_code: 'ars' }],
      },
    ],
  },
  {
    title: 'La BBQ',
    handle: 'la-bbq',
    description: '120g carne, cheddar, cebolla crispy, salsa BBQ',
    categoryHandle: 'simples',
    variants: [
      {
        title: 'Único',
        prices: [{ amount: 6200, currency_code: 'ars' }],
      },
    ],
  },
  {
    title: 'La Criolla',
    handle: 'la-criolla',
    description: '120g carne, provolone, tomate, huevo',
    categoryHandle: 'simples',
    variants: [
      {
        title: 'Único',
        prices: [{ amount: 6500, currency_code: 'ars' }],
      },
    ],
  },
  {
    title: 'La Doble Clásica',
    handle: 'la-doble-clasica',
    description: '2x120g carne, doble cheddar, lechuga, tomate',
    categoryHandle: 'dobles',
    variants: [
      {
        title: 'Único',
        prices: [{ amount: 7800, currency_code: 'ars' }],
      },
    ],
  },
  {
    title: 'La Doble BBQ',
    handle: 'la-doble-bbq',
    description: '2x120g carne, doble cheddar, cebolla crispy, salsa BBQ',
    categoryHandle: 'dobles',
    variants: [
      {
        title: 'Único',
        prices: [{ amount: 8500, currency_code: 'ars' }],
      },
    ],
  },
  {
    title: 'La Bruta',
    handle: 'la-bruta',
    description: '2x150g carne, doble cheddar, panceta, huevo, salsa especial',
    categoryHandle: 'dobles',
    variants: [
      {
        title: 'Único',
        prices: [{ amount: 9500, currency_code: 'ars' }],
      },
    ],
  },
  {
    title: 'Papas Fritas',
    handle: 'papas-fritas',
    description: 'Porción de papas crocantes',
    categoryHandle: 'papas',
    variants: [
      {
        title: 'Único',
        prices: [{ amount: 2800, currency_code: 'ars' }],
      },
    ],
  },
  {
    title: 'Papas con Cheddar',
    handle: 'papas-con-cheddar',
    description: 'Papas con cheddar y panceta',
    categoryHandle: 'papas',
    variants: [
      {
        title: 'Único',
        prices: [{ amount: 3500, currency_code: 'ars' }],
      },
    ],
  },
  {
    title: 'Coca-Cola 500ml',
    handle: 'coca-cola-500ml',
    description: 'Gaseosa Coca-Cola 500ml',
    categoryHandle: 'bebidas',
    variants: [
      {
        title: 'Único',
        prices: [{ amount: 1800, currency_code: 'ars' }],
      },
    ],
  },
  {
    title: 'Agua 500ml',
    handle: 'agua-500ml',
    description: 'Agua mineral 500ml',
    categoryHandle: 'bebidas',
    variants: [
      {
        title: 'Único',
        prices: [{ amount: 1200, currency_code: 'ars' }],
      },
    ],
  },
]

async function getOrCreateCategories(
  productService: any,
): Promise<Map<string, string>> {
  const existing = await productService.listProductCategories(
    {},
    { select: ['id', 'name', 'handle'] },
  )
  const handleToId = new Map<string, string>()

  for (const cat of existing) {
    if (cat.handle) {
      handleToId.set(cat.handle, cat.id)
    }
  }

  const toCreate = categoriesData.filter((c) => !handleToId.has(c.handle))

  if (toCreate.length > 0) {
    const created = await productService.createProductCategories(toCreate)
    for (const cat of created) {
      if (cat.handle) {
        handleToId.set(cat.handle, cat.id)
      }
    }
  }

  return handleToId
}

export default async function seed({
  container,
}: {
  container: MedusaContainer
}): Promise<void> {
  const productService = container.resolve(Modules.PRODUCT)

  // 1. Create or retrieve categories
  const categoryHandleToId = await getOrCreateCategories(productService)

  // 2. Check which products already exist by handle
  const existingProducts = await productService.listProducts(
    {},
    { select: ['id', 'handle'] },
  )
  const existingHandles = new Set(
    existingProducts.map((p: any) => p.handle).filter(Boolean),
  )

  const toCreate = productsData.filter(
    (p) => !existingHandles.has(p.handle),
  )

  if (toCreate.length === 0) {
    console.log('All products already exist — seed is idempotent, nothing to do.')
    return
  }

  // 3. Create products via workflow (handles variants + prices)
  const productsInput = toCreate.map((p) => ({
    title: p.title,
    handle: p.handle,
    description: p.description,
    categories: [{ id: categoryHandleToId.get(p.categoryHandle) }],
    variants: p.variants,
  }))

  await createProductsWorkflow(container).run({
    input: { products: productsInput },
  })

  const createdCount = toCreate.length
  console.log(`Seed complete — ${createdCount} product(s) created.`)
}
