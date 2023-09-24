import { dev } from '$app/environment';
import { createSession } from '$lib/server/session.js';

export async function load({ cookies }) {
	if (dev) {
		const sid = await createSession({ uid: '1', role: 'admin' });

		cookies.set('sid', sid);
	}
}
