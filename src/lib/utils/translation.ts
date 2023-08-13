import { CONFIG, LOCALE_COOKIE_NAME } from '$lib/constants'

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

	return isPrefferedLocaleAvailable ? preferredLocale : CONFIG.DEFAULT_LOCALE
}

function isLocaleAvailable(locale: string | undefined): boolean {
	if (!locale) return false

	return CONFIG.LOCALES?.includes(locale?.toLowerCase())
}

function getLocaleFromRequest(cookie: Record<string, string>, request: Request): string {
	const locale = cookie?.[LOCALE_COOKIE_NAME] ?? getPreferredLocale(request)

	if (locale && isLocaleAvailable(locale)) {
		return locale
	}

	return CONFIG.DEFAULT_LOCALE
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

function getPathnameFragments(pathname: string): string[] {
	return pathname?.split('/')?.filter(Boolean) ?? []
}

function extractLocaleFromPathname(pathname: string): string {
	const [, ...rest] = getPathnameFragments(pathname)

	return rest?.join('/') ?? ''
}

function getAllLocalizedPaths(locale: string, url: URL): IAlternateLinks[] {
	const { origin = '', pathname = '', search = '' } = url
	const path = extractLocaleFromPathname(pathname)

	return CONFIG.LOCALES.map((currentLocale) => ({
		href: `${origin}/${path}${search}`,
		hreflang: currentLocale === CONFIG.DEFAULT_LOCALE ? 'x-default' : locale
	}))
}

export { getAllLocalizedPaths, isLocaleAvailable, buildLocalizedUrl }
