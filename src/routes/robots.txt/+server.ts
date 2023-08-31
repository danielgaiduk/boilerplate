export const GET = async () => {
	const text = ['User-agent: *', 'Allow: /']

	return new Response(text.join('\n'), {
		headers: {
			'Content-Type': 'text/plain'
		}
	})
}
