import react from '@vitejs/plugin-react';
import path, { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  resolve: {
    alias: {
      '@elements': path.resolve(__dirname, 'src/'),
    },
  },
  build: {
    sourcemap: true,
    lib: {
      entry: {
        components: resolve(__dirname, 'src/components.ts'),
        compositions: resolve(__dirname, 'src/compositions.ts'),
        store: resolve(__dirname, 'src/store.tsx'),
      },
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
    },
  },
  plugins: [react(), dts({ insertTypesEntry: true })],
});
