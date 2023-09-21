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
    host: '127.0.0.1',
    port: 8000,
  },
  server: {
    port: 8000,
    strictPort: true,
    hmr: {
      clientPort: 8000,
    },
  },
  build: {
    target: 'esnext',
  },
  plugins: [react()],
});
