import path from 'path';
import fs from 'fs/promises';
import { UPLOADED_FILE_DEST } from '$env/static/private';
import { db } from '$lib/server/db/index.js';
import { doctorateRegistration } from '$lib/server/db/schemas/registration.js';
import { eq } from 'drizzle-orm';
import { getRegistrationFilename } from './getFilename';

export async function GET({ params }) {
	if (!parseInt(params.id)) {
		return new Response(null, {
			status: 404
		});
	}

	const [{ file: fileName }] = await getRegistrationFilename.execute({ id: +params.id });

	if (!fileName) {
		return new Response(null, {
			status: 404
		});
	}

	const filePath = `${UPLOADED_FILE_DEST}/${fileName}`;

	let fileBuffer: Buffer;
	// send file to the client
	try {
		fileBuffer = await fs.readFile(path.resolve(filePath));
	} catch (e) {
		await db
			.update(doctorateRegistration)
			.set({ file: null })
			.where(eq(doctorateRegistration.file, fileName))
			.execute();
		return new Response(null, {
			status: 404
		});
	}

	return new Response(fileBuffer, {
		headers: {
			'Content-Disposition': `attachment; filename=${fileName}`
		}
	});
}
