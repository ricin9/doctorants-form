<script lang="ts" context="module">
	import type { AnyZodObject } from 'zod';
	type T = AnyZodObject;
</script>

<script lang="ts" generics="T extends AnyZodObject">
	import type { Writable } from 'svelte/store';
	import { Helper, Input, Label, Radio } from 'flowbite-svelte';
	import type { z } from 'zod';
	import type { ZodValidation, FormPathLeaves } from 'sveltekit-superforms';
	import { formFieldProxy, type SuperForm } from 'sveltekit-superforms/client';

	type AcceptedRadioValues = string | number;

	export let form: SuperForm<ZodValidation<T>, unknown>;
	export let field: FormPathLeaves<z.infer<T>>;
	const { value, errors, constraints } = formFieldProxy(form, field);

	export let label: string = field;
	export let data: { value: AcceptedRadioValues; label: string }[];

	const derivedValue = value as Writable<AcceptedRadioValues | undefined>;
</script>

<div class="mb-6">
	<Label class="block mb-4" color={$errors ? 'red' : undefined}>{label}</Label>
	<div class="flex gap-4 w-56">
		{#each data as { value, label }}
			<Radio name={field} {value} bind:group={$derivedValue}>{label}</Radio>
		{/each}
	</div>
	{#if $errors}
		<Helper class="mt-2 first-letter:uppercase" color="red">
			{$errors}
		</Helper>
	{/if}
</div>
