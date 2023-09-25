<script>
	import Header from '$lib/components/Header.svelte';
</script>

<div class="min-h-screen flex flex-col">
	<Header />
	<div class="flex-1">
		<slot />
	</div>
	<footer class="text-sm font-light mt-4 text-center mb-2">Développé par Miloudi Mohamed</footer>
</div>
