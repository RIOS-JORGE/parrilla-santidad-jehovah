# La Brutal Hamburguesería

Monorepo de la tienda online de **La Brutal Hamburguesería** — backend con Medusa v2 + frontend con React y Tailwind CSS v4.

Landing page de una sola página con 7 secciones, menú vivo desde Medusa Store API, carrito de compras con checkout, y SEO básico (JSON-LD, OG tags, sitemap).

---

## Stack

| Capa          | Tecnología                                                       |
| ------------- | ---------------------------------------------------------------- |
| Backend       | Medusa v2 + Node.js + TypeScript                                 |
| Frontend      | React 19 + Vite + Tailwind CSS v4                                |
| Base de datos | PostgreSQL 16                                                     |
| Cache         | Redis 7                                                           |
| Email (dev)   | Mailpit (SMTP local + UI web en puerto 8025)                     |
| Paquetería    | pnpm workspaces                                                   |

---

## Requisitos previos

- **Node.js** >= 20
- **pnpm** >= 9 (`npm install -g pnpm`)
- **Docker** y **Docker Compose** (para PostgreSQL, Redis y Mailpit)

---

## Desarrollo local — paso a paso

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

Editar `packages/backend/.env` si es necesario. Los valores por defecto funcionan para desarrollo local.

Para el storefront, crear `packages/storefront/.env`:

```bash
cat > packages/storefront/.env << 'EOF'
VITE_MEDUSA_PUBLISHABLE_KEY=pk_65de1bebdc36150b05ff2ac96592dd0679c4246ee6b8ad82703a0b5787d17355
VITE_WHATSAPP_NUMBER=5491125770755
EOF
```

> Los secrets (`JWT_SECRET`, `COOKIE_SECRET`) ya vienen generados con `openssl rand -hex 32` en el `.env`. Nunca comitear `.env` al repo.

### 3. Levantar infraestructura (PostgreSQL + Redis + Mailpit)

```bash
docker compose up -d
```

Esto levanta:
- **PostgreSQL** en `localhost:5432`
- **Redis** en `localhost:6379`
- **Mailpit** (SMTP en `localhost:1025`, UI en `http://localhost:8025`)

Verificar que estén sanos:

```bash
docker compose ps
```

### 4. Crear la base de datos

```bash
docker exec -it labrutal-postgres psql -U medusa -d medusa -c "CREATE DATABASE labrutal_medusa;"
```

> Docker Compose crea la DB `medusa` automáticamente. El backend usa `labrutal_medusa`, por eso la creamos aparte.

### 5. Correr migraciones

```bash
cd packages/backend
npx medusa db:migrate
```

### 6. Sembrar datos (categorías y productos)

```bash
# Desde la raíz del proyecto
pnpm seed
```

Esto ejecuta `packages/backend/src/scripts/seed.ts` y crea:
- 4 categorías: Simples, Dobles, Papas, Bebidas
- ~10 productos con precios en ARS
- Es **idempotente**: si ya existen, no duplica.

### 7. Crear usuario admin

Con el backend detenido:

```bash
cd packages/backend
npx medusa user -e admin@labrutal.com -p labrutal123
```

> Si el comando falla, primero arrancá el backend (`pnpm dev:backend`), esperá que termine de iniciar, y ejecutá el mismo comando en otra terminal.

### 8. Iniciar el backend

```bash
# Desde la raíz del proyecto
pnpm dev:backend
```

El backend arranca en `http://localhost:9000`.
Dashboard de administración en `http://localhost:9000/app`.

### 9. Iniciar el storefront

En otra terminal:

```bash
# Desde la raíz del proyecto
pnpm dev
```

El storefront arranca en `http://localhost:5173`.

### 10. Verificar que funciona

```bash
# El menú se ve desde el front:
open http://localhost:5173

# Productos con thumbnails desde la API:
curl http://localhost:9000/store/products?fields=title,thumbnail \
  -H "x-publishable-api-key: pk_65de1bebdc36150b05ff2ac96592dd0679c4246ee6b8ad82703a0b5787d17355"

# Tests:
cd packages/storefront && npm test

# Build de producción:
cd packages/storefront && npm run build
```

---

## URLs rápido (desarrollo)

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
pnpm dev              # Storefront (Vite + React)
pnpm dev:backend      # Backend (Medusa)
pnpm seed             # Sembrar productos y categorías
pnpm build            # Build de producción del storefront
```

```bash
# Migraciones (ejecutar desde packages/backend)
npx medusa db:migrate
npx medusa db:revert  # Deshacer última migración
```

```bash
# Tests del storefront
cd packages/storefront
npm test              # Una vez
npm run test:watch    # Modo watch
```

---

## Deploy a VPS

### Requisitos del servidor

- Ubuntu 22.04+ / Debian 12+
- Node.js >= 20
- pnpm >= 9
- Docker + Docker Compose
- Nginx (como reverse proxy)
- Dominio apuntando a la IP del servidor (ej: `labrutal.com`)

### 1. Preparar el servidor

```bash
# Actualizar e instalar dependencias
apt update && apt upgrade -y
apt install -y curl git nginx

# Instalar Node.js 20+
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Instalar pnpm
npm install -g pnpm

# Instalar Docker
curl -fsSL https://get.docker.com | bash -
```

### 2. Clonar el proyecto

```bash
mkdir -p /var/www
cd /var/www
git clone <repo-url> labrutal
cd labrutal
pnpm install
```

### 3. Configurar entorno de producción

```bash
cp packages/backend/.env.example packages/backend/.env
```

Editar `packages/backend/.env` para producción:

```env
DATABASE_URL=postgres://medusa:medusa@localhost:5432/medusa
REDIS_URL=redis://localhost:6379
PUBLISHABLE_API_KEY=pk_...  # Generar una nueva desde el admin
JWT_SECRET=<generar con: openssl rand -hex 32>
COOKIE_SECRET=<generar con: openssl rand -hex 32>

