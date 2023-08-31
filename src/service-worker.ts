/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

import { build, files, version } from '$service-worker'

const CACHE = `cache-${version}`
const ASSETS = [...build, ...files]
const SW = self as unknown as ServiceWorkerGlobalScope

SW.addEventListener('install', (event) => {
	async function addFilesToCache() {
		const cache = await caches.open(CACHE)
		await cache.addAll(ASSETS)
	}

	event.waitUntil(addFilesToCache())
})

SW.addEventListener('activate', (event) => {
	async function deleteOldCaches() {
		for (const key of await caches.keys()) {
			if (key !== CACHE) await caches.delete(key)
		}
	}

	event.waitUntil(deleteOldCaches())
})

SW.addEventListener('fetch', (event) => {
	if (event.request.method !== 'GET') return

	async function respond(): Promise<Response> {
		const url = new URL(event.request.url)
		const cache = await caches.open(CACHE)

		if (ASSETS.includes(url.pathname)) {
			return (await cache.match(url.pathname)) as Response
		}

		try {
			const response = await fetch(event.request)

			if (response.status === 200) {
				await cache.put(event.request, response.clone())
			}

			return response
		} catch {
			return (await cache.match(event.request)) as Response
		}
	}

	event.respondWith(respond())
})
