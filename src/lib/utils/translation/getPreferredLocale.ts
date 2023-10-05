import { DEFAULT_LOCALE } from '@constants'
import { parseAcceptLanguage, isLocaleAvailable } from '$lib/utils'

export default function (request: Request): string {
	const acceptLanguage = request.headers.get('Accept-Language') || ''
	const preferredLocale = parseAcceptLanguage(acceptLanguage)
	const isPreferredLocaleAvailable = !!preferredLocale && isLocaleAvailable(preferredLocale)

	return isPreferredLocaleAvailable ? preferredLocale : DEFAULT_LOCALE
}
