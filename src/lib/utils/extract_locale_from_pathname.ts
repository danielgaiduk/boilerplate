import get_pathname_fragments from '$lib/utils/get_pathname_fragments'

export default function (pathname: string): string {
	const [, ...rest] = get_pathname_fragments(pathname)

	return rest?.join('/') ?? ''
}
