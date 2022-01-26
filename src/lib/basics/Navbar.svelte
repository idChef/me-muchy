<script lang="ts">
	import { currentUser } from '$lib/stores/user';
	import { clickOutside } from '$lib/directives/click_outside';

	let userMenuHidden = true;

	const handleMenuToggle = () => {
		userMenuHidden = !userMenuHidden;
	};

	const handleMenuClose = () => {
		if (!userMenuHidden) userMenuHidden = true;
	};

	const handleLogout = () => {
		userMenuHidden = true;
		setTimeout(() => {
			currentUser.set(undefined);
		}, 1500);
	};
</script>

<nav class="z-20 fixed top-0 left-0 w-full bg-gray-100 shadow-md">
	<div class="flex justify-between items-center bg-white py-2  px-10">
		<div class="">
			<a href="/"><img class="h-8 cursor-pointer" src="/slim-logo.svg" alt="" /></a>
		</div>
		<ul class="lg:flex hidden items-center space-x-10">
			{#if $currentUser}<a href="/submit" class="btn"> Dodaj mema </a>{/if}
			<div class="relative flex select-none" use:clickOutside on:outclick={handleMenuClose}>
				<img
					src="/icons/user.svg"
					class="w-6 h-6  grayscale object-fill hover:cursor-pointer"
					on:click={handleMenuToggle}
				/>
				<img
					src="/icons/chevron-down.svg"
					class="w-6 h-6  grayscale object-fill hover:cursor-pointer"
					class:rotate-180={!userMenuHidden}
					on:click={handleMenuToggle}
				/>
				<div
					class="px-2 py-2 bg-white rounded-md shadow absolute right-0 top-8 transition-opacity max-w-xs text-right"
					class:hidden-element={userMenuHidden}
				>
					{#if !$currentUser}
						<a
							class="block px-4 py-2 mt-2  bg-transparent rounded-lg  text-sm font-semibold md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
							href="/auth/login"
							on:click={handleMenuClose}>Logowanie</a
						>
						<a
							class="block px-4 py-2 mt-2  bg-transparent rounded-lg  text-sm font-semibold md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
							href="/auth/register"
							on:click={handleMenuClose}>Rejestracja</a
						>
					{:else}
						<span class="block px-4 py-2 mt-2  bg-transparent rounded-lg  text-sm md:mt-0 focus:outline-none focus:shadow-outline select-none font-bold overflow-hidden text-ellipsis">u/{$currentUser.userName}</span>
						<span
							class="block px-4 py-2 mt-2  bg-transparent rounded-lg  text-sm font-semibold md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline cursor-pointer select-none"
							on:click={handleLogout}>Wyloguj</span
						>
					{/if}
				</div>
			</div>
		</ul>
		<div class="lg:hidden">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-10 w-10 cursor-pointer"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 6h16M4 12h16M4 18h16"
				/>
			</svg>
		</div>
		{#if $currentUser}
			<div class="fixed w-screen h-screen  md:hidden">

			</div>
		{/if}
	</div>
</nav>
