import { defineConfig, UserConfigExport } from 'vitest/config'
import { sveltekit } from '@sveltejs/kit/vite'

const config: UserConfigExport = defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
})

export default config
