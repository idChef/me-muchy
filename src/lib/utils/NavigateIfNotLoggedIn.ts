import { onMount } from 'svelte';
import { goto } from '$app/navigation';
import { get } from 'svelte/store';
import { currentUser } from '$lib/stores/user';

export const NavigateIfNotLoggedIn = (): void => {
	onMount(() => {
		if (!get(currentUser)) goto('/');
	});
};
