<script lang="ts">
	import '../app.css'
	import { page } from '$app/stores'
	import { t } from '$lib/translations'
	import get_all_localized_paths from '$lib/utils/get_all_localized_paths'

	$: canonical = $page?.url?.href
	$: description = $t($page?.data?.description)
	$: paths = get_all_localized_paths($page?.data?.locale, $page?.url)
	$: title = $t($page?.data?.title)
	$: title_partial = $t('app.title_partial')
	$: title_template = `${title} | ${title_partial}`
</script>

<svelte:head>
	<title>{title_template}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />
	{#each paths as { href, hreflang }}
		<link rel="alternate" {hreflang} {href} />
	{/each}
</svelte:head>

<slot />
