import { alias } from 'drizzle-orm/pg-core';
import { db } from '$lib/server/db/index.js';
import {
	doctorantDetails as regDetails,
	doctorateRegistration as reg,
	thesisDirectorDetails as director
} from '$lib/server/db/schemas/registration.js';
import { user } from '$lib/server/db/schemas/user';
import { desc, eq } from 'drizzle-orm';

const coDirector = alias(director, 'coDirector');

const selectedValues = {
	'matricule bac': regDetails.matriculeBac,
	'anne de bac': regDetails.anneBac,
	nom: regDetails.nom,
	prenom: regDetails.prenom,
	email: user.email,
	telephone: regDetails.telephone,
	sexe: regDetails.gender,
	'lieu de naissance': regDetails.lieuNaissance,
	'date de naissance': regDetails.dateNaissance,
	'nom arabe': regDetails.nomAr,
	'prenom arabe': regDetails.prenomAr,
	'lieu de naissance arabe': regDetails.lieuNaissanceAr,
	domaine: regDetails.domain,
	filiere: regDetails.filiere,
	specialité: regDetails.speciality,
	'annee de premiere inscription': regDetails.anneePremiereInscription,
	'annee prevue de soutenance': regDetails.annePrevueSoutenance,
	'type de doctorat': regDetails.typeDoctorat,
	'laboratore de rattachement': regDetails.laboratoiteRattachement,
	'situation professionnelle': regDetails.situationProfessionnelle,
	discplines: regDetails.disciplines,
	'titre de thèse': regDetails.titreThese,
	'etat avancement': regDetails.etatAvancement,
	'nom directeur': director.nom,
	'prenom directeur': director.prenom,
	'grade directeur': director.grade,
	'etablissement directeur': director.etablissement,
	'nom co-directeur': coDirector.nom,
	'prenom co-directeur': coDirector.prenom,
	'grade co-directeur': coDirector.grade,
	'etablissement co-directeur': coDirector.etablissement
};

export const getAllRegistrations = db
	.select(selectedValues)
	.from(reg)
	.innerJoin(user, eq(reg.user, user.id))
	.innerJoin(regDetails, eq(reg.doctorantDetails, regDetails.id))
	.innerJoin(director, eq(reg.thesisDirectorDetails, director.id))
	.leftJoin(coDirector, eq(reg.thesisCoDirectorDetails, director.id))
	.orderBy(desc(reg.createdAt))
	.prepare('getAllRegistrations');
