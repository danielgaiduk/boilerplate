import { json } from '@sveltejs/kit'

import { APP_NAME, THEME_COLOR } from '$constants'

export const prerender = true

export async function GET(): Promise<Response> {
	const manifest = {
		name: APP_NAME,
		short_name: APP_NAME,
		start_url: '/',
		scope: '/',
		icons: [
			{
				src: '/android-chrome-192x192.png',
				sizes: '192x192',
				type: 'image/png',
				purpose: 'any maskable'
			},
			{
				src: '/android-chrome-512x512.png',
				sizes: '512x512',
				type: 'image/png',
				purpose: 'any maskable'
			}
		],
		theme_color: THEME_COLOR,
		background_color: THEME_COLOR,
		display: 'standalone'
	}

	return json(manifest)
}
