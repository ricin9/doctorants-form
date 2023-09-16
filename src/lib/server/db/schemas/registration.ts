import { date, integer, pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import {
	directorGradeEnum,
	doctorateTypeEnum,
	domain,
	genderEnum,
	speciality,
	university
} from './reference';
import { user } from './user';

export const doctorateRegistration = pgTable('doctorate_registration', {
	id: serial('id').primaryKey(),
	user: serial('user')
		.references(() => user.id)
		.notNull(),
	doctorantDetails: serial('doctorant_details')
		.references(() => doctorantDetails.id)
		.notNull(),
	thesisDirectorDetails: serial('thesis_director_details')
		.references(() => thesisDirectorDetails.id)
		.notNull(),
	thesisCoDirectorDetails: serial('thesis_co_director_details')
		.references(() => thesisDirectorDetails.id)
		.notNull()
});

export const doctorantDetails = pgTable('doctorant_details', {
	id: serial('id').primaryKey(),
	bacYear: integer('bac_year').notNull(),
	matriculeBac: integer('matricule_bac').notNull(),
	first_name: varchar('first_name', { length: 255 }).notNull(),
	last_name: varchar('last_name', { length: 255 }).notNull(),
	first_name_ar: varchar('first_name_ar', { length: 255 }).notNull(),
	last_name_ar: varchar('last_name_ar', { length: 255 }).notNull(),
	location_birth: varchar('location_birth', { length: 255 }).notNull(),
	location_birth_ar: varchar('location_birth_ar', { length: 255 }).notNull(),
	date_birth: varchar('date_birth', { length: 255 }).notNull(),
	gender: genderEnum('gender').notNull(),
	domain: serial('domain')
		.references(() => domain.id)
		.notNull(),
	specialty: serial('specialty')
		.references(() => speciality.id)
		.notNull(),
	specialtyOther: varchar('specialty_other', { length: 255 }),
	doctorateType: doctorateTypeEnum('doctorate_type').notNull(),
	yearFirstRegistration: integer('year_first_registration').notNull(),
	soutenanceExpectedDate: date('soutenance_expected_date').notNull()
});

export const thesisDirectorDetails = pgTable('thesis_director_details', {
	id: serial('id').primaryKey(),
	first_name: varchar('first_name', { length: 255 }).notNull(),
	last_name: varchar('last_name', { length: 255 }).notNull(),
	establishment: serial('establishment')
		.references(() => university.id)
		.notNull(),
	grade: directorGradeEnum('grade').notNull()
});
