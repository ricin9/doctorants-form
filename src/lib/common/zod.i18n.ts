import i18next from 'i18next';
import { z } from 'zod';
import { zodI18nMap } from 'zod-i18n-map/dist/index.mjs';
// Import your language translation files
import translation from 'zod-i18n-map/locales/fr/zod.json';

// lng and resources key depend on your locale.
export function initZodI18n() {
	i18next.init({
		lng: 'fr',
		resources: {
			fr: { zod: translation }
		}
	});
	z.setErrorMap(zodI18nMap);
}
