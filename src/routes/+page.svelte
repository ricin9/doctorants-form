<script lang="ts">
	import { enhance } from '$app/forms';
	import { Alert, Button, Fileupload, Heading, Helper, Label, Li, List } from 'flowbite-svelte';
	import { page } from '$app/stores';
	import { CheckSolid } from 'flowbite-svelte-icons';
	import CheckOrNot from './CheckOrNot.svelte';
	import UploadFile from './UploadFile.svelte';
	export let data;
	const { hasReinscription, hasUploadedFile, hasUploadedRecu } = data;
	import Header from '$lib/components/Header.svelte';
	export let error = '';
	// component props

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

<Header />
<div class="px-24 w-screen mx-auto mt-4 flex flex-col">
	<h1 class="text-3xl text-primary-700 flex justify-center mb-8">Réinscriptions en doctorat</h1>
	<div class="mb-8">
		<Heading tag="h5">Réinscriptions en doctorat</Heading>
		<List position="outside" class="flex flex-col gap-1">
			<Li
				>Formulaire de réinscription
				<CheckOrNot success={hasReinscription} />
				<Helper helperClass="text-sm"
					><a
						href="/reinscription/"
						target="_blank"
						class="font-medium text-primary-600 hover:underline dark:text-primary-500 w-64 inline-block"
						>Remplissez ou modifiez le formulaire</a
					>
					{#if hasReinscription}
						<a
							href="/print"
							class="font-medium text-primary-600 hover:underline dark:text-primary-500"
							>Imprimer votre demande</a
						>
					{/if}</Helper
				>
			</Li>
			<Li
				>Upload le document de demande de réinscription signé <CheckOrNot
					success={hasUploadedFile}
				/>
				<Helper helperClass="text-sm flex "
					><div class="w-64">Uploader ci-dessous</div>
					{#if hasUploadedFile}
						<a
							href="/reinscription/scanned-document"
							download
							class="font-medium text-primary-600 hover:underline dark:text-primary-500"
							>Télécharger votre fichier</a
						>
					{/if}</Helper
				></Li
			>
			<Li
				>Upload reçu du paiement <CheckOrNot success={hasUploadedRecu} />
				<Helper helperClass="text-sm flex"
					><div class="w-64">Uploader ci-dessous</div>
					{#if hasUploadedRecu}
						<a
							href="/reinscription/recu-paiement"
							download
							class="font-medium text-primary-600 hover:underline dark:text-primary-500 mr-2"
							>Télécharger votre fichier</a
						>
					{/if}
				</Helper></Li
			>
		</List>
	</div>
	<div class="flex flex-col gap-4">
		<div id="demande-upload">
			<UploadFile
				label="Uploader la demande de réinscription signé"
				action="demande"
				disabled={!hasReinscription}
			/>
		</div>
		<div>
			<UploadFile label="Uploader le reçu du paiement" action="recu" disabled={!hasReinscription} />
		</div>
	</div>
</div>

<footer class="text-sm font-light justify-center mt-8 flex mb-2">
	Développé par Miloudi Mohamed
</footer>
