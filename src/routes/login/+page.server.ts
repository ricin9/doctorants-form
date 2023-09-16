import { verifyHash } from '$lib/server/crypto.js';
import { db } from '$lib/server/db/index.js';
import { user } from '$lib/server/db/schemas/user.js';
import { fail, redirect } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';

export const actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const queryResult = await db
			.select()
			.from(user)
			.where(and(eq(user.email, formData.get('email') as string)))
			.limit(1);

		if (
			queryResult.length === 0 ||
			!(await verifyHash(queryResult[0].password, formData.get('password') as string))
		) {
			return fail(400, {
				error: 'Email ou mot de passe incorrect'
			});
		}

		// success
		// TODO : set cookie
		throw redirect(303, '/dashboard');
	}
};
