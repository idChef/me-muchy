<script lang="ts">
	import { page } from '$app/stores';
	import Meme from '$lib/components/Meme/Meme.svelte';
	import type { Post, CompletePost } from '$lib/types/api';

	const fetchComments = async (postId: string) => {
		try {
			const res = await fetch(
				`https://memuchyapi.azurewebsites.net/Comment/GetByPost?postId=${postId}`
			);

			if (res.ok) return await res.json();
		} catch (error) {
			console.log(error);
		}
	};

	const fetchUsername = async (userId: string) => {
		try {
			const res = await fetch(`https://memuchyapi.azurewebsites.net/User/SearchById?Id=${userId}`);
			if (res.ok) {
				const userdata = await res.json();
				return userdata.userName;
			}
		} catch (error) {
			console.log(error);
		}
	};

	const fetchMemeData = async (meme: Post): Promise<CompletePost> => {
		const comments = await fetchComments(meme.id);
		const username = await fetchUsername(meme.user_id);

		const post = { ...meme, comments: comments, username: username };

		return post;
	};

	const memeId = $page.params.id;
	let isLoading = true;

	let meme: CompletePost;

	import { onMount } from 'svelte';

	onMount(async () => {
		const res = await fetch(`https://memuchyapi.azurewebsites.net/Post/SearchById?Id=${memeId}`);
		const fetchedPost = await res.json();

		meme = await fetchMemeData(fetchedPost)
		isLoading = false;
	});
</script>

<div class="py-14">
{#if isLoading}
	<Meme isPostMode={true} {isLoading} />
{:else}
	<Meme
		isPostMode={true}
		{isLoading}
		postData={meme}
	/>
{/if}
</div>
