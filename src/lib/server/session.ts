import { cache } from './cache';
import { randomBytes } from 'node:crypto';
import type { roleEnum } from '$lib/common/enums';

const ONE_DAY = 60 * 60 * 24;

export type SessionValue = {
	uid: string;
	role: (typeof roleEnum)[number];
};

function getSid(): string {
	return randomBytes(32).toString('hex');
}

export async function createSession(sessionData: SessionValue): Promise<string> {
	let sid = '';

	do {
		sid = getSid();
	} while ((await cache.exists(sid)) !== 0);

	await cache.hset(sid, sessionData);
	await cache.expire(sid, ONE_DAY);

	return sid;
}

export async function getSession(sid: string): Promise<SessionValue> {
	return (await cache.hgetall(sid)) as unknown as SessionValue;
}

export async function deleteSession(sid: string): Promise<void> {
	await cache.del(sid);
}
