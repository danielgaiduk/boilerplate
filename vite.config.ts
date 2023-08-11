import { sentrySvelteKit } from '@sentry/sveltekit'
import fs from 'fs'
import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig, type UserConfigExport } from 'vitest/config'

const config: UserConfigExport = defineConfig({
	plugins: [
		sentrySvelteKit({
			sourceMapsUploadOptions: {
				org: 'daniel-gaiduk',
				project: 'boilerplate'
			}
		}),
		sveltekit()
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	server: {
		https: {
			key: fs.readFileSync(`${__dirname}/../../infrastructure/cert/key.pem`),
			cert: fs.readFileSync(`${__dirname}/../../infrastructure/cert/cert.pem`)
		},
		proxy: {}
	}
})

export default config
