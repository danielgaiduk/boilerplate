import dayjs from 'dayjs'
import { KEBAB_APP_NAME } from '$lib/constants'

export default function (name: string, value: string, temporal: Temporal = [1, 'year']): string {
	let cookie = `${KEBAB_APP_NAME}_${name}=${value};`

	cookie += `path=/;`
	cookie += `secure=true;`
	cookie += `sameSite=strict;`
	cookie += `httpOnly=true;`
	cookie += `expires=${dayjs()
		.add(...temporal)
		.toDate()
		.toUTCString()};`

	return cookie
}
