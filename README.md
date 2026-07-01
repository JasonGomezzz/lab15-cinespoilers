# CineSpoilers - Lab 15

## Evidencias del laboratorio

### a-b. Clonar y levantar el proyecto
![Terminal: clone, install y dev](docs/evidencia1.png)
![Navegador: proyecto corriendo](docs/evidencia2.png)

- Repo clonado desde `elliotgaramendi/cinespoilers`
- `npm install` sin errores
- `npm run dev` levanta en `http://localhost:5174`

### c. Consumir data de TMDB
![Servicio TMDB](docs/evidencia4.png)

- Servicio creado: `src/services/tmdb-service.ts`, `src/services/tmdb-client.ts`
- Auth vía Bearer token (v4) en `VITE_TMDB_TOKEN`
- Integrado con TanStack Query
- Token probado contra TMDB → HTTP 200
- Compilación TS: sin errores | ESLint: sin errores nuevos

### d. Estado global (Zustand)
![Store Zustand](docs/evidencia3.png)

- Instalado `zustand@5.0.14`
- Archivo: `src/store/cine-store.ts`
- 3 dominios: película seleccionada, carrito de compra, compra simulada
- Carrito persistido en localStorage
- Compilación TS: sin errores | ESLint: limpio

### e. Pages desarrolladas
_(pendiente — Punto 3 en progreso)_

### f. Pasarela de pago (simulación)
_(pendiente — Punto 4)_

### g. Tests
_(pendiente — Punto 5)_