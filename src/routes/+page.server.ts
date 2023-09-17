import { redirect } from '@sveltejs/kit';

export function load({ locals }) {
	if (!locals.uid) {
		throw redirect(307, '/login');
	}
}
