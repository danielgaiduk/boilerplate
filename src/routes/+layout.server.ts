import type { LayoutServerLoad } from './$types'

export const load = (async ({ locals: { locale } }) => {
	return { locale }
}) satisfies LayoutServerLoad
