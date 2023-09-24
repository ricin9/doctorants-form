import { db } from '$lib/server/db/index.js';
import { doctorateRegistration } from '$lib/server/db/schemas/registration.js';
import { redirect } from '@sveltejs/kit';
import { eq, sql } from 'drizzle-orm';
import { fail } from '@sveltejs/kit';
import fs from 'node:fs/promises';
import { UPLOADED_FILE_DEST } from '$env/static/private';
import { getUserReinscription } from './getUserReinscription';

const updateUserReinscriptionWithFile = db
	.update(doctorateRegistration)
	.set({
		file: sql.placeholder('file') as unknown as string
	})
	.where(eq(doctorateRegistration.id, sql.placeholder('id')))
	.returning()
	.prepare('getUserReinscription');

export async function load({ locals }) {
	if (!locals.session) {
		throw redirect(307, '/login');
	}
	if (locals.session.role === 'admin') {
		throw redirect(307, '/admin');
	}

	const [reg] = await getUserReinscription.execute({ id: locals.session.uid });
	return { hasReinscription: Boolean(reg), hasUploadedFile: Boolean(reg && reg.file) };
}

export const actions = {
	default: async ({ request, locals }) => {
		if (!locals.session) {
			throw redirect(307, '/login');
		}

		const formData = Object.fromEntries(await request.formData());
		const document = formData.document as File;
		if (!document || document.name === 'undefined') {
			return fail(400, {
				error: true,
				message: 'Vous devez fournir un document'
			});
		}
		if (document.size > 1024 * 1024 * 5) {
			return fail(400, {
				error: true,
				message: 'La taille du document ne doit pas dépasser 5 Mo'
			});
		}
		// check if extension is pdf or png
		const ext = document.name.split('.').pop();
		if (ext !== 'pdf' && ext !== 'png' && ext !== 'jpg' && ext !== 'jpeg') {
			return fail(400, {
				error: true,
				message: 'Le document doit être au format PDF, PNG, JPG ou JPEG'
			});
		}

		const fileName = `reinscription-${locals.session.uid}.${ext}`;
		const filePath = `${UPLOADED_FILE_DEST}/${fileName}`;

		await fs.writeFile(filePath, Buffer.from(await document.arrayBuffer()));

		const updatedReinscription = await updateUserReinscriptionWithFile.execute({
			id: locals.session.uid,
			file: fileName
		});

		if (updatedReinscription.length === 0) {
			await fs.rm(filePath);
			return fail(500, {
				error: true,
				message: 'Une erreur est survenue lors de la mise à jour de votre réinscription'
			});
		}
		return {
			success: true
		};
	}
};
