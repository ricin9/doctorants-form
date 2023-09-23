import { alias } from 'drizzle-orm/pg-core';
import { db } from '$lib/server/db/index.js';
import {
	doctorantDetails as regDetails,
	doctorateRegistration as reg,
	thesisDirectorDetails as director,
	doctorantDetails
} from '$lib/server/db/schemas/registration.js';
import { user } from '$lib/server/db/schemas/user';
import { eq, getTableColumns, sql } from 'drizzle-orm';

const coDirector = alias(director, 'coDirector');
export const getReinscriptionData = db
	.select({
		...getTableColumns(doctorantDetails),
		nomDirecteur: director.nom,
		prenomDirecteur: director.prenom,
		gradeDirecteur: director.grade,
		etablissementDirecteur: director.etablissement,
		nomCoDirecteur: coDirector.nom,
		prenomCoDirecteur: coDirector.prenom,
		gradeCoDirecteur: coDirector.grade,
		etablissementCoDirecteur: coDirector.etablissement
	})
	.from(reg)
	.where(eq(reg.id, sql.placeholder('id')))
	.innerJoin(regDetails, eq(reg.doctorantDetails, regDetails.id))
	.innerJoin(user, eq(reg.id, user.id))
	.innerJoin(director, eq(reg.thesisDirectorDetails, director.id))
	.leftJoin(coDirector, eq(reg.thesisCoDirectorDetails, director.id))
	.limit(1)
	.prepare('getAllRegistrations');
