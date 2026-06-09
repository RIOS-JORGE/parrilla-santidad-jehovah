# La Brutal Hamburguesería

Monorepo de la tienda online de **La Brutal Hamburguesería** — backend con Medusa v2 + frontend con React y Tailwind CSS.

## Stack

| Capa          | Tecnología                                               |
| ------------- | -------------------------------------------------------- |
| Backend       | Medusa v2 + Node.js + TypeScript                         |
| Frontend      | React 19 + Vite + Tailwind CSS v4                        |
| Base de datos | PostgreSQL 16                                            |
| Cache         | Redis 7                                                  |
| Email (dev)   | Mailpit (SMTP local + UI web en puerto 8025)             |
| Paquetería    | pnpm workspaces                                          |

---

## Requisitos previos

- **Node.js** >= 20
- **pnpm** >= 9 (`npm install -g pnpm`)
- **Docker** y **Docker Compose** (para PostgreSQL, Redis y Mailpit)

---

## Paso a paso para levantar todo

### 1. Clonar e instalar dependencias

```bash
git clone <repo-url> la-brutal-hamburgueseria
cd la-brutal-hamburgueseria
pnpm install
```

### 2. Configurar variables de entorno

```bash
cp packages/backend/.env.example packages/backend/.env
```

Los valores por defecto ya funcionan para desarrollo local.

### 3. Levantar infraestructura (PostgreSQL + Redis + Mailpit)

```bash
docker compose up -d
```

Esto levanta:
- **PostgreSQL** en `localhost:5432`
- **Redis** en `localhost:6379`
- **Mailpit** (SMTP en `localhost:1025`, UI en `http://localhost:8025`)

Verificá que los contenedores estén sanos:

```bash
docker compose ps
```

### 4. Crear la base de datos

Conectate a PostgreSQL y creá la DB:

```bash
docker exec -it labrutal-postgres psql -U medusa -d medusa -c "CREATE DATABASE labrutal_medusa;"
```

Salida esperada: `CREATE DATABASE`.

> **Nota:** Docker Compose crea automáticamente la DB `medusa`. El backend usa `labrutal_medusa`. Por eso la creamos aparte.

### 5. Correr migraciones

```bash
cd packages/backend
npx medusa db:migrate
```

Esto crea todas las tablas que necesita Medusa.

### 6. Sembrar datos (categorías y productos)

```bash
pnpm seed
```

Esto ejecuta `packages/backend/src/scripts/seed.ts` y crea categorías y productos de prueba (hamburguesas, papas, bebidas). Es **idempotente**: si ya existen, no duplica.

### 7. Crear usuario admin

Con el backend **detenido** todavía, ejecutá:

```bash
cd packages/backend
npx medusa user -e admin@labrutal.com -p TuPasswordSegura123
```

> **¿No funciona ese comando?** En algunas versiones de Medusa v2 tenés que crearlo apenas arranca el backend. Arrancalo primero (`pnpm dev:backend` desde la raíz), esperá que termine de iniciar, y en otra terminal ejecutá el mismo comando. Si el backend ya está corriendo, el comando usa la API directamente.

Si querés verificarlo, después de crearlo entrás al dashboard con esas credenciales.

### 8. Configurar la Publishable API Key

El storefront necesita una **Publishable API Key** de Medusa para hacer consultas al backend.

Si el backend ya está corriendo:
1. Andá a **Settings > API Key Management** en el dashboard.
2. Creá una nueva **Publishable API Key**.
3. Copiá el valor en `packages/storefront/.env`:

```bash
# packages/storefront/.env
VITE_MEDUSA_PUBLISHABLE_KEY=pk_...
VITE_WHATSAPP_NUMBER=5491111111111    # Cambialo por tu número real
```

También actualizá la clave en el backend:

```bash
# packages/backend/.env
PUBLISHABLE_API_KEY=pk_...
```

Y reiniciá el backend.

### 9. Iniciar el backend

```bash
# Desde la raíz del proyecto
pnpm dev:backend
```

El backend arranca en `http://localhost:9000`.
El dashboard de administración está en `http://localhost:9000/app`.

### 10. Iniciar el storefront

En otra terminal:

```bash
# Desde la raíz del proyecto
pnpm dev
```

El storefront arranca en `http://localhost:5173`.

---

## URLs rápido

| Servicio        | URL                                         |
| --------------- | ------------------------------------------- |
| Storefront      | `http://localhost:5173`                     |
| Admin Medusa    | `http://localhost:9000/app`                 |
| API Medusa      | `http://localhost:9000`                     |
| Mailpit UI      | `http://localhost:8025`                     |
| PostgreSQL      | `localhost:5432`                            |
| Redis           | `localhost:6379`                            |

---

## Comandos útiles

```bash
pnpm dev              # Storefront (Vite)
pnpm dev:backend      # Backend (Medusa)
pnpm seed             # Sembrar productos y categorías
pnpm build            # Build del storefront
```

```bash
# Migraciones (ejecutar desde packages/backend)
npx medusa db:migrate
npx medusa db:revert  # Deshacer última migración
```

---

## Tips y troubleshooting

- **El comando `npx medusa user` falla:** Asegurate de que el backend esté corriendo. En algunas versiones de Medusa v2 el comando necesita que el servidor esté activo.
- **Error de PostgreSQL "database does not exist":** Corré el paso 4 para crear `labrutal_medusa`.
- **El storefront no ve productos:** Verificá que la `VITE_MEDUSA_PUBLISHABLE_KEY` esté configurada y que coincida con la del backend.
- **Mailpit no recibe mails:** Revisá que no haya otro proceso usando el puerto 1025.
- **Puerto 5432 ocupado:** Si ya tenés PostgreSQL corriendo afuera de Docker, detenelo o cambiá el puerto en `docker-compose.yml`.
