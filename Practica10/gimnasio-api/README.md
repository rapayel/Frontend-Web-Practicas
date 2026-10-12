# Gimnasio API — Solución Práctica 9 (Blindar la API)

Parte de la solución de la Práctica 8 (esquema y migraciones de Prisma) y hace dos cosas: primero
conecta esos modelos a la aplicación — reemplaza los 4 repositorios en memoria por repositorios
de Prisma — y después blinda el ciclo de vida de la petición: validación automática, un
middleware, un interceptor de logging, un filtro de excepciones y CORS.

## Cómo correrlo

```bash
npm install
cp .env.ejemplo .env        # y pon tu contraseña de root de MySQL
npm run prisma:migrate      # ya viene del schema de la Práctica 8
npm run prisma:seed
npm run start:dev
```

## Qué se agregó respecto a la Práctica 8

| Archivo | Qué es |
|---|---|
| `src/prisma/` | `PrismaService` (driver adapter) y `PrismaModule` (`@Global()`) |
| `src/*/infra/*-prisma.repository.ts` | Reemplazan a los `*-memoria.repository.ts` |
| `src/*/dto/*.ts` | Pasaron de `interface` a `class` con decoradores de `class-validator` |
| `src/comun/filtros/dominio.filter.ts` | Traduce `ErrorDeDominio` (y sus hijas) a 404/409, en un solo lugar |
| `main.ts` | `ValidationPipe`, `DominioExceptionFilter` y CORS, registrados globalmente |
| `inscripciones.controller.ts` | Perdió el `try/catch` y el chequeo manual — ahora los hace el Pipe y el Filter |

Opcionales en el `.docx` del alumno, resueltos aquí:

| Archivo | Qué es |
|---|---|
| `src/comun/middleware/peticion-id.middleware.ts` | Agrega `X-Request-Id` a toda respuesta |
| `src/comun/interceptores/logging.interceptor.ts` | Loguea método, ruta y duración de cada petición |
| `src/comun/interceptores/sobre.interceptor.ts` | Bonus adicional: envuelve toda respuesta en `{ data, meta }` — NO está activo en `main.ts`; activarlo rompe el contrato de todos los endpoints |
