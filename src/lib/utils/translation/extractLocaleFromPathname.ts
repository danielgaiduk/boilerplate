import { getPathnameFragments } from '$lib/utils'

export default function (pathname: string): string {
	const [, ...rest] = getPathnameFragments(pathname)

	return rest?.join('/') ?? ''
}
