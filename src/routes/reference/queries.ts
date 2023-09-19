import { db } from '$lib/server/db';
import { speciality } from '$lib/server/db/schemas/reference';
import { like } from 'drizzle-orm';

export async function searchSpecialty(query: string) {
	return await db
		.select()
		.from(speciality)
		.where(like(speciality.name, `%${query.toLowerCase()}%`))
		.limit(15);
}
