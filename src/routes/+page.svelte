<script lang="ts">
	import { enhance } from '$app/forms';
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { Button, Radio } from 'flowbite-svelte';
	import { searchSpecialty } from './referenceApiClient';
	import { genderOptions, typeDoctoratOptions } from './formEnums';
	import TextField from '$lib/components/form/TextField.svelte';
	import DateInput from '$lib/components/form/DateInput.svelte';
	import RadioInput from '$lib/components/form/RadioInput.svelte';
	import SelectSearch from '$lib/components/form/SelectSearch.svelte';

	export let data;

	const form = superForm(data.form);
</script>

<SuperDebug data={form.form} />
<form
	method="POST"
	use:enhance
	class="flex max-w-7xl flex-col gap-8 mx-auto mt-8 ring-primary-500 ring-1 rounded px-8 pt-6 pb-8 mb-4 divide-y divide-solid divide-primary-500"
>
	<div>
		<h2 class="text-3xl mb-4">Détail du doctorant</h2>
		<div class="flex gap-4">
			<TextField {form} field="anneBac" label="Année du BAC" class="w-24" type="number" />
			<TextField {form} field="matriculeBac" label="Matricule du BAC" class="w-28" type="number" />
		</div>
		<div class="flex gap-4">
			<TextField {form} field="nom" label="Nom" class="w-56" />
			<TextField {form} field="prenom" label="Prenom" class="w-56" />
			<TextField {form} field="lieuNaissance" label="Lieu de naissance" class="w-56" />
			<DateInput {form} field="dateNaissance" label="Date de naissance" class="w-56" type="date" />
			<RadioInput {form} field="gender" label="Civilité" data={genderOptions} />
		</div>
		<div class="flex gap-4">
			<TextField {form} field="nomAr" label="Nom arabe" class="w-56" />
			<TextField {form} field="prenomAr" label="Prenom arabe" class="w-56" />
			<TextField {form} field="lieuNaissanceAr" label="Lieu de naissance arabe" class="w-56" />
		</div>
		<div class="flex gap-4">
			<SelectSearch label="Domaine" width="w-56" search={searchSpecialty} />
			<SelectSearch label="Filière" width="w-56" />
			<SelectSearch label="Specialité" width="w-56" />
			<TextField
				{form}
				field="annePrevueSoutenance"
				label="Année prévue de soutenance"
				class="w-56"
				type="number"
			/>
			<RadioInput {form} field="typeDoctorat" label="Type de doctorat" data={typeDoctoratOptions} />
		</div>
	</div>
	<div>
		<h2 class="text-3xl my-4">Information du directeur de thèse</h2>
		<div class="flex gap-4">
			<TextField {form} field="nomDirecteur" label="Nom" class="w-56" />
			<TextField {form} field="prenomDirecteur" label="Prenom" class="w-56" />
			<TextField {form} field="gradeDirecteur" label="Grade de directeur" class="w-56" />
		</div>
		<div class="flex gap-4">
			<SelectSearch label="Domaine" width="w-[29rem]" />
		</div>
	</div>

	<div>
		<h2 class="text-3xl my-4">Information du co-directeur de thèse (si existe)</h2>
		<div class="flex gap-4">
			<TextField {form} field="nomCoDirecteur" label="Nom" class="w-56" />
			<TextField {form} field="prenomCoDirecteur" label="Prenom" class="w-56" />
			<TextField {form} field="gradeCoDirecteur" label="Grade de directeur" class="w-56" />
		</div>
		<div class="flex gap-4">
			<SelectSearch label="Domaine" width="w-[29rem]" />
		</div>
	</div>
	<Button type="submit">Inscrire</Button>
</form>
