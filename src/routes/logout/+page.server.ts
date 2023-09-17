import { redirect } from '@sveltejs/kit';
import { deleteSession } from '$lib/server/session';

export const load = ({ cookies }) => {
	const sid = cookies.get('sid');
	if (sid) {
		cookies.delete('sid');
		deleteSession(sid);
	}

	throw redirect(303, '/');
};
