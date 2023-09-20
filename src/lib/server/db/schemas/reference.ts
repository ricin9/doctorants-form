import { doctorateTypeEnum, genderEnum, gradesEnum } from '$lib/common/formEnums';
import { pgEnum, pgTable, serial, varchar } from 'drizzle-orm/pg-core';

// Enums
export const genderPgEnum = pgEnum('gender', genderEnum);
export const doctorateTypePgEnum = pgEnum('doctorateType', doctorateTypeEnum);
export const directorGradePgEnum = pgEnum('directorGrade', gradesEnum);

// Lookup Tables

const lookupTableBase = {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 255 }).notNull()
};
export const university = pgTable('establishment', lookupTableBase);
export type University = typeof university.$inferSelect;

export const domain = pgTable('domain', lookupTableBase);
export type Domain = typeof domain.$inferSelect;

export const speciality = pgTable('speciality', lookupTableBase);
export type Speciality = typeof speciality.$inferSelect;

export const filiere = pgTable('filiere', lookupTableBase);
export type Filiere = typeof filiere.$inferSelect;
