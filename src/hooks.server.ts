import { getSession } from '$lib/server/session';
import type { Handle } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {
	const { cookies } = event;
	const sid = cookies.get('sid');
	if (sid) {
		const uid = await getSession(sid);
		if (uid) {
			event.locals.uid = uid;
		} else {
			// remove invalid/expired/unknown cookie
			cookies.delete('sid');
		}
	}

	const response = await resolve(event);
	return response;
}) satisfies Handle;
