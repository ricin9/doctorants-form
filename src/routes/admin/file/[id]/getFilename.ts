import { db } from '$lib/server/db/index.js';
import { doctorateRegistration as reg } from '$lib/server/db/schemas/registration.js';
import { eq, sql } from 'drizzle-orm';

export const getRegistrationFilename = db
	.select({ file: reg.file })
	.from(reg)
	.where(eq(reg.id, sql.placeholder('id')))
	.limit(1)
	.prepare('getRegistrationFilename');
