<script lang="ts">
	import { enhance } from '$app/forms';
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { Alert, Button, Input, Label } from 'flowbite-svelte';

	export let data;

	const { form } = superForm(data.form);
</script>

<SuperDebug data={$form} />
<form
	method="POST"
	use:enhance
	class="flex max-w-md flex-col gap-4 mx-auto mt-24 border rounded px-8 pt-6 pb-8 mb-4"
>
	<!-- {#if form?.error}
		<Alert type="error" class="mb-4">
			{form.error}
		</Alert>
	{/if} -->
	<div class="mb-6">
		<Label for="email" class="block mb-2">E-mail</Label>
		<Input
			id="email"
			placeholder="abc@example.com"
			type="email"
			required
			bind:value={$form.email}
		/>
	</div>

	<div class="mb-6">
		<Label for="password" class="block mb-2">Mot de passe</Label>
		<Input
			id="password"
			placeholder="• • • • • • • •"
			type="password"
			maxlength="64"
			required
			bind:value={$form.password}
		/>
	</div>
	<div class="mb-6">
		<Label for="confirmPassword" class="block mb-2">Mot de passe</Label>
		<Input
			id="confirmPassword"
			placeholder="• • • • • • • •"
			type="password"
			maxlength="64"
			required
			bind:value={$form.confirmPassword}
		/>
	</div>
	<Button type="submit">Inscrire</Button>
</form>
