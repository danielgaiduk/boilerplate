import { DEFAULT_LOCALE, APP_NAME } from '$lib/config/app.json'
import { LOCALES } from '$lib/config/translation.json'
import { toKebabCase } from '$lib/utils'

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
	const cookieLocale = cookie?.[`${formattedAppName}_locale`]
	const preferredLocale = getPreferredLocale(request)
	const locale = cookieLocale ?? preferredLocale

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

function getPathnameFragments(pathname: string): string[] {
	return pathname?.split('/')?.filter(Boolean) ?? []
}

function extractLocaleFromPathname(pathname: string): string {
	const [, ...rest] = getPathnameFragments(pathname)

	return rest?.join('/') ?? ''
}

function getAllLocalePaths(locale: string, url: URL): IUrlCollection[] {
	const { origin = '', pathname = '', search = '' } = url
	const path = extractLocaleFromPathname(pathname)

	return LOCALES.map((currentLocale) => ({
		href: `${origin}/${path}${search}`,
		hreflang: currentLocale === DEFAULT_LOCALE ? 'x-default' : locale
	}))
}

export { getAllLocalePaths, isLocaleAvailable, buildLocalizedUrl }
