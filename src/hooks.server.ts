import { THEME_COLOR } from '$lib/constants'
import { PUBLIC_SENTRY_DSN } from '$env/static/public'
import { sequence } from '@sveltejs/kit/hooks'
import * as Sentry from '@sentry/sveltekit'
import {
	buildCookie,
	buildLocalizedUrl,
	isLocaleAvailable,
	log,
	parseCookie,
	redirect,
	replaceHtmlFragments
} from '$lib/utils'
import { setupPocketbase } from '$lib/server/'
import type { Handle } from '@sveltejs/kit'

Sentry.init({
	dsn: PUBLIC_SENTRY_DSN,
	tracesSampleRate: 1
})

export const handle = sequence(Sentry.sentryHandle(), (async ({ event, resolve }) => {
	log('SERVER HOOK CALLED')

	const { params, request, route, url } = event
	const { locale = '' } = params
	const { id } = route

	if (!id || (id && !id?.includes('(localized)'))) {
		return resolve(event)
	}

	const cookie = parseCookie(request)

	if (!isLocaleAvailable(locale)) {
		const location = buildLocalizedUrl(cookie, request, url)

		if (location) return redirect(location)
	}

	const pb = await setupPocketbase(cookie)

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

	const response = await resolve(
		event,
		replaceHtmlFragments({
			'%lang%': locale,
			'%theme-color%': THEME_COLOR
		})
	)

	response.headers.append('set-cookie', buildCookie('locale', locale))

	return response
}) satisfies Handle)

export const handleError = Sentry.handleErrorWithSentry()
