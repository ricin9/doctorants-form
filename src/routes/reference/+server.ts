import { json } from '@sveltejs/kit';
import { schema, type ReferenceParams } from './schema.js';

export function GET({ url }) {
	let params: ReferenceParams;
	try {
		params = schema.parse({
			query: url.searchParams.get('query'),
			referenceType: url.searchParams.get('referenceType')
		});
	} catch (err) {
		return new Response(null, { status: 400 });
	}

	// todo : drizzle query
	return json(params);
}
