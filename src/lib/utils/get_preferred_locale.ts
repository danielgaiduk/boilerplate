import { CONFIG } from '$lib/constants'
import parse_accept_language from '$lib/utils/parse_accept_language'
import is_locale_available from '$lib/utils/is_locale_available'

export default function (request: Request): string {
	const accept_language = request.headers.get('Accept-Language') || ''
	const preferred_locale = parse_accept_language(accept_language)
	const is_preferred_locale_available = !!preferred_locale && is_locale_available(preferred_locale)

	return is_preferred_locale_available ? preferred_locale : CONFIG.DEFAULT_LOCALE
}
