export default function (options: Record<string, string>): {
	transformPageChunk: ({ html }: { html: string }) => string
} {
	return {
		transformPageChunk: ({ html }: { html: string }): string => {
			for (const [key, value] of Object.entries(options)) {
				html = html.replace(key, value || '')
			}

			return html
		}
	}
}
