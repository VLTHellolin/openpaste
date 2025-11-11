import { drizzle } from 'drizzle-orm/node-postgres';

export const db: ReturnType<typeof drizzle> = drizzle({
  connection: process.env.DATABASE_URL || '',
  casing: 'snake_case',
});
