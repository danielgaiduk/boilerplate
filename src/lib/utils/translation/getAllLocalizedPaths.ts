import { LOCALES, DEFAULT_LOCALE } from '$lib/constants'
import { extractLocaleFromPathname } from '$lib/utils'

export default function (url: URL): AlternateLinks[] {
	const { origin, pathname, search } = url

	const path = extractLocaleFromPathname(pathname)

	return LOCALES.map((currentLocale) => ({
		href: `${origin}/${currentLocale}/${path}${search}`,
		hreflang: currentLocale === DEFAULT_LOCALE ? 'x-default' : currentLocale
	}))
}
