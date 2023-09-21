<script>
	import { onMount } from 'svelte';
	// onMount(() => {
	// 	window.print();
	// });
	const whiteSquare = '□';
	const filledSquare = '▣';
</script>

<page>
	<div class="min-h-screen flex flex-col justify-between">
		<img src="entete.jpg" alt="entete" />
		<main class="flex flex-col gap-3 flex-grow mx-4 mt-4">
			<div class="flex flex-col justify-center content-center">
				<div class="mx-auto leading-none">
					<span class="font-medium mr-2">Diplome Preparé:</span> Doctorat en Sciences ▢ Doctorat LMD
					▢
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

			<div class="flex flex-col">
				<h4 class="text-lg font-medium">L'étudiant(e):</h4>
				<div class="flex">
					<div class="flex-1"><span class="font-medium mr-2">Nom:</span> Miloudi</div>
					<div class="flex-1"><span class="font-medium mr-2">Prenom:</span> Mohamed</div>
				</div>
				<div>
					<span class="font-medium mr-2">Date et Lieu de Naissance:</span> 2002-03-19, Mascara
				</div>
				<div>
					<span class="font-medium mr-2">Date de 1er Inscription:</span> 2015
				</div>
			</div>

			<div class="flex flex-col">
				<h4 class="text-lg font-medium">L'encadreur:</h4>
				<div class="flex">
					<div class="flex-1"><span class="font-medium mr-2">Nom:</span> Miloudi</div>
					<div class="flex-1"><span class="font-medium mr-2">Prenom:</span> Mohamed</div>
					<div class="flex-1"><span class="font-medium mr-2">Grade:</span> Professeur</div>
				</div>
				<div class="flex">
					<span class="font-medium mr-2">Etablissement:</span> Université Mascara
				</div>
			</div>

			<div class="flex flex-col">
				<h4 class="text-lg font-medium">Le Co-Encadreur:</h4>
				<div class="flex">
					<div class="flex-1"><span class="font-medium mr-2">Nom:</span> Miloudi</div>
					<div class="flex-1"><span class="font-medium mr-2">Prenom:</span> Mohamed</div>
					<div class="flex-1"><span class="font-medium mr-2">Grade:</span> Professeur</div>
				</div>
				<div>
					<span class="font-medium mr-2">Etablissement:</span> Université Mascara
				</div>
			</div>

			<div class="h-[4.5rem] max-h-[6rem]">
				<span class="font-medium mr-2">Titre de la thèse de Doctorat:</span> وينتقل العرش من طبقة إلى
				أخرى؛ أي منه إلى أكبر أبنائه سنًّا وهكذا. ويذكر أنه في حالة وفاة ولي العهد في حياة الملك فإن
				ولاية العهد تنتقل لأكبر أبناء ولي العهد سنًّا حتى وإن كان له أخوة، يُذكر كذلك أن الدستور ينص
				على جواز اختيار الملك بنفسه وليًّا لعهده ولكنه يحصر ذلك ابتداءً في إخوة الملك فقط، لكن
			</div>

			<div class="h-[4.5rem] max-h-[6rem]">
				<span class="font-medium mr-2">Etat d'avancement:</span> Lorem ipsum dolor sit amet consectetur
				adipisicing elit. Fugit maxime assumenda corrupti, minus iusto nisi molestiae repellat, aliquid
				vitae dicta perspiciatis odio iste temporibus soluta. Lorem ipsum dolor sit amet consectetur
				adipisicing elit. Eveniet illum eaque ipsum.
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
