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

export const domainEnum = [
	'Sciences Economiques, de Gestion et Commerciales',
	'Sciences et Technologies',
	'Mathématiques et Informatique',
	'Sciences de la Nature et de la Vie',
	'Sciences Humaines et Sociales',
	'Sciences de la Matière',
	"Sciences de la terre et de l'Univers",
	'Lettres et Langues Etrangères',
	'Langue et Littérature Arabes',
	'Droit et Sciences Politiques'
] as const;

export const filiereEnum = [
	'Sciences Economiques',
	'Electrotechnique',
	'Informatique',
	'Génie Mécanique',
	'Sciences de Gestion',
	'Sciences Agronomiques',
	'Sciences Sociales - Philosophie',
	'Electronique',
	'Télécommunications',
	'Génie des Procédés',
	'Hydraulique',
	'Mathématiques',
	'Sciences Humaines - Histoire',
	'Physique',
	'Automatique',
	'Chimie',
	'Géographie et Aménagement du Territoire',
	'Sciences Biologiques',
	'Langue Française',
	'Géologie',
	'Sciences Sociales - Sociologie',
	'Sciences Commerciales',
	'Sciences Sociales - Psychologie',
	'Biotechnologies',
	'Sciences Financières et Comptabilité',
	'Sciences Sociales',
	'Etudes Littéraires',
	'Droit',
	"Génie de l'Environnement",
	'Etudes Linguistiques',
	'Sciences Alimentaires',
	'Langue Anglaise',
	'Etudes Critiques',
	'Hydrobiologie Marine et Continentale',
	'Génie Civil',
	'Electromécanique',
	'Travaux Publics',
	'Langue et Littérature Arabes'
] as const;

// options for select/radio inputs
// sort array before mapping

function enumToOption(arr: readonly string[]) {
	return arr.toSorted().map((val) => ({ value: val, label: val }));
}
export const genderOptions = enumToOption(genderEnum);
export const gradesOptions = enumToOption(gradesEnum);
export const doctorateTypeOptions = enumToOption(doctorateTypeEnum);
export const situationProfessionnelleOptions = enumToOption(situationProfessionnelleEnum);
export const domainOptions = enumToOption(domainEnum);
export const filiereOptions = enumToOption(filiereEnum);
