# 📘 Dashboard Monorepo Redbox – README & Spesifikasi Teknis

_(Semi-formal, untuk tim & stakeholder)_

---

## 1. Gambaran Besar

**Dashboard Monorepo Redbox** adalah _single-repo_ berisi dua aplikasi utama:

- **Web Dashboard** – antarmuka bisnis berbasis Next.js 15.
- **API Backend** – servis data berbasis Fastify, menyediakan **REST** & **GraphQL** sekaligus.

Semua service hidup dengan satu perintah (`pnpm dev`) dan berbagi komponen, konfigurasi, serta _design system_.

---

## 2. Persiapan 2 Menit

| Prasyarat | Versi   | Catatan                           |
| --------- | ------- | --------------------------------- |
| Node.js   | ≥ 20.11 | Gunakan `nvm` agar konsisten      |
| PNPM      | ≥ 10.12 | `corepack enable` otomatis pasang |

```bash
git clone <repo-url>
cd dashboard-monorepo-redbox
pnpm install

# salin env
cp apps/web/.env.example apps/web/.env
cp apps/api/.env.example apps/api/.env
# edit value DB_URL, JWT_SECRET, dsb

pnpm dev           # nyalakan semua
```

Akses:

- Web → http://localhost:3000
- API → http://localhost:3001
- GraphQL Playground → http://localhost:3001/graphql

---

## 3. Arsitektur & Teknologi

| Layer             | Teknologi                   | Alasan                                          |
| ----------------- | --------------------------- | ----------------------------------------------- |
| **Monorepo**      | Turborepo + PNPM workspaces | Build cepat, dependensi ter-cache               |
| **Front-end**     | Next.js 15 (App Router)     | SSR/SSG otomatis, React 19                      |
| **Back-end**      | Fastify 4                   | Ringan, throughput tinggi                       |
| **Database 1**    | PostgreSQL 16               | ACID, relasional                                |
| **Database 2**    | MongoDB 7                   | Dokumen fleksibel (file & log)                  |
| **ORM SQL**       | Drizzle ORM                 | Type-safe, migrasi file-based                   |
| **ODM NoSQL**     | Mongoose                    | Validasi skema otomatis                         |
| **GraphQL**       | GraphQL Yoga 5              | Plug-and-play di Fastify                        |
| **Auth**          | JWT (bcryptjs)              | Stateless & mudah di-scale                      |
| **UI Library**    | Radix UI + Tailwind CSS v4  | Aksesibilitas + utility-first                   |
| **State**         | Zustand                     | Kecil, tanpa boilerplate                        |
| **Data Fetching** | TanStack Query              | Query data efisien, caching, auto-refetch       |
| **Data Table**    | TanStack Table              | Tabel interaktif, scalable hingga milyaran data |
| **Realtime**      | WebSocket                   | Notifikasi push & update data real-time         |
| **Validasi**      | Zod                         | Satu skema buat FE & BE                         |

---

## 4. Struktur Folder (Turbo-aware)

```
dashboard-monorepo-redbox
├── apps
│   ├── web/                 # Next.js 15 dashboard
│   │   ├── app/             # App Router
│   │   ├── components/      # Komponen lokal
│   │   └── lib/             # API client & helpers
│   └── api/                 # Fastify server
│       ├── src/
│       │   ├── routes/      # REST endpoint files
│       │   ├── graphql/     # GraphQL schema & resolver
│       │   ├── db/          # Drizzle schema & seed
│       │   └── plugins/     # Fastify plugin (auth, cors)
├── packages
│   ├── ui/                  # Reusable React components
│   ├── eslint-config/       # Shared ESLint preset
│   ├── typescript-config/   # Shared tsconfig
│   └── (soon) utils/        # Helper universal
├── turbo.json               # Pipeline caching
└── pnpm-workspace.yaml      # Definisi workspace
```

---

## 5. Spesifikasi Fitur

