<script lang="ts">
	import { enhance } from '$app/forms';
	import { Alert, Button, Fileupload, Helper, Label, Tooltip } from 'flowbite-svelte';
	import { page } from '$app/stores';
	export let error = '';

	// component props
	export let label: string;
	export let disabled: boolean = false;
	export let action: 'demande' | 'recu';

	const handleFileChange = (e: any) => {
		if ($page.form && $page.form[action]) $page.form[action] = false;

		if (e.target?.files && e.target.files[0]) {
			const file = e.target.files[0];
			if (file.size > 2 * 1024 * 1024) {
				error = 'Le fichier est trop volumineux (MAX 2MB)';
				return;
			}
		}

		const ext = e.target.files[0].name.split('.').pop();
		if (ext !== 'pdf' && ext !== 'png' && ext !== 'jpg' && ext !== 'jpeg') {
			error = 'Le fichier doit être un PDF, JPG, JPEG ou PNG';
			return;
		}
		error = '';
	};
</script>

<div class="flex flex-col">
	<form
		method="post"
		action={`?/${action}`}
		use:enhance
		enctype="multipart/form-data"
		class="mt-4 flex flex-col"
	>
		{#if $page.form && $page.form[action]}
			<Alert border color="green">Vous avez uploader votre fichier avec succés</Alert>
		{/if}
		<div>
			<Label for="with_helper" class="pb-2 font-medium text-base">{label}</Label>
			<div class="flex gap-2 items-center mb-2 w-[32rem]">
				<Fileupload
					id="document"
					name="document"
					accept="image/png, image/jpeg, application/pdf, image/jpg"
					required
					on:change={handleFileChange}
					{disabled}
				/>

				<Button type="submit" disabled={error || disabled}>Uploader</Button>
			</div>
			{#if disabled}
				<Tooltip>Vous devez d'abord remplir le formulaire</Tooltip>
			{/if}
			<Helper>Formats acceptés : PDF, JPG, JPEG, PNG. (MAX 2MB)</Helper>
			{#if $page.error?.message || error}
				<Helper color="red">{$page?.error?.message || error}</Helper>
			{/if}
		</div>
	</form>
</div>
