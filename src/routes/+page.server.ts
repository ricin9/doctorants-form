import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { schema } from './doc.registration.schema';
import { createDoctorateRegistration } from './registration.query';
import { defaultFormValues } from './defaultFormValues';

export const load = async ({ locals }) => {
	if (!locals.session) {
		throw redirect(307, '/login');
	}
	// Server API:
	const form = await superValidate(defaultFormValues, schema);

	// Always return { form } in load and form actions.
	return { form };
};

export const actions = {
	default: async ({ request, locals }) => {
		if (!locals.session) {
			throw redirect(303, '/login');
		}
		const form = await superValidate(request, schema);

		if (!form.valid) {
			// Again, always return { form } and things will just work.
			return fail(400, { form });
		}

		try {
			await createDoctorateRegistration(locals.session.uid, form.data);
		} catch (err) {
			return fail(500, { form });
		}
		throw redirect(303, '/print');
	}
};
