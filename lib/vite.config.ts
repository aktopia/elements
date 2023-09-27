import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@elements': resolve(__dirname, 'src'),
    },
  },
  preview: {
    port: 8000,
  },
  server: {
    port: 8000,
    strictPort: true,
  },
  build: {
    target: 'esnext',
  },
  plugins: [react()],
});
