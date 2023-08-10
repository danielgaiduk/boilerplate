import { APP_NAME } from '$lib/config/app.json'
import { toKebabCase } from '$lib/utils'

function parseCookie(request: Request): Record<string, string> {
	const cookie = request.headers.get('cookie')

	if (!cookie) {
		return {}
	}

	const cookies: Record<string, string> = {}

	for (const partial of cookie.split(';')) {
		const [key, value] = partial.split('=')

		cookies[key?.trim()] = value
	}

	return cookies
}

function buildCookie(name: string, value: string) {
	const formattedAppName = toKebabCase(APP_NAME)

	return `${formattedAppName}_${name}=${value};path=/;secure=true;sameSite=strict;httpOnly=true;`
}

export { parseCookie, buildCookie }
