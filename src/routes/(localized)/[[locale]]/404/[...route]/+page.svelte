<script>
	import { page } from '$app/stores'
	import { t } from '$lib/translations'
</script>

<h1 class="text-4xl uppercase">404 - {$page.params.route} {$t('error.not_found')}</h1>
