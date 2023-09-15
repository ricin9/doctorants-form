import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import { DATABASE_URL } from '$env/static/private';

// for query purposes
const queryClient = postgres(DATABASE_URL);
export const db: PostgresJsDatabase = drizzle(queryClient);

await migrate(db, { migrationsFolder: 'drizzle' });
