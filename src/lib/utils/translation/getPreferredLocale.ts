import { DEFAULT_LOCALE } from '$lib/constants'
import { parseAcceptLanguage, isLocaleAvailable } from '$lib/utils'

export default function (request: Request): string {
	const accept_language = request.headers.get('Accept-Language') || ''
	const preferred_locale = parseAcceptLanguage(accept_language)
	const is_preferred_locale_available = !!preferred_locale && isLocaleAvailable(preferred_locale)

	return is_preferred_locale_available ? preferred_locale : DEFAULT_LOCALE
}
