<script lang="ts">
	import { onMount } from 'svelte';

	export let data;
	onMount(() => {
		setTimeout(() => window.print(), 1000);
	});
	const { doctorant_details: details, directeur_these: director, coDirector } = data.registration;
	const whiteSquare = '□';
	const filledSquare = '▣';
	function getDoctorateTypeSquare(type: typeof details.typeDoctorat) {
		return type === details.typeDoctorat ? filledSquare : whiteSquare;
	}

	function formatDateString(date: string) {
		return new Date(date).toLocaleDateString('fr-FR', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit'
		});
	}
</script>

<page>
	<div class="min-h-screen flex flex-col justify-between">
		<img src="entete.jpg" alt="entete" />
		<main class="flex flex-col gap-3 flex-grow mx-4 mt-4">
			<div class="flex flex-col justify-center content-center">
				<div class="mx-auto leading-none">
					<span class="font-medium mr-2">Diplome Preparé:</span> Doctorat en Sciences {getDoctorateTypeSquare(
						'classique'
					)} Doctorat LMD
					{getDoctorateTypeSquare('lmd')}
				</div>
				<div class="mx-auto">
					<span class="font-medium mr-2">Discplines:</span>
					{details.disciplines}
				</div>
				<div class="mx-auto">
					<span class="font-medium mr-24">(Arrété n° :</span><span class="mr-48 font-medium"
						>du</span
					>)
				</div>
			</div>

			<div class="mx-auto ring-4 ring-black p-1">
				<span class="font-medium mr-2">Année Universitaire:</span> 2023/2024
			</div>

			<div class="flex flex-col">
				<h4 class="text-lg font-medium">L'étudiant(e):</h4>
				<div class="flex">
					<div class="flex-1"><span class="font-medium mr-2">Nom:</span> {details.nom}</div>
					<div class="flex-1"><span class="font-medium mr-2">Prenom:</span> {details.prenom}</div>
				</div>
				<div>
					<span class="font-medium mr-2">Date et Lieu de Naissance:</span>
					{formatDateString(details.dateNaissance)},<span class="font-medium mx-2">à</span>
					{details.lieuNaissance}
				</div>
				<div>
					<span class="font-medium mr-2">Date de 1er Inscription:</span>
					{details.anneePremiereInscription}
				</div>
			</div>

			<div class="flex flex-col">
				<h4 class="text-lg font-medium">L'encadreur:</h4>
				<div class="flex">
					<div class="flex-1"><span class="font-medium mr-2">Nom:</span> {director.nom}</div>
					<div class="flex-1"><span class="font-medium mr-2">Prenom:</span> {director.prenom}</div>
					<div class="flex-1"><span class="font-medium mr-2">Grade:</span> {director.grade}</div>
				</div>
				<div class="flex">
					<span class="font-medium mr-2">Etablissement:</span>
					{director.etablissement}
				</div>
			</div>

			<div class="flex flex-col">
				<h4 class="text-lg font-medium">Le Co-Encadreur:</h4>
				<div class="flex">
					<div class="flex-1">
						<span class="font-medium mr-2">Nom:</span>
						{coDirector ? coDirector.nom : '(aucun)'}
					</div>
					<div class="flex-1">
						<span class="font-medium mr-2">Prenom:</span>
						{coDirector ? coDirector.prenom : '(aucun)'}
					</div>
					<div class="flex-1">
						<span class="font-medium mr-2">Grade:</span>
						{coDirector ? coDirector.grade : '(aucun)'}
					</div>
				</div>
				<div>
					<span class="font-medium mr-2">Etablissement:</span>
					{coDirector ? coDirector.etablissement : '(aucun)'}
				</div>
			</div>

			<div class="h-[4.5rem] max-h-[6rem]">
				<span class="font-medium mr-2">Titre de la thèse de Doctorat:</span>
				{details.titreThese}
			</div>

			<div class="min-h-[4.5rem] max-h-[6rem]">
				<span class="font-medium mr-2">Etat d'avancement:</span>
				{details.etatAvancement}
			</div>

			<div class="mx-auto">
				<span class="font-medium mr-16">Fait à Mascara, le:</span>
			</div>
		</main>

		<!-- signatures -->
		<footer class="mx-12 mt-8">
			<div class="flex flex-col">
				<div class="flex justify-around">
					<div class="mb-12">Le Post Graduant</div>
					<div class="mb-12">L'encadreur</div>
					<div class="mb-12">Le Co-Encadreur</div>
				</div>
				<div class="flex justify-around">
					<div class="mb-12">Le Président du CS de la Faculté</div>
					<div class="mb-12">Le Doyen de la Faculté</div>
				</div>
			</div>
		</footer>
	</div>
</page>

<style>
	@page {
		size: A4;
		margin: 0;
	}
	page {
		background: white;
		display: block;
		margin: 0 auto;
		margin-bottom: 0.5cm;
		box-shadow: 0 0 0.5cm rgba(0, 0, 0, 0.5);
		width: 21cm;
		height: 29.7cm;
	}
	@media print {
		page {
			background: white;
			margin: 0;
			box-shadow: 0;
		}
	}
</style>
