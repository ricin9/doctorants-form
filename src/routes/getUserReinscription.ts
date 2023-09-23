import { db } from '$lib/server/db/index.js';
import { doctorateRegistration } from '$lib/server/db/schemas/registration.js';
import { eq, sql } from 'drizzle-orm';

export const getUserReinscription = db
	.select()
	.from(doctorateRegistration)
	.where(eq(doctorateRegistration.id, sql.placeholder('id')))
	.limit(1)
	.prepare('getUserReinscription');
