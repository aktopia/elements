import { defineConfig } from "vite";
import path, { resolve } from "path";
import react from "@vitejs/plugin-react";

export default defineConfig({
  resolve: {
    alias: {
      "@elements": path.resolve(__dirname, "src/")
    }
  },
  build: {
    lib: {
      entry: [
        resolve(__dirname, "src/components.ts"),
        resolve(__dirname, "src/compositions.ts")
      ]
    }
  },
  plugins: [react()]
});
