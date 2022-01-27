<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { currentUser } from '$lib/stores/user';
	import Comment from './Comments/Comment.svelte';
	import AddComment from './Comments/AddComment.svelte';
	import AnimatedIcon from '../AnimatedIcon.svelte';
	import type { CompletePost, Post } from '$lib/types/api';
	import { fireNotification } from '$lib/stores/notification';
	let customClass;
	export { customClass as class };

	export let isLoading = false;
	export let isPostMode = false;
	export let postData: CompletePost;

	let shouldNavigate = !isPostMode;

	$: comments = postData.comments;
	$: votes = postData.n_like - postData.n_unlike;

	const handleClick = () => {
		if (shouldNavigate) goto(`/post/${postData.id}`);
	};

	const fetchComments = async () => {
		try {
			const res = await fetch(
				`https://memuchyapi.azurewebsites.net/Comment/GetByPost?postId=${postData.id}`
			);

			if (res.ok) comments = await res.json();
		} catch (error) {
			console.log(error);
		}
	};


	onMount(async () => {
		if (!postData.id) return;

		fetchComments();
	});

	const handleUpvote = async (e) => {
		e.stopPropagation();
		try {
			const res = await fetch(
				`https://memuchyapi.azurewebsites.net/Post/LikePost?postId=${postId}`,
				{
					method: 'PUT'
				}
			);

			if (res.ok) postData.n_like++;
		} catch (e) {
			console.error(e);
		}
	};

	const handleDownvote = async (e) => {
		e.stopPropagation();
		try {
			const res = await fetch(
				`https://memuchyapi.azurewebsites.net/Post/UnlikePost?postId=${postId}`,
				{
					method: 'PUT'
				}
			);

			if (res.ok) postData.n_unlike++;
		} catch (e) {
			console.error(e);
		}
	};

	const addComment = async (comment: string) => {
		try {
			const res = await fetch(
				`https://memuchyapi.azurewebsites.net/Comment/CreateComment?postId=${postId}&text=${comment}&userId=${$currentUser.id}`,
				{
					method: 'POST'
				}
			);

			if (res.ok) {
				fetchComments();
				fireNotification('Komentarz został dodany', 2000);
			}
		} catch (error) {
			console.error(error);
		}
	};
</script>

<div
	class="meme-container {shouldNavigate &&
		'hover:border-slate-500 hover:cursor-pointer'} {customClass}"
	on:click={handleClick}
>
	<div class="w-full flex justify-between p-3">
		<div class="{isLoading && 'animate-pulse'} flex flex-col w-full items-start">
			{#if isLoading}
				<div class="w-full flex flex-col space-y-3">
					<div class="w-full h-2 bg-neutral-400 rounded" />
					<div class="w-5/12 h-2 bg-neutral-400 rounded" />
				</div>
			{:else}
				<span class="pt-1 font-bold text-md">{postData.title}</span>
				<span class="pt-1 font-bold text-xs">u/{postData.username}</span>
				<span
					class="rounded-full text-white 
            bg-black hover:bg-gray-500 duration-300 
            text-xs font-bold 
            mr-1 md:mr-2 mb-2 px-2 md:px-4 py-1 
            opacity-90 hover:opacity-100 mt-2"
				>
					{postData.tag}
				</span>
			{/if}
		</div>
	</div>
	{#if isLoading || !postData.picture}
		<div class="w-full bg-neutral-400 h-64 animate-pulse" />
	{:else}
		<img class="meme-img mx-auto object-contain" src={postData.picture} />
	{/if}
	<div class="flex p-3 items-center">
		<AnimatedIcon
			class="w-8 h-8  grayscale object-contain hover:cursor-pointer"
			animatedPath="/icons/pogfish.gif"
			staticPath="/icons/pogfish.png"
			onClick={handleUpvote}
		/>
		<div class="px-2">
			{#if isLoading}
				<div class="w-4 h-2 bg-neutral-400 rounded ml-auto animate-pulse" />
			{:else}
				{#if votes > 0}+{/if}
				{votes}
			{/if}
		</div>
		<AnimatedIcon
			class="w-8 h-8  grayscale object-fill hover:cursor-pointer"
			animatedPath="/icons/biblethump.gif"
			staticPath="/icons/biblethump.png"
			onClick={handleDownvote}
		/>
		{#if isLoading}
			<div class="w-24 h-2 bg-neutral-400 rounded ml-auto animate-pulse" />
		{:else}
			<div class="ml-auto text-sm">{comments?.length} comments</div>
		{/if}
	</div>
	{#if isPostMode}
		<AddComment {addComment} />
		{#if comments.length > 0}
			<div class="flex flex-col gap-3 pb-6 divide-y">
				{#each comments as comment}
					<Comment comment={comment.text} username={comment.userName} />
				{/each}
			</div>
		{/if}
	{/if}
</div>
