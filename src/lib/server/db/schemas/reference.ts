import {
	doctorateTypeEnum,
	domainEnum,
	filiereEnum,
	genderEnum,
	gradesEnum,
	laboratoiteRattachementEnum,
	situationProfessionnelleEnum
} from '$lib/common/formEnums';
import { pgEnum, pgTable, serial, varchar } from 'drizzle-orm/pg-core';

// Enums
export const genderPgEnum = pgEnum('gender', genderEnum);
export const doctorateTypePgEnum = pgEnum('doctorateType', doctorateTypeEnum);
export const directorGradePgEnum = pgEnum('directorGrade', gradesEnum);
export const situationProfessionnellePgEnum = pgEnum(
	'situationProfessionnelle',
	situationProfessionnelleEnum
);
export const domainPgEnum = pgEnum('domain', domainEnum);
export const filierePgEnum = pgEnum('filiere', filiereEnum);
export const laboratoiteRattachementPgEnum = pgEnum(
	'laboratoiteRattachement',
	laboratoiteRattachementEnum
);

// Lookup Tables

const lookupTableBase = {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 255 }).notNull()
};
export const establishment = pgTable('establishment', lookupTableBase);
export type establishment = typeof establishment.$inferSelect;
