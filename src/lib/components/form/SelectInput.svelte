<script lang="ts" context="module">
	import type { AnyZodObject } from 'zod';
	type T = AnyZodObject;
</script>

<script lang="ts" generics="T extends AnyZodObject">
	import type { Writable } from 'svelte/store';

	import { Helper, Label, Select } from 'flowbite-svelte';
	import type { z } from 'zod';
	import type { ZodValidation, FormPathLeaves } from 'sveltekit-superforms';
	import { formFieldProxy, type SuperForm } from 'sveltekit-superforms/client';

	export let form: SuperForm<ZodValidation<T>, unknown>;
	export let field: FormPathLeaves<z.infer<T>>;
	export let data: {
		value: number | string;
		label: string;
	}[];
	export let label = 'Selectionnez';
	const { value: genericValue, errors, constraints } = formFieldProxy(form, field);
	const value = genericValue as Writable<number | undefined>;
</script>

<div>
	<Label class="block mb-2" color={$errors ? 'red' : undefined}>{label}</Label>
	<Select
		name={field}
		bind:value={$value}
		aria-invalid={$errors ? 'true' : undefined}
		color={$errors ? 'red' : undefined}
		{...$constraints}
		{...$$restProps}
		placeholder="Selectionnez un option"
	>
		{#if data.length > 0}
			{#each data as entry}
				<option value={entry.value}>{entry.label}</option>
			{/each}
		{/if}
	</Select>
	{#if $errors}
		<Helper class="mt-2 first-letter:uppercase" color="red">
			{$errors}
		</Helper>
	{/if}
</div>
