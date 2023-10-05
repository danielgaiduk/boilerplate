import { defineConfig } from 'vitest/config'
import { sveltekit } from '@sveltejs/kit/vite'
import fs from 'fs'

/** @type {import('vitest/config').UserConfigExport} */
export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	server: {
		https: {
			key: fs.readFileSync(`${__dirname}/../certificates/key.pem`),
			cert: fs.readFileSync(`${__dirname}/../certificates/cert.pem`)
		},
		proxy: {}
	}
})
