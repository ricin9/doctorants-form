import { establishmentOptions } from '$lib/common/enums';

export async function searchEstablishment(query: string) {
	const establishments = establishmentOptions;
	if (query === '') {
		return establishments;
	}
	return establishments.filter((establishment) =>
		establishment.label.toLocaleLowerCase().includes(query)
	);
}
