import { integer, pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';
import {
	directorGradePgEnum,
	doctorateTypePgEnum,
	genderPgEnum,
	situationProfessionnellePgEnum
} from './reference';
import { user } from './user';

export const doctorateRegistration = pgTable('doctorate_registration', {
	id: integer('id')
		.primaryKey()
		.references(() => user.id, { onDelete: 'cascade' }),

	doctorantDetails: serial('doctorant_details')
		.references(() => doctorantDetails.id, { onDelete: 'cascade' })
		.notNull(),

	thesisDirectorDetails: serial('thesis_director_details')
		.references(() => thesisDirectorDetails.id, { onDelete: 'cascade' })
		.notNull(),
	thesisCoDirectorDetails: serial('thesis_co_director_details').references(
		() => thesisDirectorDetails.id,
		{ onDelete: 'cascade' }
	),

	file: varchar('file', { length: 255 }),
	recuPayment: varchar('recu_payment', { length: 255 }),
	createdAt: timestamp('created_at', { mode: 'string' }).defaultNow().notNull()
});

export const doctorantDetails = pgTable('doctorant_details', {
	id: integer('id')
		.primaryKey()
		.references(() => user.id, { onDelete: 'cascade' }),
	anneBac: integer('anne_bac').notNull(),
	matriculeBac: integer('matricule_bac').notNull(),
	anneePremiereInscription: integer('annee_premiere_inscription'),
	nom: varchar('first_name', { length: 255 }).notNull(),
	prenom: varchar('last_name', { length: 255 }).notNull(),
	lieuNaissance: varchar('location_birth', { length: 255 }).notNull(),
	dateNaissance: varchar('date_birth', { length: 255 }).notNull(),
	gender: genderPgEnum('gender').notNull(),
	nomAr: varchar('first_name_ar', { length: 255 }).notNull(),
	prenomAr: varchar('last_name_ar', { length: 255 }).notNull(),
	lieuNaissanceAr: varchar('location_birth_ar', { length: 255 }).notNull(),
	typeDoctorat: doctorateTypePgEnum('doctorate_type').notNull(),
	annePrevueSoutenance: integer('soutenance_expected_date').notNull(),
	telephone: varchar('telephone', { length: 255 }).notNull(),
	domain: varchar('domain', { length: 255 }).notNull(),
	filiere: varchar('filiere', { length: 255 }).notNull(),
	speciality: varchar('speciality', { length: 255 }).notNull(),

	laboratoiteRattachement: varchar('laboratoite_rattachement', { length: 255 }).notNull(),
	disciplines: varchar('disciplines', { length: 255 }).notNull(),
	titreThese: varchar('titre_these', { length: 512 }).notNull(),
	etatAvancement: varchar('etat_avancement', { length: 512 }).notNull(),
	situationProfessionnelle: situationProfessionnellePgEnum('situation_professionnelle').notNull()
});

export const thesisDirectorDetails = pgTable('directeur_these', {
	id: serial('id').primaryKey(),
	nom: varchar('first_name', { length: 255 }).notNull(),
	prenom: varchar('last_name', { length: 255 }).notNull(),
	etablissement: varchar('establishment', { length: 255 }).notNull(),
	grade: directorGradePgEnum('grade').notNull()
});
