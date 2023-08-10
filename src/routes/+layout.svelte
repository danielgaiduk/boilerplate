<script>
	import '../app.css'
	import { DEFAULT_TITLE, DEFAULT_DESCRIPTION } from '$lib/config/app.json'
	import { getAllLocalePaths } from '$lib/utils'
	import { MetaTags } from 'svelte-meta-tags'
	import { page } from '$app/stores'
	import { t } from '$lib/translations'

	$: ({ data, url } = $page)
	$: localePaths = getAllLocalePaths(data.locale, url)
	$: title = `${data?.seo?.title ? `${$t(data?.seo?.title)} | ` : ''}${$t(DEFAULT_TITLE)}`
	$: description = data?.seo?.description ? $t(data?.seo?.description) : $t(DEFAULT_DESCRIPTION)
</script>

<svelte:head>
	{#each localePaths as { href, hreflang }}
		<link rel="alternate" {hreflang} {href} />
	{/each}
</svelte:head>

<MetaTags {title} {description} canonical={url.href} />

<slot />
