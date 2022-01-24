<script>
	import Meme from '$lib/components/Meme/Meme.svelte';

	import { onMount } from 'svelte';

	let memes;

	onMount(async () => {
		const res = await fetch(`https://memuchyapi.azurewebsites.net/Post/GetAll`);
		memes = await res.json();
	});
</script>

<svelte:head>
	<title>Me-muchy - Memy bez cenzury</title>
</svelte:head>

<div class="flex flex-col gap-14 nav-push">
{#if memes}
{#each memes as meme}
<Meme image={meme.picture} title={meme.title} postId={meme.id} upvotes={meme.n_like} downvotes={meme.n_unlike} />
{/each}
{/if}
</div>