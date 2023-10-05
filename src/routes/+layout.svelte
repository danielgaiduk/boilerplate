<script lang="ts">
	import '../app.css'

	import { getAllLocalizedPaths } from '$lib/utils'
	import { page } from '$app/stores'
	import { t } from '$lib/translations'
</script>

<svelte:head>
	<title>{$t($page?.data?.title)} | {$t('app.title_partial')}</title>
	<meta name="description" content={$t($page?.data?.description)} />
	{#each getAllLocalizedPaths($page?.url) as { href, hreflang }}
		<link rel="alternate" {hreflang} {href} />
	{/each}
</svelte:head>

<slot />
