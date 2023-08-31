import { CONFIG } from '$lib/constants'
import { PUBLIC_SENTRY_DSN } from '$env/static/public'
import { sequence } from '@sveltejs/kit/hooks'
import * as Sentry from '@sentry/sveltekit'
import build_cookie from '$lib/utils/build_cookie'
import build_localized_url from '$lib/utils/build_localized_url'
import is_locale_available from '$lib/utils/is_locale_available'
import log from '$lib/utils/log'
import parse_cookie from '$lib/utils/parse_cookie'
import redirect from '$lib/utils/redirect'
import replace_html_fragments from '$lib/utils/replace_html_fragments'
import setup_pocketbase from '$lib/server/setup_pocketbase'
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

	const cookie = parse_cookie(request)

	if (!is_locale_available(locale)) {
		const location = build_localized_url(cookie, request, url)

		if (location) return redirect(location)
	}

	const pb = await setup_pocketbase(cookie)

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
		replace_html_fragments({
			'%lang%': locale,
			'%theme-color%': CONFIG.THEME_COLOR
		})
	)

	response.headers.append('set-cookie', build_cookie('locale', locale))

	return response
}) satisfies Handle)

export const handleError = Sentry.handleErrorWithSentry()
