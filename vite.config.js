import { defineConfig } from "vite";

export default defineConfig({
  server: {
    fs: {
      strict: false, // Allows serving files outside root if needed
    },
    historyApiFallback: true, // Ensures React Router takes over routing
  },
});
