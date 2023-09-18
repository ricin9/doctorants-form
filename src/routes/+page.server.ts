import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { schema } from './doc.registration.schema';

export const load = async ({ locals }) => {
	if (!locals.uid) {
		throw redirect(307, '/login');
	}
	// Server API:
	const form = await superValidate(schema);

	// Always return { form } in load and form actions.
	return { form };
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, schema);

		if (!form.valid) {
			// Again, always return { form } and things will just work.
			return fail(400, { form });
		}

		// try {
		// 	await db.insert(user).values({
		// 		email: form.data.email,
		// 		password: await generateHash(form.data.password)
		// 	});
		// } catch (err) {
		// 	setError(form, 'email', 'cet email est déjà utilisé');
		// 	return { form };
		// }
		return { form };
		// Yep, return { form } here too
		throw redirect(303, '/login?success=true');
	}
};
