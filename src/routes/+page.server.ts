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

		return { form };
	}
};
