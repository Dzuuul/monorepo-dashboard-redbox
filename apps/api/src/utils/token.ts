import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.API_JWT_SECRET || 'supersecret';

export function generateJWT(payload: object): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyJWT(token: string): any {
  return jwt.verify(token, JWT_SECRET);
}