<script lang="ts">
	import '../app.css'
	import { CONFIG } from '$lib/constants'
	import { getAllLocalizedPaths } from '$lib/utils'
	import { MetaTags } from 'svelte-meta-tags'
	import { page } from '$app/stores'
	import { t } from '$lib/translations'

	let title = ''
	let description = ''
	let canonical = ''
	let paths: IAlternateLinks[] = []

	$: if ($page?.data?.locale) {
		title = $t($page?.data?.title || CONFIG.APP_NAME)
		description = $t($page?.data?.description || CONFIG.DEFAULT_DESCRIPTION)
		canonical = $page?.url?.href
		paths = getAllLocalizedPaths($page?.data?.locale, $page?.url)
	}
</script>

<svelte:head>
	{#each paths as { href, hreflang }}
		<link rel="alternate" {hreflang} {href} />
	{/each}
</svelte:head>

<MetaTags {description} {title} {canonical} titleTemplate={`%s | ${CONFIG.APP_NAME}`} />

<slot />
