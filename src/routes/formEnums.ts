// for radio inputs
export const genderOptions = [
	{ value: 'M', label: 'Homme' },
	{ value: 'F', label: 'Femme' }
];

export const typeDoctoratOptions = [
	{ value: 'classique', label: 'Classique' },
	{ value: 'lmd', label: 'LMD' }
];

// academic ranks algeria
export const grades = [
	'Professeur',
	'Maître de conférences classe A',
	'Maître de conférences classe B',
	'Maître assistant classe A',
	'Maître assistant classe B',
	'Directeur de recherche',
	'Chargé de recherche',
	'Maître de recherche classe A',
	'Maître de recherche classe B',
	'Attaché de recherche'
] as const;

export const gradesOptions = grades.map((grade) => ({ id: grade, name: grade }));
