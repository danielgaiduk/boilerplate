import get_locale_from_request from '$lib/utils/get_locale_from_request'

export default function (cookie: Cookie, request: Request, url: URL): string {
	const locale = get_locale_from_request(cookie, request)
	const [fragment, ...rest] = url?.pathname?.split('/')?.filter(Boolean) ?? []

	let location = `/${locale}`

	if (fragment?.length > 2) {
		location += `/${fragment}`
	}

	if (rest?.length) {
		location += `/${rest?.join('/')}`
	}

	return location
}
