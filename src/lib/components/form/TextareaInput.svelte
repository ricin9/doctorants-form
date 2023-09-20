<script lang="ts" context="module">
	import type { AnyZodObject } from 'zod';
	type T = AnyZodObject;
</script>

<script lang="ts" generics="T extends AnyZodObject">
	import { Helper, Label, Textarea } from 'flowbite-svelte';

	import type { z } from 'zod';
	import type { ZodValidation, FormPathLeaves } from 'sveltekit-superforms';
	import { formFieldProxy, type SuperForm } from 'sveltekit-superforms/client';

	export let form: SuperForm<ZodValidation<T>, unknown>;
	export let field: FormPathLeaves<z.infer<T>>;
	export let label: string = field;

	const { value, errors, constraints } = formFieldProxy(form, field);
</script>

<div class="mb-6">
	<Label class="block mb-2" color={$errors ? 'red' : undefined}>{label}</Label>
	<Textarea
		name={field}
		type="text"
		aria-invalid={$errors ? 'true' : undefined}
		color={$errors ? 'red' : undefined}
		bind:value={$value}
		{...$constraints}
		{...$$restProps}
	/>
	{#if $errors}
		<Helper class="mt-2 first-letter:uppercase" color="red">
			{$errors}
		</Helper>
	{/if}
</div>
