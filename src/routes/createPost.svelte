<script>
	import Input from '$lib/components/Meme/Input.svelte';
	import Meme from '$lib/components/Meme/Meme.svelte';

	let title;
	let username = 'maxiking';
</script>

<div class="flex bg-white content-full-no-nav">
	<div class="md:w-1/2 max-w-lg mx-auto my-24 px-4 py-5 shadow-none">
		<Input name="Title" bind:value={title} />
	</div>
	<div class="w-1/2 bg-cover bg-bottom md:block hidden">
		<Meme {title} {username} />
	</div>
</div>
