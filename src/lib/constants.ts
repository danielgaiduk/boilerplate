import * as APP_CONFIG from '$lib/config/app.json'
import * as TRANSLATION_CONFIG from '$lib/config/translation.json'
import { toKebabCase } from '$lib/utils'

const KEBAB_APP_NAME = toKebabCase(APP_CONFIG.APP_NAME)
const AUTH_COOKIE_NAME = `${KEBAB_APP_NAME}_auth`
const LOCALE_COOKIE_NAME = `${KEBAB_APP_NAME}_locale`

const CONFIG = {
	...APP_CONFIG,
	...TRANSLATION_CONFIG
}

export { CONFIG, AUTH_COOKIE_NAME, KEBAB_APP_NAME, LOCALE_COOKIE_NAME }
