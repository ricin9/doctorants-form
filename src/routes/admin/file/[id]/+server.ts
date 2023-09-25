import path from 'path';
import fs from 'fs/promises';
import { UPLOADED_FILE_DEST } from '$env/static/private';
import { db } from '$lib/server/db/index.js';
import { doctorateRegistration } from '$lib/server/db/schemas/registration.js';
import { eq } from 'drizzle-orm';
import { getRegistrationFilename } from './getFilename';

export async function GET({ params, url }) {
	if (!parseInt(params.id)) {
		return new Response(null, {
			status: 404
		});
	}

	const isDemande = url.searchParams.get('type') == 'demande'; // demande or recu

	const [reg] = await getRegistrationFilename.execute({ id: +params.id });
	const fileName = isDemande ? reg.file : reg.recu;

	if (!fileName) {
		return new Response(null, {
			status: 404
		});
	}

	const filePath = `${UPLOADED_FILE_DEST}/${fileName}`;

	let fileBuffer: Buffer;

	try {
		fileBuffer = await fs.readFile(path.resolve(filePath));
	} catch (e) {
		// reset file field if file not found
		if (isDemande) {
			await db
				.update(doctorateRegistration)
				.set({ file: null })
				.where(eq(doctorateRegistration.file, fileName))
				.execute();
		} else {
			await db
				.update(doctorateRegistration)
				.set({ recuPayment: null })
				.where(eq(doctorateRegistration.recuPayment, fileName))
				.execute();
		}
		return new Response(null, {
			status: 404
		});
	}

	return new Response(fileBuffer);
}
