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

export { parseCookie }
