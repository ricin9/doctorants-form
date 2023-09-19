<script lang="ts">
	import { onMount } from 'svelte';

	import debounce from 'lodash.debounce';
	import { Input, Label, Select } from 'flowbite-svelte';

	let query = '';
	let results: any[] = [];
	export let selected = 0;
	export let label = 'Cherchez';
	export let width: string;
	export let search = async (query: string) => {
		return await [
			{ id: 1, name: 'University Mascara - Mustapha Stanbouli ############' },
			{ id: 2, name: 'faefaf' },
			{ id: 3, name: '5a4g56arg' },
			{ id: 4, name: 'gaegeagea' },
			{ id: 5, name: 'jujuju' }
		].slice(0, Math.floor(Math.random() * 5) + 1);
	};
	async function handleInput(event: any) {
		query = event.target.value;
		results = await search(query);
		results.length > 0 ? (selected = results[0].id) : (selected = 0);
	}

	onMount(async () => {
		results = await search('');
		results.length > 0 ? (selected = results[0].id) : (selected = 0);
	});
</script>

<div>
	<Label class="block mb-2">{label}</Label>
	<div class="flex flex-col gap-1">
		<Input
			type="text"
			placeholder="Recherche"
			on:input={debounce(handleInput, 200, { maxWait: 500 })}
			class={width}
		/>

		<Select bind:value={selected} class={width}>
			{#if results.length > 0}
				{#each results as result}
					<option value={result.id}>{result.name}</option>
				{/each}
			{/if}
		</Select>
	</div>
</div>
