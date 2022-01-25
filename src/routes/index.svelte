<script lang="ts">
	import Meme from '$lib/components/Meme/Meme.svelte';
	import InfiniteScroll from 'svelte-infinite-scroll';

	let page = 0;
	let pageSize = 5;
	let hasMore = true;
	
	let memes = [];
	$: fetchNextPage(page);

	const fetchNextPage = async (page) => {
		if (!hasMore) return;

		const res = await fetch(
			`https://memuchyapi.azurewebsites.net/Post/GetAll?pageSize=${pageSize}&pageindex=${page}`
		);
		const fetchedMemes = [...(await res.json())];

		if (fetchedMemes.length < 1) {
			hasMore = false;
			return;
		}

		memes = [...memes, ...fetchedMemes];
	};
</script>

<svelte:head>
	<title>Me-muchy - Memy bez cenzury</title>
</svelte:head>

<div class="flex flex-col gap-14 py-14">
	{#if memes}
		{#each memes as meme}
			<Meme
				image={meme.picture}
				title={meme.title}
				postId={meme.id}
				upvotes={meme.n_like}
				downvotes={meme.n_unlike}
			/>
		{/each}
	{:else}
		<Meme isLoading={true} />
		<Meme isLoading={true} />
		<Meme isLoading={true} />
		<Meme isLoading={true} />
		<Meme isLoading={true} />
	{/if}
</div>
<InfiniteScroll threshold={100} on:loadMore={() => page++} window />
