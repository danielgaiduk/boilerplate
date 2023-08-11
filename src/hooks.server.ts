import {
	buildCookie,
	buildLocalizedUrl,
	isLocaleAvailable,
	log,
	parseCookie,
	redirect,
	replaceHTMLFragments
} from '$lib/utils'
import { PUBLIC_SENTRY_DSN } from '$env/static/public'
import { sequence } from '@sveltejs/kit/hooks'
import { setupPocketbase } from '$lib/server'
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

	locals.locale = locale
	locals.pb = pb
	locals.user = structuredClone(pb.authStore.model)

	const response = await resolve(
		event,
		replaceHTMLFragments({
			'%lang%': `lang="${locale}"`
		})
	)

	response.headers.append('set-cookie', buildCookie('locale', locale as string))

	return response
}) satisfies Handle)

const handleError = Sentry.handleErrorWithSentry()

export { handle, handleError }
