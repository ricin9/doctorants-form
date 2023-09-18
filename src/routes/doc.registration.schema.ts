import { z } from 'zod';

export const schema = z.object({
	anneBac: z.number().int().min(1960).max(2017),
	matriculeBac: z.number().int().positive(),
    nom : z.string()
	gender: z.enum(['M', 'F']),
	dateNaissance: z
		.date()
		.min(new Date(1900, 1, 1))
		.max(new Date(new Date().setFullYear(new Date().getFullYear() - 18)))
});
