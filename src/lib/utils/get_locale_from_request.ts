import { CONFIG, LOCALE_COOKIE_NAME } from '$lib/constants'
import get_preferred_locale from '$lib/utils/get_preferred_locale'
import is_locale_available from '$lib/utils/is_locale_available'

export default function (cookie: Cookie, request: Request): string {
	const locale = cookie?.[LOCALE_COOKIE_NAME] ?? get_preferred_locale(request)

	if (locale && is_locale_available(locale)) {
		return locale
	}

	return CONFIG.DEFAULT_LOCALE
}
