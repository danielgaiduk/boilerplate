import { getLocaleFromRequest } from '$lib/utils'

export default function (cookie: Cookie, request: Request, url: URL): string {
	const locale = getLocaleFromRequest(cookie, request)
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
