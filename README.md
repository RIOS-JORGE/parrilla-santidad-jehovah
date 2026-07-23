# La Brutal Hamburguesería

Landing page + menú vivo + carrito con checkout por WhatsApp para **La Brutal Hamburguesería**.
Panel de administración para gestionar productos y categorías.

---

## Stack

| Capa          | Tecnología                              |
| ------------- | --------------------------------------- |
| Frontend      | React 19 + Vite + Tailwind CSS v4       |
| Base de datos | Supabase (PostgreSQL cloud)             |
| Auth          | Supabase Auth (email + password)        |
| Storage       | Supabase Storage (imágenes de productos)|
| Paquetería    | pnpm                                    |
| Hosting       | Vercel (frontend)                       |

---

## Requisitos previos

- **Node.js** >= 20
- **pnpm** >= 9

---

## Desarrollo local

```bash
# 1. Clonar e instalar
pnpm install

# 2. Crear .env del storefront
cat > packages/storefront/.env << 'EOF'
VITE_SUPABASE_URL=https://zwqwdwkjohzgycnqncyd.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_TjWKby4fAiaOtx_B0wxl5Q_MHXB33r2
VITE_WHATSAPP_NUMBER=5491125770755
EOF

# 3. Iniciar
pnpm dev
```

Storefront en `http://localhost:5173`.
Admin en `http://localhost:5173/admin` (login: `admin@labrutal.com` / `labrutal123`).

---

## Comandos

```bash
pnpm dev     # Storefront (Vite + React)
pnpm build   # Build de producción
pnpm test    # Tests (Vitest)
```

---

## Estructura del proyecto

```
packages/storefront/src/
├── App.tsx                     # Router: landing ↔ admin
├── main.tsx                    # Entry point
├── lib/
│   ├── supabase.ts             # Cliente Supabase
│   ├── types.ts                # Tipos (Category, Product, MenuCategory)
│   ├── api.ts                  # Queries a Supabase
│   ├── cart.ts                 # Lógica del carrito (formatos, WhatsApp)
│   ├── cart.types.ts           # Tipos del carrito
│   └── constants.ts            # Config (WhatsApp, horarios, redes)
├── hooks/
│   └── useMenu.ts              # Hook para cargar el menú
├── context/
│   ├── CartContext.tsx          # Estado del carrito (useReducer)
│   └── AuthContext.tsx          # Auth con Supabase
└── components/
    ├── HeroSection, AboutSection, MenuSection, ...
    ├── CartBar, CartSheet, CartCheckout
    └── admin/
        ├── AdminLogin.tsx       # Login form
        ├── AdminLayout.tsx      # Layout con tabs
        ├── AdminProducts.tsx    # CRUD productos
        ├── AdminProductForm.tsx # Form producto
        ├── AdminCategories.tsx  # CRUD categorías
        ├── AdminCategoryForm.tsx# Form categoría
        └── AdminImageUpload.tsx # Subida de imágenes
```

---

## Admin

**URL:** `/admin`
**Usuarios:** se crean desde Supabase Dashboard → Authentication → Users

El admin puede:
- Gestionar categorías (crear, editar, reordenar, eliminar)
- Gestionar productos (crear, editar, activar/desactivar, subir imagen)
- Ver el listado completo del menú

---

## Deploy a Vercel

### 1. Conectar el repo a Vercel

- Importar el proyecto desde GitHub
- Framework: **Vite**
- Root directory: `packages/storefront`
- Build command: `pnpm build`
- Output directory: `dist`

### 2. Variables de entorno en Vercel

| Variable | Valor |
|---|---|
| `VITE_SUPABASE_URL` | `https://zwqwdwkjohzgycnqncyd.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | `sb_publishable_TjWKby4fAiaOtx_B0wxl5Q_MHXB33r2` |
| `VITE_WHATSAPP_NUMBER` | `5491125770755` |

### 3. Deploy

Push a `main` y Vercel deploya automáticamente.
