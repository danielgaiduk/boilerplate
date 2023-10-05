import { toKebabCase } from '$lib/utils'

export const APP_NAME = 'Boilerplate'
export const DEFAULT_LOCALE = 'en'
export const LOADERS = ['app', 'error', 'homepage']
export const LOCALES = ['en', 'de']
export const THEME_COLOR = '#000000'

export const KEBAB_APP_NAME = toKebabCase(APP_NAME)
export const AUTH_COOKIE_NAME = `${KEBAB_APP_NAME}_auth`
export const LOCALE_COOKIE_NAME = `${KEBAB_APP_NAME}_locale`
