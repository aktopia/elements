import { defineConfig, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  resolve: {
    alias: {
      '@elements': resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000,
    strictPort: true,
    headers: {
      'Cache-Control': 'no-store, no-cache',
    },
  },
  build: {
    target: 'esnext',
  },
  assetsInclude: ['**/*.md'],
  plugins: [react(), svgr(), splitVendorChunkPlugin()],
});
