<script lang="ts">
	let inputText;
	export let addComment;

	const handleKeyPress = (event) => {
		if(event.keyCode === 13){
			event.preventDefault();
			addComment(inputText);
			inputText = "";
		}
	}
</script>

<div class="flex mx-auto items-center mb-4">
	<form class="w-full max-w-xl bg-white rounded-lg px-4">
		<div class="flex flex-wrap -mx-3 mb-6">
			<div class="w-full md:w-full px-3 mb-2 mt-2">
				<textarea
					class="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-14 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white text-sm"
					name="body"
					placeholder="Type Your Comment"
					required
					on:keydown={handleKeyPress}
					bind:value={inputText}
				/>
			</div>
		</div>
	</form>
</div>
