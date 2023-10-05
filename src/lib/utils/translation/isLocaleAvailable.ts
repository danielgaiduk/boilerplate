import { LOCALES } from '@constants'

export default function (locale: string): boolean {
	return LOCALES?.includes(locale?.toLowerCase())
}
