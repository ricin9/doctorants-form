import { cache } from './cache';
import { randomBytes } from 'node:crypto';

const ONE_DAY = 60 * 60 * 24;

export async function getSessionFromCache(sid: string): Promise<string | null> {
	return await cache.get(sid);
}

function getSid(): string {
	return randomBytes(32).toString('hex');
}

export async function createSession(userId: string): Promise<string> {
	let sid = '';

	do {
		sid = getSid();
	} while ((await cache.exists(sid)) !== 0);

	await cache.set(sid, userId, 'EX', ONE_DAY);

	return sid;
}

export async function getSession(sid: string): Promise<string | null> {
	return await cache.get(sid);
}

export async function deleteSession(sid: string): Promise<void> {
	await cache.del(sid);
}
