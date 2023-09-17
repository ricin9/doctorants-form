import { createSession } from '$lib/server/session.js';

export async function load({ cookies }) {
	const sid = await createSession('hello_world_uid');

	cookies.set('sid', sid);
}
