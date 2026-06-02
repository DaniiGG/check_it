PRESENTACION 
https://canva.link/659yeabssv83joq


# CheckIt — Liquidá tu backlog

SPA para gestionar y priorizar tu biblioteca de videojuegos. Aplica un algoritmo que divide la puntuación de Metacritic entre las horas necesarias para completar cada título.

> Más puntuación, menos horas = sobredosis de dopamina instantánea.

---

## Tecnologías

| Capa | Tecnología |
|---|---|
| Frontend | Nuxt 4, Vue 3, TypeScript |
| Backend | Express, Prisma ORM, Zod |
| Base de datos | PostgreSQL (Supabase) |
| Autenticación | JWT + bcryptjs |
| Estilos | CSS puro con variables CSS, Orbitron + Rajdhani |
| Despliegue | Vercel (frontend static + backend serverless) |

---

## Estructura del proyecto

```
check_it/
├── backend/
│   ├── src/
│   │   ├── lib/            # prisma.ts, auth.ts (JWT), validation.ts (Zod)
│   │   └── routes/         # games.ts, auth.ts
│   ├── prisma/             # schema.prisma (modelos User y Game)
│   └── api/                # index.js (entrypoint serverless Vercel)
│
├── frontend/
│   ├── app/
│   │   ├── components/     # GameCard, GameForm, GamesFilters
│   │   ├── pages/          # 7 rutas (index, login, registro, perfil, juegos/*)
│   │   ├── composables/    # useAuth.ts (estado global con useState)
│   │   ├── layouts/        # default.vue
│   │   ├── middleware/     # auth.ts
│   │   └── assets/         # main.css, checkit.png
│   └── nuxt.config.ts
│
└── README.md
```

---

## Modelo de datos

### User

| Campo | Tipo |
|---|---|
| id | UUID |
| email | String (unique) |
| alias | String |
| password | String (bcrypt) |
| createdAt, updatedAt | DateTime |

### Game

| Campo | Tipo |
|---|---|
| id | UUID |
| name | String |
| category | String |
| tags | String (JSON array) |
| metacriticScore | Int (0-100) |
| hoursToBeat | Float |
| completed | Boolean |
| completedAt | DateTime? |
| completionNotes | String? |
| rating | Int? (1-5) |
| userId | FK → User |
| createdAt, updatedAt | DateTime |

---

## API REST

URL base: `https://check-it-smrc.vercel.app`

### Auth

| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| POST | `/api/auth/register` | Crear cuenta | No |
| POST | `/api/auth/login` | Iniciar sesión | No |
| GET | `/api/auth/me` | Obtener perfil | Sí |

### Games

| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| GET | `/api/games` | Listar juegos (filtros: search, category, tag, sort, completed) | Sí |
| POST | `/api/games` | Crear juego | Sí |
| GET | `/api/games/priority` | Listar ordenados por prioridad (`score/horas`) | Sí |
| PATCH | `/api/games/:id` | Editar juego | Sí |
| DELETE | `/api/games/:id` | Eliminar juego | Sí |
| POST | `/api/games/:id/complete` | Marcar como completado + valoración + notas | Sí |

---

## Rutas del frontend (SPA)

| Ruta | Contenido | Auth |
|---|---|---|
| `/` | Hero, algoritmo M÷H=D, demo interactiva | No |
| `/login` | Login con email/contraseña | No |
| `/registro` | Registro con email/alias/contraseña | No |
| `/juegos` | Biblioteca con filtros y cards | Sí |
| `/juegos/nuevo` | Formulario de creación | Sí |
| `/juegos/edicion/:id` | Formulario de edición | Sí |
| `/perfil` | Datos del usuario | Sí |

---

## Algoritmo de prioridad

```
Prioridad = Metacritic Score / Horas para completar
```

A mayor ratio, más arriba en la lista. Prioriza juegos con buena puntuación y pocas horas.

Ejemplo:
- Elden Ring: 96 / 70h = **1.4**
- Portal 2: 95 / 8h = **11.9** ← va primero

---

## Gestión de estado

Composable `useAuth()` con `useState` de Nuxt. Datos compartidos:

- `auth-user` — usuario actual
- `auth-token` — JWT para peticiones
- `auth-loading` — estado de carga

Persistencia en `localStorage`. Acceso desde cualquier componente con `const { user, token, isAuthenticated, login, logout } = useAuth()`.

---

## Estilización

- CSS puro con variables CSS (`:root` en `main.css`)
- Scoped styles de Vue
- Fuentes: Orbitron (display) + Rajdhani (body)
- Tema oscuro con neón verde (`#00ff41`) y cyan (`#00e5ff`)
- Responsivo con `clamp()`, `auto-fill` grid y media queries

---

## Despliegue

| Componente | Plataforma |
|---|---|
| Frontend | Vercel (static site) |
| Backend | Vercel (serverless function) |
| Base de datos | Supabase (PostgreSQL) |

Variables de entorno en Vercel:

**Backend**: `DATABASE_URL`, `DIRECT_URL`, `JWT_SECRET`

**Frontend**: `NUXT_PUBLIC_API_BASE` (URL del backend)

---

## Instalación local

```bash
# Backend
cd backend
cp .env.example .env   # configurar DATABASE_URL y JWT_SECRET
npm install
npx prisma generate
npx prisma db push
npm run dev             # http://localhost:3000

# Frontend
cd frontend
npm install
npm run dev             # http://localhost:3000 (o 3001)
```







