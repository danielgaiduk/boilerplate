export default function (request: Request): Cookie {
	const cookie = request.headers.get('cookie')

	if (!cookie) return {}

	const cookies: Cookie = {}

	for (const partial of cookie.split(';')) {
		const [key, value] = partial.split('=')

		cookies[key?.trim()] = value
	}

	return cookies
}
