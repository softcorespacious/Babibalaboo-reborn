// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/Babibalaboo-reborn/',
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
