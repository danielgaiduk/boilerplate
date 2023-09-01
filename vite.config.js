import { defineConfig } from 'vitest/config'
import { sentrySvelteKit } from '@sentry/sveltekit'
import { sveltekit } from '@sveltejs/kit/vite'
import fs from 'fs'

/** @type {import('vitest/config').UserConfigExport} */
export default defineConfig({
	plugins: [
		sentrySvelteKit({
			sourceMapsUploadOptions: {
				org: '', // Fill out sentry org
				project: '' // Fill out sentry project
			}
		}),
		sveltekit()
	],
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
