import { initZodI18n } from '$lib/common/zod.i18n.js';
import { generateHash } from '$lib/server/crypto';
import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schemas/user';

export const load = async ({ locals }) => {
	initZodI18n();
	const { session } = locals;

	// admin account
	if (!process.env.ADMIN_PASSWORD) {
		throw new Error('ADMIN_PASSWORD is not set, please set it in environment variables');
	}

	await db
		.insert(user)
		.values({
			email: 'admin@univ-mascara.dz',
			password: await generateHash(process.env.ADMIN_PASSWORD),
			role: 'admin'
		})
		.onConflictDoUpdate({
			target: user.email,
			set: {
				password: await generateHash(process.env.ADMIN_PASSWORD)
			}
		});

	return { session };
};
