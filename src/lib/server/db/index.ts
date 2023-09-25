import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import dotenv from 'dotenv';
import { migrate } from 'drizzle-orm/postgres-js/migrator';

dotenv.config();
// for query purposes
const queryClient = postgres(process.env.DATABASE_URL as string);
export const db: PostgresJsDatabase = drizzle(queryClient);
await migrate(db, { migrationsFolder: 'drizzle' });
