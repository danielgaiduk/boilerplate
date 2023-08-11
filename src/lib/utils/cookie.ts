import dayjs from 'dayjs'
import { KEBAB_APP_NAME } from '$lib/constants'

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

function buildCookie(
	name: string,
	value: string,
	temporal: ITemporal = { amount: 1, unit: 'year' }
) {
	const { amount, unit } = temporal
	const expires = dayjs().add(amount, unit).toDate().toUTCString()

	return `${KEBAB_APP_NAME}_${name}=${value};path=/;secure=true;sameSite=strict;httpOnly=true;expires=${expires}`
}

export { parseCookie, buildCookie }
