import { CONFIG } from '$lib/constants'

export default function (locale: string): boolean {
	return CONFIG.LOCALES?.includes(locale?.toLowerCase())
}
