import { PUBLIC_ORIGIN } from '$env/static/public'
import * as sitemap from 'super-sitemap'
import type { RequestHandler } from '@sveltejs/kit'
import { LOCALES } from '@constants'

export const prerender = true

export const GET: RequestHandler = async () => {
	return await sitemap.response({
		origin: PUBLIC_ORIGIN,
		excludePatterns: ['/404/'],
		paramValues: {
			'/[[locale]]': LOCALES
		}
	})
}
