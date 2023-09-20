import { db } from '$lib/server/db';
import { domain, speciality } from '$lib/server/db/schemas/reference';
import { like } from 'drizzle-orm';

type ReferenceTable = typeof speciality | typeof domain;
export async function searchSpecialty(t: ReferenceTable, query: string) {
	return await db
		.select()
		.from(t)
		.where(like(speciality.name, `%${query.toLowerCase()}%`))
		.limit(15);
}
