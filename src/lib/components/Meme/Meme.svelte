<script lang="ts">
	import { goto } from '$app/navigation';
	import Comment from './Comments/Comment.svelte';
	import AddComment from './Comments/AddComment.svelte';
	import AnimatedIcon from '../AnimatedIcon.svelte';
	import type { Post } from '$lib/types/api';

	const handleClick = () => {
		if (shouldNavigate) goto(`/post/${postId}`);
	};

	export let postId: string = '404';
	export let title: string = 'Title undefined';
	export let username: string = 'username';
	export let upvotes: number = 0;
	export let downvotes: number = 0;

	$: votes = upvotes - downvotes;


	export let isLoading = false;
	export let image = '';
	export let isPostMode = false;
	let shouldNavigate = !isPostMode;

	const handleUpvote = async (e) => {
		e.stopPropagation();
		try {
			const res = await fetch(
				`https://memuchyapi.azurewebsites.net/Post/LikePost?postId=${postId}`,
				{
					method: 'PUT'
				}
			);

			if (res.ok) upvotes++;
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

			if (res.ok) downvotes++;
		} catch (e) {
			console.error(e);
		}
	};
</script>

<div
	class="meme-container {shouldNavigate && 'hover:border-slate-500 hover:cursor-pointer'}"
	on:click={handleClick}
>
	<div class="w-full flex justify-between p-3">
		<div class="{isLoading && 'animate-pulse'} flex flex-col w-full">
			{#if isLoading}
				<div class="w-full flex flex-col space-y-3">
					<div class="w-full h-2 bg-neutral-400 rounded" />
					<div class="w-5/12 h-2 bg-neutral-400 rounded" />
				</div>
			{:else}
				<span class="pt-1 ml-2 font-bold text-md">{title}</span>
				<span class="pt-1 ml-2 font-bold text-xs">u/{username}</span>
			{/if}
		</div>
	</div>
	{#if isLoading || !image}
		<div class="w-full bg-neutral-400 h-64 animate-pulse" />
	{:else}
		<img class="meme-img mx-auto" src={image} />
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
			<div class="ml-auto text-sm">0 comments</div>
		{/if}
	</div>
	{#if isPostMode}
		<AddComment />
		<div class="flex flex-col gap-3 pb-6 divide-y">
			<Comment />
			<Comment />
			<Comment />
			<Comment />
			<Comment />
		</div>
	{/if}
</div>
