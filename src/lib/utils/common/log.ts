import { dev } from '$app/environment'

export default function (...args: unknown[]): void {
	if (dev) {
		console.log(...args)
	}
}
