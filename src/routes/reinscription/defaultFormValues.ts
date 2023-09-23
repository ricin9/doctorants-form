import type { DoctorateRegistration } from './doc.registration.schema';

// for testing
export const defaultFormValues: DoctorateRegistration = {
	anneBac: 2000,
	matriculeBac: 12345,
	anneePremiereInscription: 2010,
	nom: 'John',
	prenom: 'Doe',
	lieuNaissance: 'Paris France',
	dateNaissance: '1990-01-01',
	gender: 'homme',
	nomAr: 'جون',
	prenomAr: 'دو',
	lieuNaissanceAr: 'باريس فرنسا',
	annePrevueSoutenance: 2025,
	typeDoctorat: 'lmd',
	telephone: '0512345678',

	nomDirecteur: 'Director',
	prenomDirecteur: 'John',
	gradeDirecteur: 'Professeur',
	etablissementDirecteur: 'Université de Mascara – Mustapha Stambouli',

	nomCoDirecteur: undefined,
	prenomCoDirecteur: undefined,
	gradeCoDirecteur: undefined,
	etablissementCoDirecteur: undefined,

	domain: 'Mathématiques et Informatique',
	filiere: 'Informatique',
	speciality: 'Web developpement',

	laboratoiteRattachement: 'Méthodologie de la critique moderne et analyse du discours',
	disciplines: 'Computer Science',
	situationProfessionnelle: 'Salarié hors MESRS',
	titreThese:
		'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate numquam beatae nemo minima vero voluptates praesentium Esse ipsa numquam quis quam. Quod, nisi incidunt. Maiores, vitae magni. Aspernatur, repudiandae eos.  Maiores, vitae magni. Aspernatu',
	etatAvancement:
		'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate numquam beatae nemo minima vero voluptates praesentium Esse ipsa numquam quis quam. Quod, nisi incidunt. Maiores, vitae magni. Aspernatur, repudiandae eos.  Maiores, vitae magni. Aspernatu Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate numquam beatae nemo minima'
};
