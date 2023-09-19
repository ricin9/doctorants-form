export async function searchSpecialty(
	query: string,
	referenceType: string = 'specialty'
): Promise<ReferenceResult[]> {
	const data = await fetch(`/reference?query=${query}&referenceType=${referenceType}`);
	if (!data.ok) {
		return [];
	}

	return await data.json();
}

export type ReferenceResult = {
	id: number;
	name: string;
};
