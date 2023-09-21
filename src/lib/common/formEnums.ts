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

export const laboratoiteRattachementEnum = [
	'Laboratoire Management des Collectivités Locales et Développement Local',
	"Laboratoire d'Analyse, de Prospective et de Développement des Emplois et des Compétences",
	'Laboratoire de PME, Recherche et Innovation',
	'Laboratoire de Chimie Organique, Macromoléculaire et des Matériaux',
	'Laboratoire des Matériaux, Applications et Environnement',
	'Laboratoire de physique quantique de la matière et modélisation mathématique',
	"Laboratoire des sciences et techniques de l'eau",
	'Laboratoire de Génie des Procédés et Chimie des Solutions',
	'Laboratoire de Recherche sur les Systèmes Biologiques et la Géomatique',
	'Laboratoire Géo Environnement et Développement des Espaces',
	'Chimie Physique des Macromolécules et Interfaces Biologiques',
	'Laboratoire de Bioconversion, Génie Microbiologique et Sécurité Sanitaire',
	'Méthodologie de la critique moderne et analyse du discours',
	"Laboratoire de l'ingénierie des programmes de langue dans les filières de spécialité",
	'Laboratoire des Recherches Sociologiques et Historiques',
	'Laboratoire Législations des Droits Economiques',
	'Les outils juridiques de la politique foncière',
	'Laboratoire de Géomatique, Ecologie et Environnement',
	'Laboratoire de Linguistique Arabe et Analyse des Textes',
	"Laboratoire d'analyse des systèmes"
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
export const laboratoiteRattachementOptions = enumToOption(laboratoiteRattachementEnum);
