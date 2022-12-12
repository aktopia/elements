import { defineConfig } from "vite";
import path, { resolve } from "path";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

export default defineConfig({
  resolve: {
    alias: {
      "@elements": path.resolve(__dirname, "src/")
    }
  },
  build: {
    sourcemap: true,
    lib: {
      entry: {
        "components": resolve(__dirname, "src/components.ts"),
        "compositions": resolve(__dirname, "src/compositions.ts")
      }
    }
  },
  plugins: [react(), dts({ insertTypesEntry: true })]
});
