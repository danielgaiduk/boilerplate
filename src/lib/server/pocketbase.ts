import PocketBase from 'pocketbase'
import { AUTH_COOKIE_NAME } from '$lib/constants'
import { SECRET_POCKETBASE_URL } from '$env/static/private'

async function setupPocketbase(cookie: Record<string, string>): Promise<PocketBase> {
	const pb = new PocketBase(SECRET_POCKETBASE_URL)

	await pb.authStore.loadFromCookie(`pb_auth=${cookie?.[AUTH_COOKIE_NAME]}`)

	try {
		if (pb.authStore.isValid) {
			await pb.collection('users').authRefresh()
		}
	} catch (_) {
		pb.authStore.clear()
	}

	return pb
}

export { setupPocketbase }