# SMTP real (NO Mailpit)
SMTP_HOST=smtp.tudominio.com
SMTP_PORT=587
SMTP_USER=tu@email.com
SMTP_PASS=tu_password
FROM_EMAIL=noreply@labrutal.com
FROM_NAME=La Brutal Hamburguesería

# URL pública del storefront
STORE_URL=https://labrutal.com
HOST=0.0.0.0
PORT=9000
```

> **Importante**: generar nuevos `JWT_SECRET` y `COOKIE_SECRET`. No reusar los del `.env` de desarrollo.

Crear `packages/storefront/.env`:

```env
VITE_MEDUSA_PUBLISHABLE_KEY=pk_...  # Misma que en backend
VITE_WHATSAPP_NUMBER=5491125770755
```

### 4. Levantar infraestructura

```bash
docker compose up -d
```

### 5. Migraciones + seed

```bash
cd packages/backend
npx medusa db:migrate
cd ..
pnpm seed
```

### 6. Crear usuario admin

```bash
cd packages/backend
npx medusa user -e admin@labrutal.com -p <contraseña-segura>
```

### 7. Iniciar servicios con PM2 (production process manager)

```bash
npm install -g pm2

# Iniciar backend
pm2 start "pnpm dev:backend" --name labrutal-backend --cwd /var/www/labrutal

# Iniciar storefront
pm2 start "pnpm dev" --name labrutal-frontend --cwd /var/www/labrutal

# Guardar la configuración de PM2 para que reviva al reiniciar
pm2 save
pm2 startup
```

> Para producción real, conviene hacer build del storefront y servirlo con Nginx estático en vez de usar el dev server de Vite:

```bash
cd packages/storefront
pnpm build
# Los archivos estáticos quedan en packages/storefront/dist/
```

Y configurar Nginx para servir `dist/` directamente (ver paso 8).

### 8. Configurar Nginx como reverse proxy

Crear `/etc/nginx/sites-available/labrutal.com`:

```nginx
server {
    listen 80;
    server_name labrutal.com www.labrutal.com;

    # Redirigir a HTTPS (si tenés certificado SSL)
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name labrutal.com www.labrutal.com;

    # SSL — obtener con certbot (Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/labrutal.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/labrutal.com/privkey.pem;

    # Storefront (build estático)
    root /var/www/labrutal/packages/storefront/dist;
    index index.html;

    # SPA: redirigir todo a index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Archivos estáticos con caché
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # OG image, robots, sitemap — caché corto
    location /og-image.jpg {
        expires 1d;
    }
    location /robots.txt {
        expires 1d;
    }
    location /sitemap.xml {
        expires 1d;
    }

    # Proxy inverso para la API de Medusa
    location /api/ {
        proxy_pass http://127.0.0.1:9000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Proxy para imágenes estáticas de Medusa
    location /static/ {
        proxy_pass http://127.0.0.1:9000/static/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        expires 7d;
        add_header Cache-Control "public";
    }

    # Admin de Medusa
    location /app/ {
        proxy_pass http://127.0.0.1:9000/app/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Habilitar el sitio:

```bash
ln -s /etc/nginx/sites-available/labrutal.com /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
```

### 9. SSL con Let's Encrypt (certbot)

```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d labrutal.com -d www.labrutal.com
```

### 10. Firewall

```bash
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable
```

---

## Mantenimiento en producción

```bash
# Ver logs
pm2 logs labrutal-backend
pm2 logs labrutal-frontend

# Reiniciar servicios
pm2 restart labrutal-backend
pm2 restart labrutal-frontend

# Actualizar código
cd /var/www/labrutal
git pull
pnpm install
npx medusa db:migrate  # si hay migraciones nuevas
pnpm build             # rebuild del storefront
pm2 restart all

# Backup de la base de datos
docker exec labrutal-postgres pg_dump -U medusa labrutal_medusa > backup-$(date +%Y%m%d).sql
```

---

## Pendientes para producción

| Item | Por qué |
|------|---------|
| **OG image 1200×630** | El placeholder actual es el logo 150×150. Hacer una imagen con el branding y reemplazar en `public/og-image.jpg` |
| **Fotos de Papas y Bebidas** | Subir imágenes por el admin de Medusa para los productos que faltan |
| **SMTP real** | Configurar un servicio de email (SendGrid, Resend, etc.) en `.env` |
| **Favicon personalizado** | Reemplazar `public/favicon.svg` con el icono de la marca |
| **Dominio real** | Reemplazar `labrutal.com` por el dominio real en `index.html`, `robots.txt`, `sitemap.xml` y config Nginx |
| **Rate limiting** | Agregar protección al Store API de Medusa cuando esté expuesto |

---

## Tips y troubleshooting

- **Error "database does not exist":** Corré `CREATE DATABASE labrutal_medusa;` (paso 4).
- **El storefront no ve productos:** Verificá que `VITE_MEDUSA_PUBLISHABLE_KEY` coincida con la del backend y que los productos estén `published` con `is_active=true` en categorías.
- **Puerto 5432 ocupado:** Si ya tenés PostgreSQL afuera de Docker, detenelo o cambiá el puerto en `docker-compose.yml`.
- **Error de build de Medusa:** Si `medusa develop` falla por falta de admin build, usá `medusa develop` (no `medusa start`). El dev server no necesita build previo.
- **pnpm v11 y postinstall scripts:** Si algún paquete Medusa falla al instalar, agregá `allowBuilds` en `pnpm-workspace.yaml`.
