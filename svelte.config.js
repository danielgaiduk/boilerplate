import { vitePreprocess } from '@sveltejs/kit/vite'
import adapter from '@sveltejs/adapter-node'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		alias: {
			$constants: './src/constants'
		},
		adapter: adapter()
	}
}

export default config
