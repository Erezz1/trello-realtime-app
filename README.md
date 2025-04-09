# 🧩 Trello Clone

## 🚀 Tecnologías

- **Next.js** + **React**
- **Supabase**
- **WebSockets**
- **Redux Toolkit**
- **Styled-components**
- **Playwright**
- **TypeScript**

## Instalación
1. Clona el repositorio
2. Instala las dependencias con `pnpm install`
4. Ejecuta `pnpm dev` para iniciar la aplicació


## 📦 Características

✅ Autenticación con encriptación de token y uso de TOtp
✅ Renderizado condicional según el estado de autenticación
✅ Drag & Drop de columnas y tareas  
✅ CRUD completo de columnas y tareas  
✅ Ordenamiento de columnas y tareas
✅ Validación de formularios
✅ Filtro de tareas por título
✅ Actualización en tiempo real vía **WebSockets**  
✅ Uso de bloque optimista
✅ Persistencia de datos en Supabase
✅ Tests end-to-end con Playwright


## 🧠 Arquitectura

- El estado del tablero se almacena en **Redux**, estructurado en `columns` y `tasks`. Siguiendo arquitectura **FLUX**.
- Al hacer login, se busca el tablero con el email del usuario (`boards`).
  - Si no existe, se **crea automáticamente**.
- Los cambios en el tablero se reflejan en la base de datos y en el estado global.
- Se usan hooks personalizados:
  - `useWebsockets` escucha cambios en Supabase.


## 🗃️ Base de datos (Supabase)

### Tablas principales:

- `boards`: `{ id, email }`
- `columns`: `{ id, title, board_id, position }`
- `tasks`: `{ id, title, description, column_id, position, updated_at }`


## ⚙️ Scripts

```bash
# Desarrollo
pnpm dev

# Build
pnpm build

# Test E2E
pnpm test:e2e
```


## 🖼️ Skeleton Loading

Durante la carga del tablero, se muestra un `SkeletonBoard` con CSS que simula la estructura del tablero.


## 📁 Estructura base

```
src/
├── app/
├── components/
├── helpers/
├── hooks/
├── interfaces/
├── lib/
│   ├── actions/
│   ├── constants/
│   ├── features/
│   ├── services/
│   ├── supabase/
│   └── utils/
├── mocks/
├── tests/
├── hooks.ts
├── registry.tsx
└── store.ts
```
