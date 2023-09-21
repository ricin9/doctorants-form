import { db } from '$lib/server/db';
import type { establishment } from '$lib/server/db/schemas/reference';
import { like } from 'drizzle-orm';

type ReferenceTable = establishment;
export async function searchSpecialty(t: ReferenceTable, query: string) {
	return [];
}
