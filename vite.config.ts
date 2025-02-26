import { purgeCss } from 'vite-plugin-tailwind-purgecss';
import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins:[sveltekit(), purgeCss()], 
	server: {
		host: '192.168.0.173', // Your local network IP
		port: 4000, // Choose your preferred port
		strictPort: true // Prevents fallback to another port if 5173 is in use
	}
});