<script lang="ts">
	import '../app.css'
	import { CONFIG } from '$lib/constants'
	import { MetaTags } from 'svelte-meta-tags'
	import { page } from '$app/stores'
	import { t } from '$lib/translations'
	import get_all_localized_paths from '$lib/utils/get_all_localized_paths'

	let title = ''
	let description = ''
	/* global AlternateLinks */
	let paths: AlternateLinks[] = []

	$: if ($page?.data) {
		description = $t($page?.data?.description || CONFIG.DEFAULT_DESCRIPTION)
		paths = get_all_localized_paths($page?.data?.locale, $page?.url)
		title = $t($page?.data?.title || CONFIG.APP_NAME)
	}
</script>

<svelte:head>
	{#each paths as { href, hreflang }}
		<link rel="alternate" {hreflang} {href} />
	{/each}
</svelte:head>

<MetaTags
	{description}
	{title}
	canonical={$page?.url?.href}
	titleTemplate={`%s | ${CONFIG.APP_NAME}`}
/>

<slot />
