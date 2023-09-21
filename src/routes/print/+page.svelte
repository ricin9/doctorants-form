<script>
	import { onMount } from 'svelte';

	onMount(() => {
		window.print();
	});
</script>

<page>
	<div class="min-h-screen flex flex-col justify-between">
		<main class="flex flex-col gap-4 flex-grow mx-12 mt-4">
			<div class="text-xl mx-auto leading-none">
				الجمهـوريـة الجـزائريـة الديـمقـراطيـة الشعـبـيـة
			</div>
			<div class="text-xl mx-auto leading-none">
				RÉPUBLIQUE ALGÉRIENNE DÉMOCRATIQUE ET POPULAIRE
			</div>
			<div class="flex flex-col justify-center content-center">
				<div class="mx-auto">
					<span class="font-medium mr-2">Diplome Preparé:</span> Doctorat en Sciences [] Doctorat LMD
					[x]
				</div>
				<div class="mx-auto">
					<span class="font-medium mr-2">Discplines:</span> Lorem ipsum dolor sit amet.
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

			<div class="flex flex-col gap-2">
				<h4 class="text-lg font-medium">L'étudiant(e):</h4>
				<div class="flex gap-4">
					<div class="flex-1"><span class="font-medium mr-2">Nom:</span> Miloudi</div>
					<div class="flex-1"><span class="font-medium mr-2">Prenom:</span> Mohamed</div>
				</div>
				<div class="flex gap-4">
					<span class="font-medium mr-2">Date et Lieu de Naissance:</span> 2002-03-19, Mascara
				</div>
				<div class="flex gap-4">
					<span class="font-medium mr-2">Date de 1er Inscription:</span> 2015
				</div>
			</div>

			<div class="flex flex-col gap-2">
				<h4 class="text-lg font-medium">L'encadreur:</h4>
				<div class="flex gap-4">
					<div class="flex-1"><span class="font-medium mr-2">Nom:</span> Miloudi</div>
					<div class="flex-1"><span class="font-medium mr-2">Prenom:</span> Mohamed</div>
					<div class="flex-1"><span class="font-medium mr-2">Grade:</span> Professeur</div>
				</div>
				<div class="flex gap-4">
					<span class="font-medium mr-2">Etablissement:</span> Université Mascara
				</div>
			</div>

			<div class="flex flex-col gap-2">
				<h4 class="text-lg font-medium">Le Co-Encadreur:</h4>
				<div class="flex gap-4">
					<div class="flex-1"><span class="font-medium mr-2">Nom:</span> Miloudi</div>
					<div class="flex-1"><span class="font-medium mr-2">Prenom:</span> Mohamed</div>
					<div class="flex-1"><span class="font-medium mr-2">Grade:</span> Professeur</div>
				</div>
				<div class="flex gap-4">
					<span class="font-medium mr-2">Etablissement:</span> Université Mascara
				</div>
			</div>

			<div class="h-[4.5rem]">
				<span class="font-medium mr-2">Titre de la thèse de Doctorat:</span> Lorem ipsum dolor sit amet
				consectetur adipisicing elit.
			</div>

			<div class="h-[4.5rem]">
				<span class="font-medium mr-2">Etat d'avancement:</span> Lorem ipsum dolor sit amet consectetur
				adipisicing elit. Fugit maxime assumenda corrupti, minus iusto nisi molestiae repellat, aliquid
				vitae dicta perspiciatis odio iste temporibus soluta.
			</div>

			<div class="mx-auto">
				<span class="font-medium mr-2">Fait à Mascara, le:</span> 2023-09-20
			</div>
		</main>

		<!-- signatures -->
		<footer class="mx-12 mt-8">
			<div class="flex flex-col gap-2">
				<div class="flex gap-4 justify-around">
					<div class="mb-[4.5rem]">Le Post Graduant</div>
					<div class="mb-[4.5rem]">L'encadreur</div>
					<div class="mb-[4.5rem]">Le Co-Encadreur</div>
				</div>
				<div class="flex gap-4 justify-around">
					<div class="mb-[4.5rem]">Le Président du CS de la Faculté</div>
					<div class="mb-[4.5rem]">Le Doyen de la Faculté</div>
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
