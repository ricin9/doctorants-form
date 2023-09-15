import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
    id : serial('id').primaryKey(),
    name : varchar('name').notNull(),
})

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
