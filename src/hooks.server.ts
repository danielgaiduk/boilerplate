import {
	buildLocalizedUrl,
	isLocaleAvailable,
	log,
	parseCookie,
	redirect,
	replaceHTMLFragments
} from '$lib/utils'
import { PUBLIC_SENTRY_DSN } from '$env/static/public'
import { sequence } from '@sveltejs/kit/hooks'
import * as Sentry from '@sentry/sveltekit'
import type { Handle } from '@sveltejs/kit'

Sentry.init({
	dsn: PUBLIC_SENTRY_DSN,
	tracesSampleRate: 1
})

const handle = sequence(Sentry.sentryHandle(), (async ({ event, resolve }) => {
	log('SERVER HOOK CALLED')

	const {
		locals,
		params: { locale },
		request,
		route: { id },
		url
	} = event

	if (id && !id?.includes('(localized)')) {
		return await resolve(event)
	}

	const cookie = parseCookie(request)

	if (!isLocaleAvailable(locale)) {
		const location = buildLocalizedUrl(cookie, request, url)

		return redirect(location)
	}

	locals.locale = locale

	const response = await resolve(
		event,
		replaceHTMLFragments({
			'%lang%': `lang="${locale}"`
		})
	)

	return response
}) satisfies Handle)

const handleError = Sentry.handleErrorWithSentry()

export { handle, handleError }
