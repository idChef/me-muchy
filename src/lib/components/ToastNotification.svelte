<script>
	export let message;
</script>

<div
	class="fixed right-4 top-16 text-white bg-green-500 hover:bg-green-600 rounded-md px-5 py-4 cursor-pointer z-10 transition-opacity "
    class:hidden-element={message.length < 1}
>
	<div class="flex items-center space-x-2">
		<svg
			class="w-7 h-7"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
		</svg>

		<p class="font-bold ">{message}</p>
	</div>
</div>
