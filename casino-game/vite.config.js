import { defineConfig } from 'vite';

export default defineConfig({
  root: './', // The root directory for your source code (keeps it the same, pointing to the project root)
  build: {
    outDir: 'dist', // The output directory for the build files
    emptyOutDir: true, // Clears the 'dist' folder before each build
  },
  publicDir: 'public', // The folder where your static files (index.html and others) are stored
  base: '/', // Ensure your app works correctly from the root path
});
