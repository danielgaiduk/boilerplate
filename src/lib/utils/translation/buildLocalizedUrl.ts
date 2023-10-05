import { getLocaleFromRequest } from '$lib/utils'

import type { Cookies } from '@sveltejs/kit'

export default function (cookies: Cookies, request: Request, url: URL): string {
	const locale = getLocaleFromRequest(cookies, request)

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
