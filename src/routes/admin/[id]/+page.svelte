<script lang="ts">
	export let data;
	const { registration } = data;

	const lineClass = 'w-56';
</script>

<div
	class="flex max-w-7xl flex-col gap-12 mx-auto mt-12 ring-primary-500 ring-1 rounded px-8 pt-6 pb-8 mb-4 divide-y divide-solid divide-primary-500"
>
	<div class="flex flex-col gap-2">
		<h2 class="text-3xl mb-4 text-primary-700">Détail du doctorant</h2>
		<div class="flex gap-8">
			<div class={lineClass}>
				<span class="font-medium mr-2">Année du Bac:</span>
				{registration['anne de bac']}
			</div>
			<div class={lineClass}>
				<span class="font-medium mr-2">Matricule du Bac:</span>
				{registration['matricule bac']}
			</div>
			<div class={lineClass}>
				<span class="font-medium mr-2">Telephone:</span>
				{registration['telephone']}
			</div>
			<div class={lineClass}>
				<span class="font-medium mr-2">Sexe:</span>
				{registration['sexe']}
			</div>
		</div>
		<div class="flex gap-8">
			<div class={lineClass}>
				<span class="font-medium mr-2">Nom:</span>
				{registration['nom']}
			</div>
			<div class={lineClass}>
				<span class="font-medium mr-2">Nom arabe:</span>
				{registration['nom arabe']}
			</div>
		</div>
		<div class="flex gap-8">
			<div class={lineClass}>
				<span class="font-medium mr-2">Prenom:</span>
				{registration['prenom']}
			</div>
			<div class={lineClass}>
				<span class="font-medium mr-2">Prenom arabe:</span>
				{registration['prenom arabe']}
			</div>
		</div>
		<div class="flex gap-8">
			<div class="w-[112]">
				<span class="font-medium mr-2">Lieu de naissance:</span>
				{registration['lieu de naissance']} Lorem ipsum dolor sit, amet consectetur adipisicing
			</div>
			<div class="">
				<span class="font-medium mr-2">Lieu de naissance arabe:</span>
				{registration['lieu de naissance arabe']}
			</div>
			<div class="w-[112]">
				<span class="font-medium mr-2">Date de naissance:</span>
				{new Date(registration['date de naissance']).toLocaleDateString('fr-FR')}
			</div>
		</div>
	</div>
	<div class="flex flex-col gap-2">
		<h2 class="text-3xl my-4 text-primary-700">Information académique</h2>
		<div class="flex gap-4 justify-between mr-10">
			<div class="">
				<span class="font-medium mr-2">Domaine:</span>
				{registration['domaine']}
			</div>
			<div class="">
				<span class="font-medium mr-2">Filière:</span>
				{registration['filiere']}
			</div>
			<div class="">
				<span class="font-medium mr-2">Specialité:</span>
				{registration['specialité']}
			</div>
		</div>
	</div>
	<div class="flex flex-col gap-2">
		<h2 class="text-3xl my-4 text-primary-700">La thèse de doctorat</h2>
		<div class="flex gap-4 justify-between mr-10">
			<div>
				<span class="font-medium mr-2">Année du première inscription:</span>
				{registration['annee de premiere inscription']}
			</div>
			<div>
				<span class="font-medium mr-2">Année prévue de soutenance:</span>
				{registration['annee prevue de soutenance']}
			</div>
			<div>
				<span class="font-medium mr-2">Type de doctorat:</span>
				<span class="capitalize">
					{registration['type de doctorat']}
				</span>
			</div>
		</div>
		<div class="flex gap-4">
			<div>
				<span class="font-medium mr-2">Laboratoire de rattachement:</span>
				{registration['laboratoire de rattachement']}
			</div>
		</div>
		<div class="flex gap-4">
			<div class="flex-1">
				<span class="font-medium mr-2">Situation professionnelle:</span>
				{registration['situation professionnelle']}
			</div>
			<div class="flex-1">
				<span class="font-medium mr-2">Disciplines:</span>
				{registration['disciplines']}
			</div>
		</div>
		<div class="mt-4">
			<span class="font-medium mr-2">Titre de la thèse de doctorat:</span>
			{registration['titre de thèse']}
		</div>
		<div class="mt-4">
			<span class="font-medium mr-2">Etat d'avancement:</span>
			{registration['etat avancement']}
		</div>
	</div>

	<div class="flex flex-col gap-2">
		<h2 class="text-3xl my-4 text-primary-700">Information du directeurs de thèse</h2>
		<h3 class="text-2xl text-primary-700">Directeur:</h3>
		<div class="flex gap-4">
			<div class="flex gap-4">
				<div class="w-56">
					<span class="font-medium mr-2">Nom:</span>
					{registration['nom directeur']}
				</div>
				<div class="w-56">
					<span class="font-medium mr-2">Prenom:</span>
					{registration['prenom directeur']}
				</div>
				<div class="w-56">
					<span class="font-medium mr-2">Grade:</span>
					{registration['grade directeur']}
				</div>
			</div>
		</div>
		<div>
			<span class="font-medium mr-2">Etablissement:</span>
			{registration['etablissement directeur']}
		</div>

		<h3 class="text-2xl text-primary-700">Co-Directeur:</h3>
		{#if registration['nom co-directeur']}
			<div class="flex gap-4">
				<div class="flex gap-4">
					<div class="w-56">
						<span class="font-medium mr-2">Nom:</span>
						{registration['nom co-directeur']}
					</div>
					<div class="w-56">
						<span class="font-medium mr-2">Prenom:</span>
						{registration['prenom co-directeur']}
					</div>
					<div class="w-56">
						<span class="font-medium mr-2">Grade:</span>
						{registration['grade co-directeur']}
					</div>
				</div>
			</div>
			<div>
				<span class="font-medium mr-2">Etablissement:</span>
				{registration['etablissement co-directeur']}
			</div>
		{:else}
			(aucun)
		{/if}
	</div>
</div>
