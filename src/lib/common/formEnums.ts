export const genderEnum = ['homme', 'femme'] as const;

export const doctorateTypeEnum = ['classique', 'lmd'] as const;

export const gradesEnum = [
	'Professeur',
	'Maître de conférences classe A',
	'Maître de conférences classe B',
	'Maître assistant classe A',
	'Maître assistant classe B',
	'Directeur de recherche',
	'Chargé de recherche',
	'Maître de recherche classe A',
	'Maître de recherche classe B',
	'Attaché de recherche A',
	'Attaché de recherche B'
] as const;

export const situationProfessionnelleEnum = [
	'Maître assistant classe A',
	'Maître assistant classe B',
	'Attaché de recherche A',
	'Attaché de recherche B',
	'Salarié MESRS non enseignant',
	'Salarié hors MESRS',
	'Non salarié'
] as const;

// options for select/radio inputs
export const genderOptions = genderEnum.map((val) => ({ value: val, label: val }));
export const doctorateTypeOptions = doctorateTypeEnum.map((val) => ({ value: val, label: val }));
export const gradesOptions = gradesEnum.map((val) => ({ value: val, label: val }));
export const situationProfessionnelleOptions = situationProfessionnelleEnum.map((val) => ({
	value: val,
	label: val
}));
