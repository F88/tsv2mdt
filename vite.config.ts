/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('mui')) {
              return 'vendor-mui';
            }
            // if (id.includes('react')) {
            // return 'vendor-react';
            // }
            return 'vendor';
          }
          // if (id.includes('src')) {
          //   // if (id.includes('src/assets')) {
          //   // return 'src-assets';
          //   // }
          //   return 'src';
          // }
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./test/setup.ts'],
  },
});
