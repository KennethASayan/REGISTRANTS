import { writable } from 'svelte/store';

export const activeRoute = writable('registrants');
export const pageTransition = writable({ y: 20, duration: 300, opacity: 0 });