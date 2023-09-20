import { json } from '@sveltejs/kit';
import { schema, type ReferenceParams } from './schema.js';
import { searchSpecialty } from './queries.js';
import { speciality } from '$lib/server/db/schemas/reference.js';

export async function GET({ url }) {
	let params: ReferenceParams;
	try {
		params = schema.parse({
			query: url.searchParams.get('query'),
			referenceType: url.searchParams.get('referenceType')
		});
	} catch (err) {
		return new Response(undefined, { status: 400 });
	}

	return json(await searchSpecialty(speciality, params.query));
}
