import { db } from '$lib/server/db/index.js';
import {
	doctorantDetails as details,
	doctorateRegistration as registration,
	thesisDirectorDetails as director
} from '$lib/server/db/schemas/registration.js';
import { redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { alias } from 'drizzle-orm/pg-core';

const coDirector = alias(director, 'coDirector');

export async function load({ locals }) {
	if (!locals.session) {
		throw redirect(307, '/login');
	}
	const [data] = await db
		.select()
		.from(registration)
		.where(eq(registration.id, +locals.session.uid))
		.innerJoin(details, eq(registration.doctorantDetails, details.id))
		.innerJoin(director, eq(registration.thesisDirectorDetails, director.id))
		.leftJoin(coDirector, eq(registration.thesisCoDirectorDetails, coDirector.id))
		.limit(1);

	if (!data) {
		throw redirect(307, '/');
	}

	console.log(data);
	return { registration: data };
}
