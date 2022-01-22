<script>
	import Input from '$lib/components/Meme/Input.svelte';
	import Meme from '$lib/components/Meme/Meme.svelte';

	let title;
	let username = 'maxiking';
    let url=""
</script>

<div class="flex bg-white content-full-no-nav">
	<div class="md:w-1/2 max-w-lg mx-auto px-4 py-5 shadow-none">
		<div class="sm:max-w-lg w-full p-10 bg-white rounded-xl z-10">
			<div class="text-center">
				<h2 class="mt-5 text-2xl font-bold text-gray-900">Stwórz swojego mema!</h2>
				<p class="mt-2 text-xs text-gray-400">Wszystkie prawa zastrzeżone u/{username}.</p>
			</div>
			<form class="mt-8 space-y-3" action="#" method="POST">

					<Input name="Tytuł" bind:value={title} />
					<Input name="URL Obrazka/Gifa" bind:value={url} />

			</form>
		</div>
	</div>
	<div class="w-1/2 bg-cover bg-bottom md:block hidden">
		<Meme {title} {username} image={url} />
	</div>
</div>
