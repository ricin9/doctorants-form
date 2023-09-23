// import type { SessionValue } from './lib/server/session';

declare namespace App {
	interface Locals {
		// session?: SessionValue;
		// above is not working for some reason
		session?: {
			uid: string;
			role: 'admin' | 'user';
		};
	}
}
