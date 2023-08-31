<script lang="ts">
	import '../app.css'
	import { CONFIG } from '$lib/constants'
	import { page } from '$app/stores'
	import { t } from '$lib/translations'
	import get_all_localized_paths from '$lib/utils/get_all_localized_paths'

	let title = $t(CONFIG.APP_NAME)
	let description = $t(CONFIG.DEFAULT_DESCRIPTION)
	/* global AlternateLinks */
	let paths: AlternateLinks[] = []

	$: if ($page?.data) {
		title = $t($page?.data?.title || CONFIG.APP_NAME)
		description = $t($page?.data?.description || CONFIG.DEFAULT_DESCRIPTION)
		paths = get_all_localized_paths($page?.data?.locale, $page?.url)
	}
</script>

<svelte:head>
	<title>{title} | {CONFIG.APP_NAME}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={$page?.url?.href} />
	{#each paths as { href, hreflang }}
		<link rel="alternate" {hreflang} {href} />
	{/each}
</svelte:head>

<slot />
