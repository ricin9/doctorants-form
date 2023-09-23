import { createSession } from '$lib/server/session.js';

export async function load({ cookies }) {
	const sid = await createSession({ uid: '1', role: 'user' });

	cookies.set('sid', sid);
}
