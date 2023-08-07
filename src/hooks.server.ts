import { sequence } from '@sveltejs/kit/hooks'
import * as Sentry from '@sentry/sveltekit'
import type { Handle } from '@sveltejs/kit'

import { PUBLIC_SENTRY_DSN } from '$env/static/public'

Sentry.init({
	dsn: PUBLIC_SENTRY_DSN,
	tracesSampleRate: 1
})

const handle = sequence(Sentry.sentryHandle(), (async ({ event, resolve }) => {
	return await resolve(event)
}) satisfies Handle)

const handleError = Sentry.handleErrorWithSentry()

export { handle, handleError }
