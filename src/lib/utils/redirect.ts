export default function (location: string) {
	return new Response(null, {
		status: 302,
		headers: { location }
	})
}
