import path from "path";

import react from "@vitejs/plugin-react";
import { defineConfig, splitVendorChunkPlugin } from "vite";
import packageJson from "./package.json";

export default defineConfig({
  base: "/",
  build: {
    // outDir: 'dist', // name of output directory; default is 'dist'
    // assetsDir: 'assets', // name of assets directory; default is 'assets'
    // minify: "esbuild", //  minify the code; default is 'esbuild'
    sourcemap: false,
  },
  define: {
    __APP_VERSION__: JSON.stringify(packageJson.version),
  },
  server: {
    port: 3000,
  },
  plugins: [react(), splitVendorChunkPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
});
