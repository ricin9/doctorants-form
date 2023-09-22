import { json, redirect } from '@sveltejs/kit';
import { getRegistrations } from './getRegistrations.js';

export async function GET({ locals, url }) {
	if (!locals.uid) {
		throw redirect(303, '/login');
	}
	const query: string = url.searchParams.get('q') || '';

	const registrations = await getRegistrations(query);
	return json(registrations);
}
