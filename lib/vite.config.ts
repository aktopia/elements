import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@elements': resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 8000,
    strictPort: true,
    hmr: {
      clientPort: 8000,
    },
  },
  plugins: [react()],
});
