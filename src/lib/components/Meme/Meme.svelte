<script lang="ts">
	export let title = 'Title undefined';
	export let username = 'u/username';
	export let votes = undefined;
	export let isLoading = false;
	export let image = 'https://c.tenor.com/wFOq9TrnBxgAAAAC/you-wouldnt-get-it-joker.gif';
</script>

<div class=" rounded overflow-hidden border w-full lg:w-6/12 md:w-6/12 bg-white mx-auto mp mt-16">
	<div class="w-full flex justify-between p-3">
		<div class="{isLoading && 'animate-pulse'} flex flex-col w-full">
			{#if isLoading}
				<div class="w-full flex flex-col space-y-3">
					<div class="w-full h-2 bg-neutral-400 rounded" />
					<div class="w-5/12 h-2 bg-neutral-400 rounded" />
				</div>
			{:else}
				<span class="pt-1 ml-2 font-bold text-md">{title}</span>
				<span class="pt-1 ml-2 font-bold text-xs">{username}</span>
			{/if}
		</div>
	</div>
	{#if isLoading}
		<div class="w-full bg-neutral-400 h-80 animate-pulse" />
	{:else}
		<img class="w-full bg-cover" src={image} alt={title} />
	{/if}
	<div class="flex p-3 items-center">
		<img
			class="w-8 h-8 grayscale hover:grayscale-0 hover:cursor-pointer"
			src="static/pogchamp.png"
			alt="upvote"
		/>
		<div class="px-2">
			{#if votes}
				{#if votes > 0}+{:else}-{/if}
				{votes}
			{:else}
				<div class="w-4 h-2 bg-neutral-400 rounded ml-auto animate-pulse" />
			{/if}
		</div>
		<img
			class="w-8 h-8 grayscale hover:grayscale-0 hover:cursor-pointer"
			src="static/biblethump.png"
			alt="downvote"
		/>
		{#if isLoading}
			<div class="w-24 h-2 bg-neutral-400 rounded ml-auto animate-pulse" />
		{:else}
			<div class="ml-auto text-sm">0 comments</div>
		{/if}
	</div>
</div>
