import { writable } from 'svelte/store';

type notificationTypes = 'default' | 'error';

export interface notificationState {
	text: string;
	type: notificationTypes;
}

export const currentNotification = writable<notificationState>({ text: '', type: 'default' });

export const fireNotification = (text: string, time: number, type?: notificationTypes): void => {
	currentNotification.set({
		text: text,
		type: type || 'default'
	});

	setTimeout(() => {
		currentNotification.set({ text: '', type: 'default' });
	}, time);
};
