import * as sitemap from 'super-sitemap'

import { LOCALES } from '$constants'

import type { RequestHandler } from '@sveltejs/kit'

export const prerender = true

export const GET: RequestHandler = async ({ url }) => {
	return await sitemap.response({
		origin: url.origin,
		excludePatterns: ['/404/'],
		paramValues: {
			'/[[locale]]': LOCALES
		}
	})
}
