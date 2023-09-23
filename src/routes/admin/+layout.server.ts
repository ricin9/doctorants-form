import { redirect } from '@sveltejs/kit';

export function load({ locals }) {
	if (!locals.session || locals.session.role !== 'admin') {
		throw redirect(303, '/');
	}
}
