import { z } from 'zod';
import validator from 'validator';

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
export const schema = z
	.object({
		anneBac: z.number().int().min(1960).max(2017),
		matriculeBac: z.number().int().positive(),
		nom: alphabeticStringField(),
		prenom: alphabeticStringField(),
		lieuNaissance: alphabeticStringField('fr-FR', 100),
		dateNaissance: z.coerce
			.date()
			.min(new Date(1900, 1, 1))
			.max(new Date(new Date().setFullYear(new Date().getFullYear() - 18)))
			.transform((val) => val.toISOString().split('T')[0]),
		gender: z.enum(['M', 'F']), // TODO
		nomAr: alphabeticStringField('ar-DZ'),
		prenomAr: alphabeticStringField('ar-DZ'),
		lieuNaissanceAr: alphabeticStringField('ar-DZ', 100),
		annePrevueSoutenance: z.number().int().min(2023).max(2050),
		typeDoctorat: z.enum(['M', 'F']), // TODO
		nomDirecteur: alphabeticStringField(),
		prenomDirecteur: alphabeticStringField(),
		gradeDirecteur: alphabeticStringField(), // TODO
		nomCoDirecteur: alphabeticStringField(),
		prenomCoDirecteur: alphabeticStringField(),
		gradeCoDirecteur: alphabeticStringField() // TODO
	})
	.partial();
