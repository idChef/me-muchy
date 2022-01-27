import { writable } from 'svelte/store';
import type { User } from '$lib/types/api';
import { browser } from '$app/env';

const getUserFromStorage = () => {
	if (!browser) return;

	const userData = window.localStorage.getItem('currentUser');

	if (userData === '') return undefined;
	else return JSON.parse(userData);
};

// This is obviously unsafe but the app is just an example
export const currentUser = writable<User | undefined>(getUserFromStorage() || undefined);

export const setAndSaveUser = (user: User | undefined): void => {
	currentUser.set(user);
	if (user) window.localStorage.setItem('currentUser', JSON.stringify(user));
	else window.localStorage.setItem('currentUser', '');
};