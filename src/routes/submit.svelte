<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import Meme from '$lib/components/Meme/Meme.svelte';
	import { goto } from '$app/navigation';
	import { Post } from '$lib/types/api';

	let title;
	let username = 'maxiking';
	let url = '';

	const handlePostSubmit = async (e) => {
		e.preventDefault();
		const res = await fetch(`https://memuchyapi.azurewebsites.net/Post/CreatePost`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				user_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
				title: title,
				picture: url,
				tag: 'string'
			})
		});

		const newPost: Post = await res.json();
		goto(`/post/${newPost.id}`);
	};
</script>

<div class="flex content-full-no-nav">
	<div class="md:w-1/2 max-w-lg mx-auto px-4 py-5 shadow-none">
		<div class="sm:max-w-lg w-full p-10 bg-white rounded-xl z-10">
			<div class="text-center">
				<h2 class="mt-5 text-2xl font-bold text-gray-900">Stwórz swojego mema!</h2>
				<p class="mt-2 text-xs text-gray-400">Wszystkie prawa zastrzeżone u/{username}.</p>
			</div>
			<form class="mt-8 space-y-3" action="#" method="POST">
				<Input name="Tytuł" bind:value={title} />
				<Input name="URL Obrazka/Gifa" bind:value={url} />
				<div
					class="bg-black hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
					on:click={handlePostSubmit}
				>
					Dodaj mema
				</div>
			</form>
		</div>
	</div>
	<div class="w-1/2 bg-cover bg-bottom md:block hidden">
		<Meme {title} {username} image={url} />
	</div>
</div>
