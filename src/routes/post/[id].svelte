<script>
	import { page } from '$app/stores';
	import Meme from '$lib/components/Meme/Meme.svelte';

	const memeId = $page.params.id;
</script>

<Meme isPostMode={true} />
