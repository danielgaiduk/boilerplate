import type { RequestHandler } from '@sveltejs/kit'

export const prerender = true

export const GET: RequestHandler = async ({ url }) => {
	const body = ['User-agent: *', 'Allow: /', '', `Sitemap: ${url.origin}/sitemap.xml`]
		.join('\n')
		.trim()

	const headers = {
		'Content-Type': 'text/plain'
	}

	return new Response(body, { headers })
}
