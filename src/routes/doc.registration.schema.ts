import { z } from 'zod';
import {
	doctorateTypeEnum,
	domainEnum,
	establishmentEnum,
	filiereEnum,
	genderEnum,
	gradesEnum,
	laboratoiteRattachementEnum,
	situationProfessionnelleEnum
} from '../lib/common/formEnums';
import { alphabeticStringField } from '$lib/common/validation/alphabeticValidation';

export const schema = z
	.object({
		// info personal
		anneBac: z.number().int().min(1960).max(2017),
		matriculeBac: z.number().int().positive(),
		anneePremiereInscription: z.number().int().min(1960).max(2023),
		nom: alphabeticStringField(),
		prenom: alphabeticStringField(),
		lieuNaissance: alphabeticStringField({ max: 100, punctuation: true }),
		dateNaissance: z.coerce
			.date()
			.min(new Date(1900, 1, 1))
			.max(new Date(new Date().setFullYear(new Date().getFullYear() - 18)))
			.transform((val) => val.toISOString().split('T')[0]),
		gender: z.enum(genderEnum),
		nomAr: alphabeticStringField({ lang: 'ar-DZ' }),
		prenomAr: alphabeticStringField({ lang: 'ar-DZ' }),
		lieuNaissanceAr: alphabeticStringField({ lang: 'ar-DZ', max: 100, punctuation: true }),
		annePrevueSoutenance: z.number().int().min(2023).max(2050),
		typeDoctorat: z.enum(doctorateTypeEnum),
		// telephone starts with 05 or 06 or 07
		telephone: z.string().regex(/^(05|06|07)[0-9]{8}$/),

		// info directeur de these
		nomDirecteur: alphabeticStringField(),
		prenomDirecteur: alphabeticStringField(),
		gradeDirecteur: z.enum(gradesEnum),
		etablissementDirecteur: z.enum(establishmentEnum),

		// info co-directeur de these
		nomCoDirecteur: alphabeticStringField().optional(),
		prenomCoDirecteur: alphabeticStringField().optional(),
		gradeCoDirecteur: z.enum(gradesEnum).optional(),
		etablissementCoDirecteur: z.enum(establishmentEnum).optional(),

		// info academique reference
		domain: z.enum(domainEnum),
		filiere: z.enum(filiereEnum),
		speciality: alphabeticStringField({ lang: 'fr-FR', max: 96 }).or(
			alphabeticStringField({ lang: 'ar-DZ', max: 96 })
		),

		//info doctorat
		laboratoiteRattachement: z.enum(laboratoiteRattachementEnum),
		disciplines: alphabeticStringField({ max: 64 }),
		situationProfessionnelle: z.enum(situationProfessionnelleEnum),
		titreThese: alphabeticStringField({ lang: 'fr-FR', max: 255, punctuation: true }).or(
			alphabeticStringField({ lang: 'ar-DZ', max: 280, punctuation: true })
		),
		etatAvancement: alphabeticStringField({ lang: 'fr-FR', max: 350, punctuation: true }).or(
			alphabeticStringField({ lang: 'ar-DZ', max: 350, punctuation: true })
		)
	})
	.superRefine((val, ctx) => {
		// verify if the user has filled all the fields of the co-director or none
		if (
			val.nomCoDirecteur ||
			val.prenomCoDirecteur ||
			val.gradeCoDirecteur ||
			val.gradeCoDirecteur
		) {
			if (
				!val.nomCoDirecteur ||
				!val.prenomCoDirecteur ||
				!val.gradeCoDirecteur ||
				!val.gradeCoDirecteur
			) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'vous devez remplir tous les champs du co-directeur ou aucun'
				});
			}
		}
	});

export type DoctorateRegistration = z.infer<typeof schema>;
