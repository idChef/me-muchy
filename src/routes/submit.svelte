<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import Meme from '$lib/components/Meme/Meme.svelte';
	import { goto } from '$app/navigation';
	import type { Post } from '$lib/types/api';
	import { checkIfImageExists } from '$lib/utils/CheckIfImageExists';
	import { currentUser } from '$lib/stores/user';
	import { fireNotification } from '$lib/stores/notification';
	import { NavigateIfNotLoggedIn } from '$lib/utils/NavigateIfNotLoggedIn';

	NavigateIfNotLoggedIn();

	let title;
	let username = 'maxiking';
	let url = '';
	let previewUrl = '';
	let isAddingMeme = false;
	let tag;

	$: url, checkIfImageExists(() => (previewUrl = ''), url, handleImageValidation);

	const handleImageValidation = (resolution) => {
		if (resolution && url) previewUrl = url;
		else previewUrl = '';
	};

	$: titleConstraints = title?.length > 0 && title.length < 50;

	$: urlConstraints = previewUrl;

	$: tagConstraints = tag?.length < 30;

	const handlePostSubmit = async (e) => {
		if (!titleConstraints || !urlConstraints || !tagConstraints || isAddingMeme || !$currentUser) {
			fireNotification('There is something wrong with your meme', 2000, 'error');
			return;
		}

		isAddingMeme = true;

		e.preventDefault();
		try {
			const res = await fetch(`https://memuchyapi.azurewebsites.net/Post/CreatePost`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					user_id: $currentUser.id,
					title: title,
					picture: url,
					tag: tag
				})
			});

			if (res.ok) {
				const newPost: Post = await res.json();
				goto(`/post/${newPost.id}`);
			} else {
				isAddingMeme = false;
			}
		} catch (e) {
			console.error(e);
			isAddingMeme = false;
		}
	};
</script>

<div class="flex content-full-no-nav flex-col items-center md:flex-row">
	<div class="md:w-1/2 max-w-lg mx-auto px-4  pt-5 md:py-5 shadow-none">
		<div class="sm:max-w-lg w-full p-10 bg-white rounded-xl z-10">
			<div class="text-center">
				<h2 class="mt-5 text-2xl font-bold text-gray-900">Stwórz swojego mema!</h2>
				<p class="mt-2 text-xs text-gray-400">Wszystkie prawa zastrzeżone u/{username}.</p>
			</div>
			<form class="mt-8 space-y-3" action="#" method="POST">
				<Input name="Tytuł" bind:value={title} />
				<Input name="URL Obrazka/Gifa" bind:value={url} />
				<Input name="Tag" bind:value={tag} />
				<div class="btn" on:click={handlePostSubmit}>Dodaj mema</div>
			</form>
		</div>
	</div>
	<div class="w-1/2 bg-cover bg-bottom md:block">
		<Meme {title} username={$currentUser.userName} image={previewUrl} {tag} />
	</div>
</div>
