# API Service

Ini adalah service API (Fastify + GraphQL Yoga) untuk monorepo dashboard.

## Cara Menjalankan

```bash
pnpm install
pnpm dev
```

- Endpoint health check: http://localhost:4000/health
- Endpoint GraphQL: http://localhost:4000/graphql

## Struktur Dasar

- `src/server.ts` — Entry point Fastify & GraphQL
- `package.json` — Script & dependensi
- `tsconfig.json` — Konfigurasi TypeScript
