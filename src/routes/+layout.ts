import { loadTranslations } from '$lib/translations'
import type { LayoutLoad } from './$types'

export const load = (async ({ data: { locale } }) => {
	await loadTranslations(locale)

	return { locale, title: 'Boilerplate title', description: 'Boilerplate description' }
}) satisfies LayoutLoad
