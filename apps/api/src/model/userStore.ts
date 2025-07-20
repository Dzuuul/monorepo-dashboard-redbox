import { db, users } from '../db/drizzle';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';

export type User = { id: number; email: string; password: string };

export async function registerUser(email: string, password: string): Promise<User> {
  const existing = await db.select().from(users).where(eq(users.email, email));
  if (Array.isArray(existing) && existing.length > 0) {
    throw new Error('Email already registered');
  }
  const hashed = await bcrypt.hash(password, 10);
  const inserted = await db.insert(users).values({ email, password: hashed }).returning();
  if (!Array.isArray(inserted) || inserted.length === 0) throw new Error('Failed to register user');
  return inserted[0] as User;
}

export async function loginUser(email: string, password: string): Promise<User> {
  const usersResult = await db.select().from(users).where(eq(users.email, email));
  if (!Array.isArray(usersResult) || usersResult.length === 0) throw new Error('Invalid credentials');
  const user = usersResult[0] as User;
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error('Invalid credentials');
  return user;
}

export async function findUserByEmail(email: string): Promise<User | undefined> {
  const usersResult = await db.select().from(users).where(eq(users.email, email));
  if (!Array.isArray(usersResult) || usersResult.length === 0) return undefined;
  return usersResult[0] as User;
} 