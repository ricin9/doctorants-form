<script lang="ts">
	import { enhance } from '$app/forms';
	import { superForm } from 'sveltekit-superforms/client';
	import { Alert, Button, Input, Label } from 'flowbite-svelte';
	import TextField from '$lib/components/TextField.svelte';
	import { page } from '$app/stores';

	export let data;

	const registrationSuccess = $page.url.searchParams.get('success');

	const form = superForm(data.form);
	const { errors } = form;
</script>

<form
	method="POST"
	use:enhance
	class="flex max-w-md flex-col gap-4 mx-auto mt-24 border rounded px-8 pt-6 pb-8 mb-4"
>
	{#if registrationSuccess == 'true'}
		<Alert color="green">
			Votre compte a été créé avec succès. Vous pouvez maintenant vous connecter.
		</Alert>
	{/if}
	{#if $errors?._errors && $errors?._errors.length > 0}
		<Alert color="red" class="first-letter:uppercase">
			{$errors?._errors[0]}
		</Alert>
	{/if}
	<TextField {form} field="email" label="Email" />
	<TextField {form} field="password" label="Mot de pass" type="password" />
	<Button type="submit">Connexion</Button>
</form>
