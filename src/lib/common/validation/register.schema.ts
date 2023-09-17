import { z } from 'zod';

export const registrationSchema = z
	.object({
		email: z.string().email().toLowerCase().trim(),
		password: z.string().min(8).max(64),
		passwordConfirmation: z.string().min(8).max(64)
	})
	.superRefine((val, ctx) => {
		if (val.password !== val.passwordConfirmation) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Les mots de passe ne correspondent pas',
				path: ['passwordConfirmation']
			});
		}
	});
