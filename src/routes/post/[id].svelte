<script lang="ts">
	import { page } from '$app/stores';
	import Meme from '$lib/components/Meme/Meme.svelte';
	import type { Post } from '$lib/types/api';

	const memeId = $page.params.id;
	let isLoading = true;

	let meme: Post;

	import { onMount } from 'svelte';

	onMount(async () => {
		const res = await fetch(`https://memuchyapi.azurewebsites.net/Post/SearchById?Id=${memeId}`);
		meme = await res.json();
		console.log(meme);
		isLoading = false;
	});
</script>

<div class="pt-14">
{#if isLoading}
	<Meme isPostMode={true} {isLoading} />
{:else}
	<Meme
		isPostMode={true}
		{isLoading}
		image={meme.picture}
		title={meme.title}
		postId={meme.id}
		downvotes={meme.n_unlike}
		upvotes={meme.n_like}
	/>
{/if}
</div>
