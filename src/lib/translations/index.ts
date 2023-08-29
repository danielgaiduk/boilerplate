import { CONFIG } from '$lib/constants'
import i18n from 'sveltekit-i18n'
import type { Config } from 'sveltekit-i18n'

const loaders = []

for (const locale of CONFIG.LOCALES) {
	for (const loader of CONFIG.LOADERS) {
		loaders.push({
			locale,
			key: loader,
			loader: async () => (await import(`./${locale}/${loader}.json`)).default
		})
	}
}

const config: Config = {
	fallbackLocale: CONFIG.DEFAULT_LOCALE,
	loaders
}

export const { t, loadTranslations } = new i18n(config)
