// @ts-check
import { defineConfig } from 'astro/config';

// Import react
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
});