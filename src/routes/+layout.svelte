<script lang="ts">
	import '../app.css'
	import { CONFIG } from '$lib/constants'
	import { getAllLocalizedPaths } from '$lib/utils'
	import { MetaTags } from 'svelte-meta-tags'
	import { page } from '$app/stores'
	import { t } from '$lib/translations'

	let title = ''
	let description = ''
	let paths: IAlternateLinks[] = []

	$: if ($page?.data) {
		description = $t($page?.data?.description || CONFIG.DEFAULT_DESCRIPTION)
		paths = getAllLocalizedPaths($page?.data?.locale, $page?.url)
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
