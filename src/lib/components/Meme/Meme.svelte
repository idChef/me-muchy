<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import Comment from './Comments/Comment.svelte';
	import AddComment from './Comments/AddComment.svelte';
	import AnimatedIcon from '../AnimatedIcon.svelte';
	import type { Post } from '$lib/types/api';

	import { currentUser } from '$lib/stores/user';
	import { get } from 'svelte/store'; 

	$: userData = get(currentUser);

	const handleClick = () => {
		if (shouldNavigate) goto(`/post/${postId}`);
	};

	const fetchComments = async () => {
		try {
			const res = await fetch(
				`https://memuchyapi.azurewebsites.net/Comment/GetByPost?postId=${postId}`
			);

			if (res.ok) comments = await res.json();
		} catch (error) {
			console.log(error);
		}
	};

	onMount(async () => {
		if(!postId) return 

		fetchComments();
	});

	export let postId: string;
	export let title: string = 'Title undefined';
	export let username: string = 'username';
	export let upvotes: number = 0;
	export let downvotes: number = 0;
	export let comments = [];

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

	const addComment = async (comment: string) => {
		try {
			const res = await fetch(
				`https://memuchyapi.azurewebsites.net/Comment/CreateComment?postId=${postId}&text=${comment}&userId=${'3fa85f64-5717-4562-b3fc-2c963f66afa6'}`,
				{
					method: 'POST'
				}
			);

			if (res.ok) fetchComments();
		} catch (error) {
			console.error(error);
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
			<div class="ml-auto text-sm">{comments.length} comments</div>
		{/if}
	</div>
	{#if isPostMode}
		<AddComment {addComment}/>
		{#if comments.length > 0}
		<div class="flex flex-col gap-3 pb-6 divide-y">
			{#each comments as comment}
				<Comment comment={comment.text} />
			{/each}
		</div>
		{/if}
	{/if}
</div>
