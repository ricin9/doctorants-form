import * as argon2 from 'argon2';

export async function generateHash(password: string): Promise<string> {
	return await argon2.hash(password);
}

export async function verifyHash(hash: string, password: string): Promise<boolean> {
	return await argon2.verify(hash, password);
}
