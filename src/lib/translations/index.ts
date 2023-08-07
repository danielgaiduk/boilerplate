import i18n from 'sveltekit-i18n'
import { LOCALES, LOADERS } from '$lib/config/translation.json'
import { DEFAULT_LOCALE } from '$lib/config/app.json'
import type { Config } from 'sveltekit-i18n'

const loaders = []

for (const locale of LOCALES) {
	for (const loader of LOADERS) {
		loaders.push({
			locale,
			key: loader,
			loader: async () => (await import(`./${locale}/${loader}.json`)).default
		})
	}
}

const config: Config = {
	fallbackLocale: DEFAULT_LOCALE,
	loaders
}

export const { t, loadTranslations } = new i18n(config)
