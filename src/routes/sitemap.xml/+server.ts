import * as sitemap from 'super-sitemap'

import { LOCALES } from '@constants'
import { PUBLIC_ORIGIN } from '$env/static/public'

import type { RequestHandler } from '@sveltejs/kit'

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
