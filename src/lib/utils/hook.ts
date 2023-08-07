function redirect(location: string) {
	return new Response(null, {
		status: 302,
		headers: { location }
	})
}

function replaceHTMLFragments(options: Record<string, string>): {
	transformPageChunk: ({ html }: { html: string }) => string
} {
	return {
		transformPageChunk: ({ html }: { html: string }): string => {
			for (const [key, value] of Object.entries(options)) {
				html = html.replace(key, value)
			}

			return html
		}
	}
}

export { redirect, replaceHTMLFragments }
