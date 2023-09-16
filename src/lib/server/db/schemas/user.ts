import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
	id: serial('id').primaryKey(),
	email: varchar('email', { length: 128 }).notNull().unique(),
	password: varchar('password', { length: 255 }).notNull()
});

export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;
