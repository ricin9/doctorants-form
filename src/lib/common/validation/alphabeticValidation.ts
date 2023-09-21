import validator from 'validator';
import { z } from 'zod';

export type AlphabeticStringConfig = {
	lang?: validator.AlphaLocale;
	max?: number;
	min?: number;
	punctuation?: boolean;
};
export function alphabeticStringField(config?: AlphabeticStringConfig) {
	const punctuation = config?.punctuation ? ` ,.:;'،` : ` '`;
	return z
		.string()
		.min(config?.min || 1)
		.max(config?.max || 64)
		.trim()
		.refine((arg) => validator.isAlpha(arg, config?.lang || 'fr-FR', { ignore: punctuation }), {
			message: `ce champ ne doit contenir que des lettres ${
				config?.lang === 'ar-DZ' ? 'arabes' : 'latines'
			}`
		});
}
