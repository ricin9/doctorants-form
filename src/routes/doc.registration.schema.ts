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
		nomAr: alphabeticStringField('ar-DZ'),
		prenomAr: alphabeticStringField('ar-DZ'),
		gender: z.enum(['M', 'F']),
		dateNaissance: z.coerce
			.date()
			.min(new Date(1900, 1, 1))
			.max(new Date(new Date().setFullYear(new Date().getFullYear() - 18)))
			.transform((val) => val.toISOString().split('T')[0]),
		lieuNaissance: alphabeticStringField('fr-FR', 100),
		lieuNaissanceAr: alphabeticStringField('ar-DZ', 100)
	})
	.partial();
