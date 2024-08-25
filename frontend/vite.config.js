import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import cssImport from "vite-plugin-import-css";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), cssImport()],
  server: {
    port: 3000,
  },
});
