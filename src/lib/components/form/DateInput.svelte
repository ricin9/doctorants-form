<script lang="ts" context="module">
	import type { AnyZodObject } from 'zod';
	type T = AnyZodObject;
</script>

<script lang="ts" generics="T extends AnyZodObject">
	import { derived } from 'svelte/store';

	import { Helper, Input, Label } from 'flowbite-svelte';

	import type { z } from 'zod';
	import type { ZodValidation, FormPathLeaves } from 'sveltekit-superforms';
	import { formFieldProxy, type SuperForm } from 'sveltekit-superforms/client';

	export let form: SuperForm<ZodValidation<T>, unknown>;
	export let field: FormPathLeaves<z.infer<T>>;
	export let label: string = field;

	const { value, errors, constraints } = formFieldProxy(form, field);
	const transform = (v: string | number): string => new Date(v).toISOString().split('T')[0];
	$: $value = transform($value as string) as any;
</script>

<div class="mb-6">
	<Label class="block mb-2" color={$errors ? 'red' : undefined}>{label}</Label>
	<Input
		name={field}
		type="date"
		aria-invalid={$errors ? 'true' : undefined}
		color={$errors ? 'red' : undefined}
		bind:value={$value}
		{...$constraints}
		min={$constraints?.min && transform($constraints.min)}
		max={$constraints?.max && transform($constraints.max)}
		{...$$restProps}
	/>
	{#if $errors}
		<Helper class="mt-2 first-letter:uppercase" color="red">
			{$errors}
		</Helper>
	{/if}
</div>
