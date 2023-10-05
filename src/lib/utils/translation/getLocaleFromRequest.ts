import { DEFAULT_LOCALE, LOCALE_COOKIE_NAME } from '$lib/constants'
import { getPreferredLocale, isLocaleAvailable } from '$lib/utils'

import type { Cookies } from '@sveltejs/kit'

export default function (cookies: Cookies, request: Request): string {
	const locale = cookies.get(LOCALE_COOKIE_NAME) ?? getPreferredLocale(request)

	if (locale && isLocaleAvailable(locale)) {
		return locale
	}

	return DEFAULT_LOCALE
}
