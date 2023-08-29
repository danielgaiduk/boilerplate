import PocketBase from 'pocketbase'
import { AUTH_COOKIE_NAME } from '$lib/constants'
import { PRIVATE_POCKETBASE_URL } from '$env/static/private'

export default async function (cookie: Cookie): Promise<PocketBase> {
	const pb = new PocketBase(PRIVATE_POCKETBASE_URL)

	if (cookie?.[AUTH_COOKIE_NAME]) {
		await pb.authStore.loadFromCookie(`pb_auth=${cookie?.[AUTH_COOKIE_NAME]}`)

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
