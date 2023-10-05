import PocketBase from 'pocketbase'
import { AUTH_COOKIE_NAME } from '@constants'
import { PRIVATE_POCKETBASE_URL } from '$env/static/private'

import type { Cookies } from '@sveltejs/kit'

export default async function (cookies: Cookies): Promise<PocketBase> {
	const pb = new PocketBase(PRIVATE_POCKETBASE_URL)

	const cookie = cookies.get(AUTH_COOKIE_NAME)

	if (cookie) {
		await pb.authStore.loadFromCookie(`pb_auth=${cookie}`)

		try {
			if (pb.authStore.isValid) {
				await pb.collection('users').authRefresh()
			}
		} catch (_) {
			pb.authStore.clear()
		}
	}

	return pb
}
