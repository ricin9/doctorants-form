<script lang="ts">
	import { enhance } from '$app/forms';
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { Alert, Button, Input, Label } from 'flowbite-svelte';
	import TextField from '$lib/components/TextField.svelte';

	export let data;

	const form = superForm(data.form);
</script>

<SuperDebug data={form.form} />

<form
	method="POST"
	use:enhance
	class="flex max-w-md flex-col gap-4 mx-auto mt-24 border rounded px-8 pt-6 pb-8 mb-4"
>
	<TextField {form} field="email" label="Email" />
	<TextField {form} field="password" label="Mot de pass" />
	<TextField {form} field="confirmPassword" label="Confirmer mot de pass" />
	<Button type="submit">Inscrire</Button>
</form>
