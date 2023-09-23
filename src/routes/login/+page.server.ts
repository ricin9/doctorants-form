import { verifyHash } from '$lib/server/crypto.js';
import { db } from '$lib/server/db/index.js';
import { user } from '$lib/server/db/schemas/user.js';
import { createSession } from '$lib/server/session.js';
import { fail, redirect } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

const schema = z.object({
	email: z.string().email().toLowerCase().trim(),
	password: z.string().min(8).max(64)
});

export const load = async () => {
	// Server API:
	const form = await superValidate(schema);

	// Always return { form } in load and form actions.
	return { form };
};

export const actions = {
	default: async ({ request, cookies }) => {
		const form = await superValidate(request, schema);

		if (!form.valid) {
			// Again, always return { form } and things will just work.
			return fail(400, { form });
		}

		const queryResult = await db
			.select()
			.from(user)
			.where(and(eq(user.email, form.data.email as string)))
			.limit(1);

		if (
			queryResult.length === 0 ||
			!(await verifyHash(queryResult[0].password, form.data.password))
		) {
			setError(form, '', "l'email ou le mot de passe est incorrect");
			return { form };
		}

		// success
		cookies.set(
			'sid',
			await createSession({ uid: queryResult[0].id.toString(), role: queryResult[0].role })
		);
		throw redirect(303, '/');
	}
};
