import * as Sentry from '@sentry/sveltekit'

import { PUBLIC_SENTRY_DSN } from '$env/static/public'

Sentry.init({
	dsn: PUBLIC_SENTRY_DSN,
	tracesSampleRate: 1,
	replaysSessionSampleRate: 0.1,
	replaysOnErrorSampleRate: 1,
	integrations: [new Sentry.Replay()]
})

const handleError = Sentry.handleErrorWithSentry()

export { handleError }
