<script lang="ts">
	import { enhance } from '$app/forms';
	import { error } from '@sveltejs/kit';
	import { date } from 'drizzle-orm/mysql-core';
	import { Alert, Button, Input, Label } from 'flowbite-svelte';
	export let form;
</script>

<form
	method="POST"
	use:enhance
	class="flex max-w-md flex-col gap-4 mx-auto mt-24 border rounded px-8 pt-6 pb-8 mb-4"
>
	{#if form?.error}
		<Alert type="error" class="mb-4">
			{form.error}
		</Alert>
	{/if}
	<div class="mb-6">
		<Label for="email" class="block mb-2">E-mail</Label>
		<Input id="email" placeholder="abc@example.com" type="email" required />
	</div>

	<div class="mb-6">
		<Label for="password" class="block mb-2">Mot de passe</Label>
		<Input id="password" placeholder="• • • • • • • •" type="password" required />
	</div>
	<input type="submit" value="Connexion" />
	<!-- <Button type="submit">Connexion</Button> -->
</form>
