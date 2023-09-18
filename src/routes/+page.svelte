<script lang="ts">
	import { enhance } from '$app/forms';
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { Button, Input, Label } from 'flowbite-svelte';
	import TextField from '$lib/components/TextField.svelte';
	import DateInput from '$lib/components/DateInput.svelte';
	import GenderRadioInput from './GenderRadioInput.svelte';

	export let data;

	const form = superForm(data.form);
</script>

<SuperDebug data={form.form} />
<form
	method="POST"
	use:enhance
	class="flex max-w-7xl flex-col gap-4 mx-auto mt-8 border rounded px-8 pt-6 pb-8 mb-4"
>
	<div>
		<div class="flex gap-4">
			<TextField {form} field="anneBac" label="Année du BAC" class="w-24" type="number" />
			<TextField {form} field="matriculeBac" label="Matricule du BAC" class="w-28" type="number" />
		</div>
		<div class="flex gap-4">
			<TextField {form} field="nom" label="Nom" class="w-56" />
			<TextField {form} field="prenom" label="Prenom" class="w-56" />
			<TextField {form} field="lieuNaissance" label="Lieu de naissance" class="w-56" />
			<DateInput {form} field="dateNaissance" label="Date de naissance" class="w-56" type="date" />
			<GenderRadioInput {form} field="gender" label="Civilité" />
		</div>
		<div class="flex gap-4">
			<TextField {form} field="nomAr" label="Nom arabe" class="w-56" />
			<TextField {form} field="prenomAr" label="Prenom arabe" class="w-56" />
			<TextField {form} field="lieuNaissanceAr" label="Lieu de naissance arabe" class="w-56" />
		</div>
	</div>
	<Button type="submit">Inscrire</Button>
</form>
