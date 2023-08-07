import { dev } from '$app/environment'

function log(...args: unknown[]): void {
	if (dev) {
		console.log(...args)
	}
}

function toKebabCase(string: string): string {
	return string.replace(/\s+/g, '-').toLowerCase()
}

export { log, toKebabCase }
