import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
// Import semua schema dari schema.ts
export * from './schema';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/billion',
});

export const db = drizzle(pool); 