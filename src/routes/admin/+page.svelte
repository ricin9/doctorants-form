<script lang="ts">
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		TableSearch
	} from 'flowbite-svelte';
	import debounce from 'lodash.debounce';

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
			console.log(input);
			debouncedSearchInput = input;
		},
		350,
		{ maxWait: 2000 }
	);
	$: handleInput(searchInput);
</script>

<TableSearch
	placeholder="Search by maker name"
	hoverable={true}
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
	</TableHead>
	<TableBody tableBodyClass="divide-y">
		{#await fetchRegistrations(debouncedSearchInput) then items}
			{#each [...items, ...items] as item}
				<TableBodyRow>
					<TableBodyCell class="capitalize">{item.nom}</TableBodyCell>
					<TableBodyCell class="capitalize">{item.prenom}</TableBodyCell>
					<TableBodyCell class="lowercase">{item.email}</TableBodyCell>
					<TableBodyCell>{item.telephone}</TableBodyCell>
					<TableBodyCell class="capitalize"
						>{new Date(item.dateNaissance).toLocaleDateString('fr-FR', {
							year: 'numeric',
							month: 'long',
							day: '2-digit'
						})}</TableBodyCell
					>
					<TableBodyCell>{item.lieuNaissance}</TableBodyCell>
				</TableBodyRow>
			{/each}
		{/await}
	</TableBody>
</TableSearch>
