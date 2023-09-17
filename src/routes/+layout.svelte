<script lang="ts">
	import '../app.postcss';
	import '../app.css';
	export let data;
</script>

{#if data?.uid}
	<h1>
		you are logged in {data.uid}
	</h1>
{/if}
<slot />
