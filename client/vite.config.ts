import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: 3000,
    watch: { usePolling: true },
    proxy: {
      "/api": {
        target: `${process.env.VITE_BETTER_AUTH_URL}/api`,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
    cors: {
      origin: `${process.env.VITE_BETTER_AUTH_URL}`,
    },
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
