<script lang="ts">
	import {
		Button,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		TableSearch
	} from 'flowbite-svelte';
	import debounce from 'lodash.debounce';

	export let data;

	let searchInput = '';
	let debouncedSearchInput = '';

	async function fetchRegistrations(query: string) {
		const res = await fetch(`/admin?q=${query}`);
		const data = await res.json();
		// console.log(res.ok, data, query);
		return data;
	}

	const handleInput = debounce(
		(input: string) => {
			debouncedSearchInput = input;
		},
		350,
		{ maxWait: 2000 }
	);
	$: handleInput(searchInput);
</script>

<main class="flex flex-col m-4 gap-4">
	<div>
		<span class="font-medium">Nombre de réinscriptions:</span>
		{data.registrationsCount}
		<Button size="xs" href="/admin/export" download>Exporter tous les données</Button>
	</div>

	<TableSearch
		placeholder="Cherchez par nom et prenom"
		hoverable
		bind:inputValue={searchInput}
		striped
	>
		<TableHead>
			<TableHeadCell>Nom</TableHeadCell>
			<TableHeadCell>Prenom</TableHeadCell>
			<TableHeadCell>Email</TableHeadCell>
			<TableHeadCell>Telephone</TableHeadCell>
			<TableHeadCell>Lieu de naissance</TableHeadCell>
			<TableHeadCell>Date de naissance</TableHeadCell>
			<TableHeadCell class="max-w-[8rem]">A uploadé la réinscription final?</TableHeadCell>
			<TableHeadCell class="max-w-[8rem]">A uploadé le récu de paiment?</TableHeadCell>
			<TableHeadCell class="max-w-[6rem]">Plus de détail</TableHeadCell>
			<TableHeadCell class="max-w-[6rem]">Date creation</TableHeadCell>
		</TableHead>
		<TableBody tableBodyClass="divide-y">
			{#await fetchRegistrations(debouncedSearchInput) then items}
				{#each items as item}
					<TableBodyRow>
						<TableBodyCell class="capitalize whitespace-break-spaces">{item.nom}</TableBodyCell>
						<TableBodyCell class="capitalize whitespace-break-spaces">{item.prenom}</TableBodyCell>
						<TableBodyCell class="lowercase">{item.email}</TableBodyCell>
						<TableBodyCell>{item.telephone}</TableBodyCell>
						<TableBodyCell class="whitespace-break-spaces">{item.lieuNaissance}</TableBodyCell>
						<TableBodyCell class="capitalize"
							>{new Date(item.dateNaissance).toLocaleDateString('fr-FR', {
								year: 'numeric',
								month: 'long',
								day: '2-digit'
							})}</TableBodyCell
						>
						<TableBodyCell>
							{#if item.file}
								<a
									href={`/admin/file/${item.id}?type=demande`}
									target="_blank"
									class="font-medium text-primary-600 hover:underline dark:text-primary-500"
									>Document</a
								>
							{:else}
								Non
							{/if}
						</TableBodyCell>
						<TableBodyCell>
							{#if item.recu}
								<a
									href={`/admin/file/${item.id}?type=recu`}
									target="_blank"
									class="font-medium text-primary-600 hover:underline dark:text-primary-500"
									>Document</a
								>
							{:else}
								Non
							{/if}
						</TableBodyCell>
						<TableBodyCell>
							<a
								href={'/admin/' + item.id}
								target="_blank"
								class="font-medium text-primary-600 hover:underline dark:text-primary-500">Voir</a
							>
						</TableBodyCell>
						<TableBodyCell>
							{new Date(item.createdAt).toLocaleDateString('fr-FR', {
								year: 'numeric',
								month: '2-digit',
								day: '2-digit'
							})}
						</TableBodyCell>
					</TableBodyRow>
				{/each}
			{/await}
		</TableBody>
	</TableSearch>
	<div>
		Max de resultats est : 25, vous pouvez utilisez la bar de recherche pour accéder plus
		d'informations ou bien exporter les données
	</div>
</main>
