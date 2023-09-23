import { initZodI18n } from '$lib/common/zod.i18n.js';

export const load = async ({ locals }) => {
	initZodI18n();
	const { session } = locals;
	return { session };
};
