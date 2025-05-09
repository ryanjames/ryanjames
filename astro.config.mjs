import { defineConfig } from "astro/config";
import react from "@astrojs/react";

export default defineConfig({
  integrations: [react()],
  output: "static",
  adapter: undefined, // Ensure no SSR adapter is enabled
  build: {
    format: "directory",
  },
  server: {
    host: true, // Will make it available on all interfaces
  },
});