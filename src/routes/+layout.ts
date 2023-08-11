import { loadTranslations } from '$lib/translations'
import type { LayoutLoad } from './$types'

const load = (async ({ data: { locale } }) => {
	await loadTranslations(locale as string)

	return { locale }
}) satisfies LayoutLoad

export { load }
