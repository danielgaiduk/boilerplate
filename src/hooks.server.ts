import dayjs from 'dayjs'
import { THEME_COLOR } from '$lib/constants'
import {
	buildLocalizedUrl,
	getLocaleFromRequest,
	isLocaleAvailable,
	log,
	redirect,
	replaceHtmlFragments
} from '$lib/utils'
import { setupPocketbase } from '$lib/server/'
import type { Handle } from '@sveltejs/kit'

export const handle = (async ({ event, resolve }) => {
	log('SERVER HOOK CALLED')

	const { params, request, route, url, cookies } = event
	const { locale = '' } = params
	const { id } = route

	if (id && !id?.includes('(localized)')) {
		return resolve(event)
	}

	if (!id) {
		const locale = getLocaleFromRequest(cookies, request)

		return redirect(`/${locale}/404`)
	}

	if (!isLocaleAvailable(locale)) {
		const location = buildLocalizedUrl(cookies, request, url)

		if (location) return redirect(location)
	}

	const pb = await setupPocketbase(cookies)

	if (pb.authStore.isValid) {
		if (id?.includes('(unguarded)')) {
			return redirect(`/${locale}/`)
		}
	} else {
		if (id?.includes('(guarded)')) {
			return redirect(`/${locale}/login?redirect=${encodeURI(url.pathname)}`)
		}
	}

	event.locals = {
		locale,
		pb,
		user: structuredClone(pb.authStore.model)
	}

	cookies.set('locale', locale, {
		path: '/',
		expires: dayjs().add(1, 'year').toDate()
	})

	return resolve(
		event,
		replaceHtmlFragments({
			'%lang%': locale,
			'%theme-color%': THEME_COLOR
		})
	)
}) satisfies Handle
