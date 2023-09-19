<script lang="ts" context="module">
	import type { AnyZodObject } from 'zod';
	type T = AnyZodObject;
</script>

<script lang="ts" generics="T extends AnyZodObject">
	import type { Writable } from 'svelte/store';

	import { onMount } from 'svelte';
	import debounce from 'lodash.debounce';
	import { Helper, Input, Label, Select } from 'flowbite-svelte';
	import type { z } from 'zod';
	import type { ZodValidation, FormPathLeaves } from 'sveltekit-superforms';
	import { formFieldProxy, type SuperForm } from 'sveltekit-superforms/client';

	export let form: SuperForm<ZodValidation<T>, unknown>;
	export let field: FormPathLeaves<z.infer<T>>;
	const { value: genericValue, errors, constraints } = formFieldProxy(form, field);
	const value = genericValue as Writable<number | undefined>;

	let query = '';
	let results: any[] = [];
	export let label = 'Cherchez';
	export let width: string;
	export let search: (query: string) => Promise<
		{
			id: number;
			name: string;
		}[]
	>;
	async function handleInput(event: any) {
		query = event.target.value;
		results = await search(query);
		results.length > 0 ? ($value = results[0].id) : ($value = 0);
	}

	onMount(async () => {
		results = await search('');
		results.length > 0 ? ($value = results[0].id) : ($value = 0);
	});
</script>

<div>
	<Label class="block mb-2" color={$errors ? 'red' : undefined}>{label}</Label>
	<div class="flex flex-col gap-1">
		<Input
			type="text"
			placeholder="Recherche"
			on:input={debounce(handleInput, 200, { maxWait: 300 })}
			class={width}
			color={$errors ? 'red' : undefined}
		/>

		<Select name={field} bind:value={$value} class={width}>
			{#if results.length > 0}
				{#each results as result}
					<option value={result.id}>{result.name}</option>
				{/each}
			{/if}
		</Select>
	</div>
	{#if $errors}
		<Helper class="mt-2 first-letter:uppercase" color="red">
			{$errors}
		</Helper>
	{/if}
</div>
