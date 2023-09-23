import { fail } from '@sveltejs/kit';
import { getRegistrationById } from '../export/getRegistrations.js';

export async function load({ params }) {
	const { id } = params;

	const [registration] = await getRegistrationById.execute({ id });

	if (!registration) {
		throw fail(404);
	}

	return { registration };
}
