<script>
	import { page } from '$app/stores';
	import Meme from '$lib/components/Meme/Meme.svelte';

	const memeId = $page.params.id;
	let isLoading = true;

	let meme;

	import { onMount } from 'svelte';

	onMount(async () => {
		const res = await fetch(`https://memuchyapi.azurewebsites.net/Post/SearchById?Id=${memeId}`);
		meme = await res.json();
		isLoading = false;
	});
</script>

{#if isLoading}
<Meme isPostMode={true} isLoading={isLoading} />
{:else}
<Meme isPostMode={true} isLoading={isLoading} image={meme.picture} title={meme.title}/>
{/if}
