<script lang="ts">
	import { enhance } from '$app/forms';
	import { superForm } from 'sveltekit-superforms/client';
	import { Alert, Button, Helper, Input, Label } from 'flowbite-svelte';
	import { page } from '$app/stores';
	import TextField from '$lib/components/form/TextField.svelte';

	export let data;

	const registrationSuccess = $page.url.searchParams.get('success');

	const form = superForm(data.form);
	const { errors } = form;
</script>

<form
	method="POST"
	use:enhance
	class="flex max-w-md flex-col gap-4 mx-auto mt-12 border rounded px-8 pt-6 pb-8 mb-4"
>
	<h2 class="text-3xl mb-4 mx-auto">Connexion</h2>

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
	<Helper>
		<p class="text-center">
			Vous n'avez pas de compte ? <a href="/register" class="text-primary-800">Inscrivez-vous</a>
		</p>
	</Helper>
</form>
