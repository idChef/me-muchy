<script lang="ts">
	let inputText;
	export let addComment;

	import { currentUser } from '$lib/stores/user';
	import { get } from 'svelte/store';

	$: userData = get(currentUser);

	const handleKeyPress = (event) => {
		if (event.keyCode === 13) {
			event.preventDefault();
			addComment(inputText);
			inputText = '';
		}
	};

	const handleClick = (event) => {
		event.preventDefault();
	};
</script>

<div class="flex mx-auto items-center mb-3">
	<form class="w-full max-w-xl bg-white rounded-lg px-4">
		<div class="flex flex-wrap -mx-3">
			<div class="w-full md:w-full px-3 mt-2">
				<textarea
					class={`bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-14 py-2 px-3 font-medium placeholder-gray-700 
					focus:outline-none focus:bg-white text-sm ${userData ? '' : 'opacity-40 cursor-not-allowed'}`}
					name="body"
					placeholder="Type Your Comment"
					required
					on:keydown={handleKeyPress}
					on:click={handleClick}
					bind:value={inputText}
					disabled={!userData}
				/>
			</div>
		</div>
	</form>
</div>
