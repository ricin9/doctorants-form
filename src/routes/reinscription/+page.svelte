<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	// import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { Alert, Button, Radio, Spinner } from 'flowbite-svelte';
	import { searchEstablishment } from './searchEstablishment';
	import {
		doctorateTypeOptions,
		domainOptions,
		filiereOptions,
		genderOptions,
		gradesOptions,
		laboratoiteRattachementOptions,
		situationProfessionnelleOptions
	} from '$lib/common/enums';
	import TextField from '$lib/components/form/TextField.svelte';
	import DateInput from '$lib/components/form/DateInput.svelte';
	import RadioInput from '$lib/components/form/RadioInput.svelte';
	import SelectSearch from '$lib/components/form/SelectSearch.svelte';
	import SelectInput from '$lib/components/form/SelectInput.svelte';
	import TextareaInput from '$lib/components/form/TextareaInput.svelte';

	export let data;

	const form = superForm(data.form, {
		delayMs: 300,
		timeoutMs: 8000
	});

	const { delayed, errors } = form;
</script>

<form
	method="POST"
	use:form.enhance
	class="flex max-w-7xl flex-col gap-8 mx-auto mt-12 ring-primary-500 ring-1 rounded px-8 pt-6 pb-8 mb-4 divide-y divide-solid divide-primary-500"
>
	<div>
		<h2 class="text-3xl mb-4 text-primary-700">Détail du doctorant</h2>
		<div class="flex gap-4">
			<TextField {form} field="anneBac" label="Année du BAC" class="w-24" type="number" />
			<TextField {form} field="matriculeBac" label="Matricule du BAC" class="w-28" type="number" />
			<TextField {form} field="telephone" label="Telephone" class="w-56" />
		</div>
		<div class="flex gap-4">
			<TextField {form} field="nom" label="Nom" class="w-56" />
			<TextField {form} field="prenom" label="Prenom" class="w-56" />
			<TextField {form} field="lieuNaissance" label="Lieu de naissance" class="w-56" />
			<DateInput {form} field="dateNaissance" label="Date de naissance" class="w-56" type="date" />
			<RadioInput {form} field="gender" label="Sexe" data={genderOptions} />
		</div>
		<div class="flex gap-4">
			<TextField {form} field="nomAr" label="Nom arabe" class="w-56" />
			<TextField {form} field="prenomAr" label="Prenom arabe" class="w-56" />
			<TextField {form} field="lieuNaissanceAr" label="Lieu de naissance arabe" class="w-56" />
		</div>
	</div>

	<div>
		<h2 class="text-3xl my-4 text-primary-700">Information académique</h2>
		<div class="flex gap-4">
			<SelectInput {form} field="domain" label="Domaine" width="w-56" data={domainOptions} />
			<SelectInput {form} field="filiere" label="Filière" width="w-56" data={filiereOptions} />
			<TextField {form} field="speciality" label="Specialité" class="w-56" />
		</div>
	</div>

	<div>
		<h2 class="text-3xl my-4 text-primary-700">La thèse de doctorat</h2>
		<div class="flex gap-4">
			<TextField
				{form}
				field="anneePremiereInscription"
				label="Année du première inscription"
				class="w-56"
				type="number"
			/>
			<TextField
				{form}
				field="annePrevueSoutenance"
				label="Année prévue de soutenance"
				class="w-56"
				type="number"
			/>
			<RadioInput
				{form}
				field="typeDoctorat"
				label="Type de doctorat"
				data={doctorateTypeOptions}
			/>
		</div>
		<div class="flex gap-4">
			<SelectInput
				{form}
				field="laboratoiteRattachement"
				label="Laboratoire de rattachement"
				class="w-56"
				data={laboratoiteRattachementOptions}
			/>
			<SelectInput
				{form}
				data={situationProfessionnelleOptions}
				field="situationProfessionnelle"
				label="Situation professionnelle"
				class="w-56"
			/>
			<TextField {form} field="disciplines" label="Disciplines" class="w-56" />
		</div>
		<div class="flex gap-4">
			<TextareaInput
				{form}
				field="titreThese"
				rows="4"
				label="Titre de la thèse de doctorat"
				class="w-[29rem]"
			/>
			<TextareaInput
				{form}
				field="etatAvancement"
				rows="4"
				label="Etat d'avancement"
				class="w-[29rem]"
			/>
		</div>
	</div>

	<div>
		<h2 class="text-3xl my-4 text-primary-700">Information du directeur de thèse</h2>
		<div class="flex gap-4">
			<TextField {form} field="nomDirecteur" label="Nom" class="w-56" />
			<TextField {form} field="prenomDirecteur" label="Prenom" class="w-56" />
			<SelectInput
				{form}
				data={gradesOptions}
				field="gradeDirecteur"
				label="Grade de directeur"
				class="w-56"
			/>
		</div>
		<div class="flex gap-4">
			<SelectSearch
				{form}
				field="etablissementDirecteur"
				label="Etablissement"
				width="w-[29rem]"
				search={searchEstablishment}
			/>
		</div>
	</div>

	<div>
		<h2 class="text-3xl my-4 text-primary-700">Information du co-directeur de thèse (si existe)</h2>
		{#if $errors?._errors && $errors?._errors.length > 0}
			<Alert color="red" class="first-letter:uppercase">
				{$errors?._errors[0]}
			</Alert>
		{/if}
		<div class="flex gap-4">
			<TextField {form} field="nomCoDirecteur" label="Nom" class="w-56" />
			<TextField {form} field="prenomCoDirecteur" label="Prenom" class="w-56" />
			<SelectInput
				{form}
				data={gradesOptions}
				field="gradeCoDirecteur"
				label="Grade de directeur"
				class="w-56"
			/>
		</div>
		<div class="flex gap-4">
			<SelectSearch
				{form}
				field="etablissementCoDirecteur"
				label="Etablissement"
				width="w-[29rem]"
				search={searchEstablishment}
			/>
		</div>
	</div>

	<Button type="submit" disabled={$delayed}>
		{#if $delayed}
			<Spinner class="mr-3" size="4" />
		{/if}
		Inscrire
	</Button>
</form>

<!-- <SuperDebug data={form.form} /> -->
