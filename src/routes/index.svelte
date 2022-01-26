<script lang="ts">
	import Meme from '$lib/components/Meme/Meme.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import InfiniteScroll from 'svelte-infinite-scroll';
	import { onMount } from 'svelte';

	let page = 0;
	let pageSize = 5;
	let hasMore = true;

	let memes = [];
	$: fetchNextPage(page);

	const fetchNextPage = async (page) => {
		if (!hasMore || page == 0) return;

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

	onMount(async () => {
		const res = await fetch(
			`https://memuchyapi.azurewebsites.net/Post/GetAll?pageSize=${pageSize}&pageindex=0`
		);
		memes = await res.json();
	});
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
				tag={meme.tag}
				userId={meme.user_id}
			/>
		{/each}
	{/if}

	{#if hasMore}
		<Spinner />
	{:else}
		<div class="w-full flex flex-col justify-center items-center opacity-70">
			<img
				class="w-64"
				src="https://media3.giphy.com/media/qQdL532ZANbjy/giphy.gif?cid=ecf05e4769679i7e34o9se5apylq0sfbllky2vo711gm81np&rid=giphy.gif&ct=g"
			/>
			<h1 class="font-bold mt-4">No more memes</h1>
		</div>
	{/if}
</div>
<InfiniteScroll threshold={100} on:loadMore={() => page++} window />
