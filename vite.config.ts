import fs from 'fs'
import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig, type UserConfigExport } from 'vitest/config'

const config: UserConfigExport = defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	server: {
		https: {
			key: fs.readFileSync(`${__dirname}/../cert/key.pem`),
			cert: fs.readFileSync(`${__dirname}/../cert/cert.pem`)
		},
		proxy: {}
	}
})

export default config
