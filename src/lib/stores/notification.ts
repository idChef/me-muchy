import { writable } from 'svelte/store';

type notificationTypes = 'default' | 'error';

export interface notificationState {
	text: string;
	type: notificationTypes;
	isVisible: boolean;
}

export const currentNotification = writable<notificationState>({
	text: 'Test',
	type: 'default',
	isVisible: false
});

export const fireNotification = (text: string, time: number, type?: notificationTypes): void => {
	currentNotification.set({
		text: text,
		type: type || 'default',
		isVisible: true
	});

	setTimeout(() => {
		currentNotification.update((notification) => {
			const newNotification = { ...notification };
			newNotification.isVisible = false;

			console.log(newNotification)
			return newNotification;
		});
	}, time);
};
