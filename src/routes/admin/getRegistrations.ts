import { db } from '$lib/server/db/index.js';
import {
	doctorantDetails as regDetails,
	doctorateRegistration as reg
} from '$lib/server/db/schemas/registration.js';
import { user } from '$lib/server/db/schemas/user';
import { desc, eq, sql } from 'drizzle-orm';

export async function getRegistrations(query: string) {
	const queryWildcard = `%${query}%`;

	return await db
		.select({
			nom: regDetails.nom,
			prenom: regDetails.prenom,
			email: user.email,
			telephone: regDetails.telephone,
			lieuNaissance: regDetails.lieuNaissance,
			dateNaissance: regDetails.dateNaissance
		})
		.from(reg)
		.innerJoin(user, eq(reg.user, user.id))
		.where(sql`${regDetails.nom} || ' ' || ${regDetails.prenom} ILIKE ${queryWildcard}`)
		.innerJoin(regDetails, eq(reg.doctorantDetails, regDetails.id))
		.orderBy(desc(reg.createdAt))
		.limit(25);
}
