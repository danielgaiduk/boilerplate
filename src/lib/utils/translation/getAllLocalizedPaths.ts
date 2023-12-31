import { LOCALES, DEFAULT_LOCALE } from '$constants'
import { extractLocaleFromPathname } from '$lib/utils'

export default function (url: URL): { href: string; hreflang: string }[] {
	const { origin, pathname, search } = url

	const path = extractLocaleFromPathname(pathname)

	return LOCALES.map((currentLocale) => ({
		href: `${origin}/${currentLocale}/${path}${search}`,
		hreflang: currentLocale === DEFAULT_LOCALE ? 'x-default' : currentLocale
	}))
}
