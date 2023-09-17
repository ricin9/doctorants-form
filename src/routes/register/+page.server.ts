import { db } from '$lib/server/db/index.js';
import { user } from '$lib/server/db/schemas/user.js';
import { fail, redirect } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';

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
				message: 'Les mots de passe ne correspondent pas',
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

		// TODO: Do something with the validated form.data

		// Yep, return { form } here too
		return { form };
		// try {
		// 	const valid = await registrationSchema.parseAsync(formData);
		// } catch (err) {
		// 	console.log('validation error', err);
		// }

		// const queryResult = await db
		// 	.select()
		// 	.from(user)
		// 	.where(and(eq(user.email, formData.get('email') as string)))
		// 	.limit(1);

		// if (
		// 	queryResult.length === 0 ||
		// 	!(await verifyHash(queryResult[0].password, formData.get('password') as string))
		// ) {
		// 	return fail(400, {
		// 		error: 'Email ou mot de passe incorrect'
		// 	});
		// }

		// success
		// TODO : set cookie
		// throw redirect(303, '/dashboard');
	}
};
