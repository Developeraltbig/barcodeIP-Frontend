import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import jsconfigPaths from "vite-jsconfig-paths";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    base: "/",

    plugins: [
      react(),
      jsconfigPaths(),
    ],

    server: {
      host: "0.0.0.0",
      port: 3000,
      strictPort: true,
      open: true,
      allowedHosts: true,
    },

    preview: {
      host: "0.0.0.0",
      port: 3000,
      open: true,
    },

    define: {
      global: "window",
    },

    resolve: {
      preserveSymlinks: true,
    },
  };
});