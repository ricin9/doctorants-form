import { z } from 'zod';

export const schema = z.object({
	query: z.string().toLowerCase().trim(),
	referenceType: z.enum(['domain', 'filiere', 'establishment', 'specialty'])
});

export type ReferenceParams = z.infer<typeof schema>;
