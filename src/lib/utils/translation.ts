import { toKebabCase } from '$lib/utils'
import { DEFAULT_LOCALE, APP_NAME } from '$lib/config/app.json'
import { LOCALES } from '$lib/config/translation.json'

function parseAcceptLanguage(headerLanguage: string | null): string | null {
	if (!headerLanguage) {
		return null
	}

	const filteredLanguages = []

	for (const acceptedLanguage of headerLanguage?.split(',') || []) {
		const [fullLanguage, rating = '1'] = acceptedLanguage.split(';q=')
		const [language] = fullLanguage.split('-')

		if (language && rating) {
			filteredLanguages.push({ language, rating: parseFloat(rating) })
		}
	}

	const sortedLanguages = filteredLanguages.sort((a, b) => b?.rating - a?.rating) || []

	return sortedLanguages?.[0]?.language
}

function getPreferredLocale(request: Request): string {
	const acceptLanguage = request.headers.get('Accept-Language')
	const preferredLocale = parseAcceptLanguage(acceptLanguage)
	const isPrefferedLocaleAvailable = !!preferredLocale && isLocaleAvailable(preferredLocale)

	return isPrefferedLocaleAvailable ? preferredLocale : DEFAULT_LOCALE
}

function isLocaleAvailable(locale: string | undefined): boolean {
	if (!locale) return false

	return LOCALES?.includes(locale?.toLowerCase())
}

function getLocaleFromRequest(cookie: Record<string, string>, request: Request): string {
	const formattedAppName = toKebabCase(APP_NAME)
	const locale = cookie?.[formattedAppName] ?? getPreferredLocale(request)

	if (locale && isLocaleAvailable(locale)) {
		return locale
	}

	return DEFAULT_LOCALE
}

function buildLocalizedUrl(cookie: Record<string, string>, request: Request, url: URL) {
	const locale = getLocaleFromRequest(cookie, request)
	const [firstElement, ...rest] = url?.pathname?.split('/')?.filter(Boolean) ?? []

	let location = `/${locale}`

	if (firstElement?.length > 2) {
		location += `/${firstElement}`
	}

	if (rest?.length) {
		location += `/${rest?.join('/')}`
	}

	return location
}

export { isLocaleAvailable, buildLocalizedUrl }