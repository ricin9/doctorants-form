<script lang="ts">
	import { CheckOutline, CloseOutline } from 'flowbite-svelte-icons';

	export let success: boolean;
</script>

{#if success}
	<CheckOutline class="text-green-500 inline-block ml-1" />
{:else}
	<CloseOutline class="text-red-500 inline-block ml-1" size="sm" />
{/if}
