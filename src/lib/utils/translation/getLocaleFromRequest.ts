import { DEFAULT_LOCALE, LOCALE_COOKIE_NAME } from '$lib/constants'
import { getPreferredLocale, isLocaleAvailable } from '$lib/utils'

export default function (cookie: Cookie, request: Request): string {
	const locale = cookie?.[LOCALE_COOKIE_NAME] ?? getPreferredLocale(request)

	if (locale && isLocaleAvailable(locale)) {
		return locale
	}

	return DEFAULT_LOCALE
}
