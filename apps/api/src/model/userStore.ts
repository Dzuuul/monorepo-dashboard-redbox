import { db, userTable } from '../db/drizzle';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';

export type User = { id: number; email: string; password: string };

export async function registerUser(email: string, password: string): Promise<User> {
  const existing = await db.select().from(userTable).where(eq(userTable.email, email));
  if (existing.length > 0) {
    throw new Error('Email already registered');
  }
  const hashed = await bcrypt.hash(password, 10);
  const inserted = await db.insert(userTable).values({ email, password: hashed }).returning();
  return inserted[0];
}

export async function loginUser(email: string, password: string): Promise<User> {
  const users = await db.select().from(userTable).where(eq(userTable.email, email));
  if (users.length === 0) throw new Error('Invalid credentials');
  const user = users[0];
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error('Invalid credentials');
  return user;
}

export async function findUserByEmail(email: string): Promise<User | undefined> {
  const users = await db.select().from(userTable).where(eq(userTable.email, email));
  return users[0];
} 