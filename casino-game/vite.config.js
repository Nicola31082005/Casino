import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        game: resolve(__dirname, 'game.html'),
        rules: resolve(__dirname, 'rules.html'),
      },
    },
  },
  base: '/Casino/', // Ensures relative paths for build output
});