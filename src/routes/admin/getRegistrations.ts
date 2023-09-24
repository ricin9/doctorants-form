import { db } from '$lib/server/db/index.js';
import {
	doctorantDetails as regDetails,
	doctorateRegistration as reg
} from '$lib/server/db/schemas/registration.js';
import { user } from '$lib/server/db/schemas/user';
import { desc, eq, sql } from 'drizzle-orm';

export const getRegistrations = db
	.select({
		id: reg.id,
		nom: regDetails.nom,
		prenom: regDetails.prenom,
		email: user.email,
		telephone: regDetails.telephone,
		lieuNaissance: regDetails.lieuNaissance,
		dateNaissance: regDetails.dateNaissance,
		file: reg.file,
		createdAt: reg.createdAt
	})
	.from(reg)
	.innerJoin(user, eq(reg.id, user.id))
	.where(sql`${regDetails.nom} || ' ' || ${regDetails.prenom} ILIKE ${sql.placeholder('query')}`)
	.innerJoin(regDetails, eq(reg.doctorantDetails, regDetails.id))
	.orderBy(desc(reg.createdAt))
	.limit(25);

export const getRegistrationsCount = db
	.select({
		count: sql<number>`COUNT(*)`
	})
	.from(reg)
	.prepare('getRegistrationsCount');
