<script lang="ts">
	import { enhance } from '$app/forms';
	import { Alert, Button, Fileupload, Helper, Label } from 'flowbite-svelte';
	import { page } from '$app/stores';

	export let data;
	const { hasReinscription, hasUploadedFile } = data;
	export let error = '';

	const handleFileChange = (e: any) => {
		if ($page.form?.success) $page.form.success = false;

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

<div class="px-24 w-screen mx-auto mt-4 flex flex-col">
	<h1 class="text-4xl text-primary-700 flex justify-center">Université Mascara</h1>
	<h1 class="text-3xl text-primary-700 flex justify-center mb-8">Réinscriptions en doctorat</h1>
	<div class="mx-auto">
		{#if !hasReinscription}
			<div class="font-medium mx-auto">
				Vous n'êtes pas réinscrit, <Button href="/reinscription" size="xs">Cliquez ici</Button> pour
				vous réinscrire
			</div>
		{:else}
			<div class="font-medium mx-auto w-[52rem]">
				Vous êtes réinscrit! Vous pouvez modifier votre reinscription : <Button
					href="/reinscription"
					size="xs">Cliquez ici</Button
				>
			</div>
			{#if !hasUploadedFile}
				<div class="font-medium mx-auto w-[52rem]">
					Vous devez uploader votre document de réinscription ci-dessous après avoir obtenu les
					signatures
				</div>
			{:else}
				<div class="font-medium mx-auto w-[52rem] mt-4">
					Vous avez déjà uploadé votre document de réinscription, vous pouvez le télécharger <Button
						href="/reinscription/scanned-document"
						size="xs"
						download>Cliquez ici</Button
					>
					<div class="mt-4">Vous pouvez modifier votre document ci-dessous</div>
				</div>
			{/if}
			<div class="mx-auto flex flex-col">
				<form
					method="post"
					use:enhance
					enctype="multipart/form-data"
					class="mt-4 mx-auto flex flex-col"
				>
					{#if $page.form?.success}
						<Alert border color="green">Vous avez uploader votre fichier avec succés</Alert>
					{/if}
					<Label for="with_helper" class="pb-2">Upload fichier</Label>
					<div class="flex gap-2 items-center mb-2 w-[32rem]">
						<Fileupload
							id="document"
							name="document"
							accept="image/png, image/jpeg, application/pdf, image/jpg"
							required
							on:change={handleFileChange}
						/>
						<Button type="submit" disabled={error}>Uploader</Button>
					</div>
					<Helper>Formats acceptés : PDF, JPG, JPEG, PNG. (MAX 2MB)</Helper>
					{#if $page.error?.message || error}
						<Helper color="red">{$page?.error?.message || error}</Helper>
					{/if}
				</form>
			</div>
		{/if}
	</div>
</div>
