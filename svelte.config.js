import { fileURLToPath } from 'url'
import { readFileSync } from 'fs'
import { vitePreprocess } from '@sveltejs/kit/vite'
import adapter from '@sveltejs/adapter-node'

const url = new URL('package.json', import.meta.url)
const file = fileURLToPath(url)
const json = readFileSync(file, 'utf8')
const pkg = JSON.parse(json)

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
		version: {
			name: pkg.version
		}
	}
}

export default config
