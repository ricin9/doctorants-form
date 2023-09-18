import { db } from '$lib/server/db/index.js';
import { user } from '$lib/server/db/schemas/user.js';
import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { generateHash } from '$lib/server/crypto.js';

const schema = z
	.object({
		email: z.string().email().toLowerCase().trim(),
		password: z.string().min(8).max(64),
		confirmPassword: z.string().min(8).max(64)
	})
	.superRefine((val, ctx) => {
		if (val.password !== val.confirmPassword) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'les mots de passe ne correspondent pas',
				path: ['confirmPassword']
			});
		}
	});

export const load = async () => {
	// Server API:
	const form = await superValidate(schema);

	// Always return { form } in load and form actions.
	return { form };
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, schema);
		console.log('POST', form);

		if (!form.valid) {
			// Again, always return { form } and things will just work.
			return fail(400, { form });
		}

		try {
			await db.insert(user).values({
				email: form.data.email,
				password: await generateHash(form.data.password)
			});
		} catch (err) {
			setError(form, 'email', 'cet email est déjà utilisé');
			return { form };
		}
		// Yep, return { form } here too
		throw redirect(303, '/login?success=true');
	}
};
