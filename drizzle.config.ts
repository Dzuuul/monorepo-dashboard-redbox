// drizzle.config.ts
// NOTE: Pastikan DATABASE_URL sudah tersedia di environment (misal lewat .env di root monorepo)

export default {
  schema: "./apps/api/src/db/drizzle.ts",
  out: "./apps/api/drizzle",
  driver: "pg",
  dialect: "postgres",
  dbCredentials: {
    connectionString:
      process.env.DATABASE_URL ||
      "postgres://postgres:postgres@localhost:5432/billion",
  },
};
