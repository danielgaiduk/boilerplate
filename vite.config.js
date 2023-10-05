import { defineConfig } from 'vitest/config'
import { sveltekit } from '@sveltejs/kit/vite'

/** @type {import('vitest/config').UserConfigExport} */
export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
})
