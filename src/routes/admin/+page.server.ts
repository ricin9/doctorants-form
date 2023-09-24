import { getRegistrationsCount } from './getRegistrations';

export async function load() {
	const [{ count }] = await getRegistrationsCount.execute();

	return {
		registrationsCount: count
	};
}
