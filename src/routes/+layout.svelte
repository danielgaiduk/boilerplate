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
	let seo: ISeo = {}

	$: ({ data, url } = $page)

	$: if (data?.locale) {
		title = $t(CONFIG.DEFAULT_TITLE)
		description = $t(CONFIG.DEFAULT_DESCRIPTION)
		seo.title = data.seo?.title ? $t(data.seo?.title) : title
		seo.description = data.seo?.description ? $t(data.seo?.description) : description
		paths = getAllLocalizedPaths(data?.locale, url)
	}
</script>

<svelte:head>
	{#each paths as { href, hreflang }}
		<link rel="alternate" {hreflang} {href} />
	{/each}
</svelte:head>

<MetaTags title={`${seo.title} | ${title}`} canonical={url.href} description={seo.description} />

<slot />
