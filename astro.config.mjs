// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://metanoiastudios.com', // ajustar cuando tengamos el dominio final
  vite: {
    plugins: [tailwindcss()],
  },
});
