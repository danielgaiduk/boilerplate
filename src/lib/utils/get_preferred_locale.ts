import { CONFIG } from '$lib/constants'
import parse_accept_language from '$lib/utils/parse_accept_language'
import is_locale_available from '$lib/utils/is_locale_available'

export default function (request: Request): string {
	const acceptLanguage = request.headers.get('Accept-Language')
	const preferredLocale = parse_accept_language(acceptLanguage)
	const isPrefferedLocaleAvailable = !!preferredLocale && is_locale_available(preferredLocale)

	return isPrefferedLocaleAvailable ? preferredLocale : CONFIG.DEFAULT_LOCALE
}
