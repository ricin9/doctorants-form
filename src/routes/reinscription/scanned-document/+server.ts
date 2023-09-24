import { fail, redirect } from '@sveltejs/kit';
import { getUserReinscription } from '../../getUserReinscription';
import { readFile } from 'fs/promises';
import { UPLOADED_FILE_DEST } from '$env/static/private';

export async function GET({ locals }) {
	if (!locals.session) {
		throw redirect(307, '/login');
	}

	const [reg] = await getUserReinscription.execute({ id: locals.session.uid });
	if (!reg || !reg.file) {
		throw fail(404, { message: 'file not found' });
	}

	const filePath = `${UPLOADED_FILE_DEST}/${reg.file}`;
	return new Response(Buffer.from(await readFile(filePath)));
}
