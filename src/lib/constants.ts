import { APP_NAME } from '$lib/config/app.json'
import { toKebabCase } from '$lib/utils'

const KEBAB_APP_NAME = toKebabCase(APP_NAME)
const AUTH_COOKIE_NAME = `${KEBAB_APP_NAME}_auth`
const LOCALE_COOKIE_NAME = `${KEBAB_APP_NAME}_locale`

export { AUTH_COOKIE_NAME, LOCALE_COOKIE_NAME, KEBAB_APP_NAME }
