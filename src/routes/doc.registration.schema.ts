import { z } from 'zod';
import validator from 'validator';
import { doctorateTypeEnum, genderEnum, gradesEnum } from '../lib/common/formEnums';

function alphabeticStringField(lang: 'ar-DZ' | 'fr-FR' = 'fr-FR', max: number = 50) {
	return z
		.string()
		.min(1)
		.max(max)
		.trim()
		.refine((arg) => validator.isAlpha(arg, lang, { ignore: ' ' }), {
			message: `ce champ ne doit contenir que des lettres ${
				lang === 'ar-DZ' ? 'arabes' : 'latines'
			}`
		});
}

const gradesZodEnum = z.enum(gradesEnum);

export const schema = z
	.object({
		anneBac: z.number().int().min(1960).max(2017),
		matriculeBac: z.number().int().positive(),
		anneePremiereInscription: z.number().int().min(1960).max(2023),
		nom: alphabeticStringField(),
		prenom: alphabeticStringField(),
		lieuNaissance: alphabeticStringField('fr-FR', 100),
		dateNaissance: z.coerce
			.date()
			.min(new Date(1900, 1, 1))
			.max(new Date(new Date().setFullYear(new Date().getFullYear() - 18)))
			.transform((val) => val.toISOString().split('T')[0]),
		gender: z.enum(genderEnum),
		nomAr: alphabeticStringField('ar-DZ'),
		prenomAr: alphabeticStringField('ar-DZ'),
		lieuNaissanceAr: alphabeticStringField('ar-DZ', 100),
		annePrevueSoutenance: z.number().int().min(2023).max(2050),
		typeDoctorat: z.enum(doctorateTypeEnum),
		nomDirecteur: alphabeticStringField(),
		prenomDirecteur: alphabeticStringField(),
		gradeDirecteur: gradesZodEnum,
		etablissementDirecteur: z.number().int().positive('vous devez sélectionner un choix'),
		nomCoDirecteur: alphabeticStringField().optional(),
		prenomCoDirecteur: alphabeticStringField().optional(),
		gradeCoDirecteur: gradesZodEnum.optional(),
		etablissementCoDirecteur: z
			.number()
			.int()
			.positive('vous devez sélectionner un choix')
			.optional(),
		domain: z.number().int().positive('vous devez sélectionner un choix'),
		speciality: z.number().int().positive('vous devez sélectionner un choix'),
		filiere: z.number().int().positive('vous devez sélectionner un choix'),
		autre_speciality: alphabeticStringField('fr-FR', 96).optional()
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