| Modul                 | Fitur                                                    | Teknologi                                         |
| --------------------- | -------------------------------------------------------- | ------------------------------------------------- |
| **Autentikasi**       | Register, Login, Refresh Token, RBAC                     | JWT, bcryptjs, Zod                                |
| **Dashboard**         | Drag-n-drop widget, real-time chart, tabel milyaran data | Recharts, Zustand, TanStack Table, TanStack Query |
| **Manajemen Dokumen** | Upload PDF/Excel, preview inline                         | MongoDB GridFS                                    |
| **Laporan**           | Filter multi-kriteria, export CSV                        | PostgreSQL view & procedure                       |
| **Notifikasi**        | Toast & push in-app, real-time websocket                 | React Hot-toast, WebSocket                        |
| **Theme**             | Light / Dark / Auto                                      | Tailwind CSS + next-themes                        |

---

## 6. REST API – Quick Reference

Base URL: `http://localhost:3001/api`

| Endpoint             | Method | Auth   | Request                 | Response       |
| -------------------- | ------ | ------ | ----------------------- | -------------- |
| `/api/auth/register` | POST   | ❌     | `{name,email,password}` | `{token,user}` |
| `/api/auth/login`    | POST   | ❌     | `{email,password}`      | `{token,user}` |
| `/api/users`         | GET    | ✅ JWT | –                       | `User[]`       |
| `/api/reports`       | GET    | ✅ JWT | `?from&to`              | `Report[]`     |
| `/api/reports/:id`   | GET    | ✅ JWT | –                       | `Report`       |
| `/api/files`         | POST   | ✅ JWT | `multipart/form-data`   | `{fileId}`     |

**Contoh request (cURL)**

```bash
curl -H "Authorization: Bearer <token>" \
     http://localhost:3001/api/reports?from=2024-01-01&to=2024-12-31
```

---

## 7. GraphQL – Quick Reference

Endpoint: `http://localhost:3001/graphql`

**Skema utama**

```graphql
type User {
  id: ID!
  name: String!
  email: String!
  role: Role!
}
type Report {
  id: ID!
  title: String!
  metrics: [Metric!]!
  createdAt: DateTime!
}
type Query {
  users: [User!]!
  reports(filter: ReportFilter): [Report!]!
}
type Mutation {
  login(email: String!, password: String!): AuthPayload!
  createReport(input: ReportInput!): Report!
}
```

**Contoh client (fetch native)**

```ts
const query = `
  query ($from: DateTime!, $to: DateTime!) {
    reports(filter: { from: $from, to: $to }) {
      id
      title
      createdAt
    }
  }`;
const res = await fetch("/graphql", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ query, variables: { from, to } }),
});
```

---

## 8. Environment Variables

| File            | Key                   | Contoh                                         | Kegunaan     |
| --------------- | --------------------- | ---------------------------------------------- | ------------ |
| `apps/web/.env` | `NEXT_PUBLIC_API_URL` | `http://localhost:3001`                        | Base API FE  |
| `apps/api/.env` | `DATABASE_URL`        | `postgresql://user:pass@localhost:5432/redbox` | PostgreSQL   |
|                 | `MONGODB_URI`         | `mongodb://localhost:27017/redbox`             | MongoDB      |
|                 | `JWT_SECRET`          | `super-secret-string`                          | Sign JWT     |
|                 | `PORT`                | `3001`                                         | Port Fastify |

---

## 9. Perintah Penting

| Tujuan              | Command                         |
| ------------------- | ------------------------------- |
| Dev semua           | `pnpm dev`                      |
| Build produksi      | `pnpm build`                    |
| Migrasi DB          | `pnpm --filter api db:push`     |
| Seed data dev       | `pnpm --filter api db:seed`     |
| Lint + type check   | `pnpm lint && pnpm check-types` |
| UI storybook (soon) | `pnpm --filter ui storybook`    |

---
