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

## 🏗️ Estructura del Proyecto

El proyecto sigue una arquitectura modular y escalable basada en carpetas, organizada por responsabilidades:

```
src/
├── app/                      # Entradas de páginas Next.js
├── components/               # Componentes reutilizables (Column, Task, Board, etc.)
├── helpers/                  # Funciones utilitarias (orderBoard, generateNewBoard)
├── hooks/                    # Hooks personalizados (useCache, useWebsockets, etc.)
├── interfaces/               # Tipado global de la app
├── lib/
│   ├── actions/              # Lógica asincrónica con efectos secundarios
│   ├── constants/            # Constantes globales
│   ├── features/             # Slices de Redux
│   ├── services/             # Servicios externos (autenticación, etc.)
│   ├── supabase/             # Funciones para interactuar con la BD
│   └── utils/                # Utilidades generales
├── mocks/                    # Datos falsos para pruebas
├── tests/                    # Tests End-to-End con Playwright
├── hooks.ts                  # Wrapper de hooks personalizados
├── registry.tsx              # Registro de componentes dinámicos
└── store.ts                  # Configuración de Redux
```

---

## ⚙️ Decisiones de Diseño Clave

- **Next.js + React**: para SSR, rendimiento y escalabilidad.
- **Redux Toolkit**: manejo centralizado y predecible del estado del tablero.
- **Supabase**: como backend-as-a-service que permite autenticación, base de datos y WebSockets.
- **WebSockets**: sincronización en tiempo real para múltiples usuarios editando simultáneamente.
- **Drag & Drop (hello-pangea/dnd)**: para experiencia fluida al mover tareas y columnas.
- **Styled-components**: estilo encapsulado, reutilizable y tematizable.
- **Playwright**: para asegurar funcionalidades clave mediante pruebas E2E.

---

## 💾 Persistencia de Datos

La app interactúa con Supabase para almacenar todos los datos del tablero:

- `boards`: se crea uno por usuario (identificado por email).
- `columns` y `tasks`: se relacionan con el board por claves foráneas.
- Los datos se sincronizan usando WebSockets, permitiendo que múltiples usuarios vean actualizaciones en tiempo real.
- Se implementó un sistema de **bloqueo optimista** para simular concurrencia, permitiendo editar tareas de forma local antes de sincronizarlas.

---

## 🔐 Estrategia de Identificadores Únicos y lógica de sesión

### Identificadores Únicos
- **UUIDs**: generados desde Supabase para columnas.
- **IDs**: generados en base al usuario, fecha y un token aleatorio para las tareas.
- Se asegura unicidad y compatibilidad con los motores de base de datos.
- Se encripta y almacena la sesión mediante una cookie.
- Se genera una autenticacion tOtp para cada usuario de forma automatica, sinulando una doble autenticacion.

---

## 🧮 Justificación de Estructuras de Datos

- **Tablero (Board)**: Representado en un arbol de nodos (arreglo de objetos).
- **Ordenamiento**: cada columna y tarea tiene una propiedad `position`, permitiendo orden flexible y eficiente.
- **Optimización de performance**:
  - Se usa `JSON.stringify` para comprimir los datos y la comunicacion con el backend sea mas rapida.
- Esta estructura favorece la extensibilidad, permitiendo por ejemplo tareas anidadas o múltiples asignaciones en el futuro.

---

## ✅ Ventajas

- Escalabilidad en componentes y lógica de estado.
- Persistencia eficiente con mínima redundancia.
- Flujo de datos predecible (Redux + Supabase).
- Actualizaciones en tiempo real robustas y seguras.
- Modularidad total para testeo, despliegue y mantenibilidad.

---
