import { pgEnum, pgTable, serial, varchar } from 'drizzle-orm/pg-core';

// Enums
export const genderEnum = pgEnum('gender', ['male', 'female']);
export const doctorateTypeEnum = pgEnum('doctorateType', ['1', '2']);
export const directorGradeEnum = pgEnum('directorGrade', ['1', '2', '3', '4', '5']);
// Lookup Tables
export const university = pgTable('university', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 255 }).notNull()
});

export type University = typeof university.$inferSelect;

export const domain = pgTable('domain', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 255 }).notNull()
});

export type Domain = typeof domain.$inferSelect;

export const speciality = pgTable('speciality', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 255 }).notNull()
});

export type Speciality = typeof speciality.$inferSelect;
