import { loadTranslations } from '$lib/translations'
import type { LayoutLoad } from './$types'

const load = (async ({ data }) => {
	await loadTranslations(data.locale as string)
}) satisfies LayoutLoad

export { load }
