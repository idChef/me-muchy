import { writable } from 'svelte/store';

export const currentNotification = writable<string>('');

export const fireNotification = (text: string, time: number) => {
	currentNotification.set(text);

	setTimeout(() => {
		currentNotification.set('');
	}, time);
};
