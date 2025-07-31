import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: '.', // ensures Vite builds from project root
  build: {
    outDir: 'dist', // ensures output goes to dist/
  },
});
