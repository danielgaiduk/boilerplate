import { CONFIG } from '$lib/constants'
import extract_locale_from_pathname from '$lib/utils/extract_locale_from_pathname'

export default function (locale: string, url: URL): AlternateLinks[] {
	const { origin, pathname, search } = url

	const path = extract_locale_from_pathname(pathname)

	return CONFIG.LOCALES.map((currentLocale) => ({
		href: `${origin}/${currentLocale}/${path}${search}`,
		hreflang: currentLocale === CONFIG.DEFAULT_LOCALE ? 'x-default' : locale
	}))
}
