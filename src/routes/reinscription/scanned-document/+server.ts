import { fail, redirect } from '@sveltejs/kit';
import { getUserReinscription } from '../../getUserReinscription';
import { readFile } from 'fs/promises';

export async function GET({ locals }) {
	if (!locals.session) {
		throw redirect(307, '/login');
	}

	const [reg] = await getUserReinscription.execute({ id: locals.session.uid });
	if (!reg || !reg.file) {
		throw fail(404, { message: 'file not found' });
	}

	return new Response(Buffer.from(await readFile(reg.file)));
}
