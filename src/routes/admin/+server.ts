import { json } from '@sveltejs/kit';
import { getRegistrations } from './getRegistrations.js';

export async function GET({ url }) {
	const query: string = url.searchParams.get('q') || '';

	const registrations = await getRegistrations(query);
	return json(registrations);
}
