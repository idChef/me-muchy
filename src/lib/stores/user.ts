import { writable } from 'svelte/store';
import type { User } from '$lib/types/api';

export const currentUser = writable<User | undefined>(undefined);