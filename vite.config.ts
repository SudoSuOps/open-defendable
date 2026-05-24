import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// DefendableOS — minimal standalone React + Vite app.
// Deployed to defendableos.com via Cloudflare Pages.
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    target: "es2020",
    sourcemap: false,
  },
  server: {
    port: 5174,
    host: true,
  },
});
