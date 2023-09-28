import { getSession } from '$lib/server/session';
import type { Handle } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {
	const { cookies } = event;
	const sid = cookies.get('sid');
	if (sid) {
		const session = await getSession(sid);
		if (session && session.uid) {
			console.log('SESSION IS TRUTHY');
			event.locals.session = session;
		} else {
			// remove invalid/expired/unknown cookie
			cookies.delete('sid');
		}
	}

	const response = await resolve(event);
	return response;
}) satisfies Handle;
