import { defineConfig } from "vite";

export default defineConfig({
  server: {
    fs: {
      strict: false, // Allows serving files outside root if needed
    },
    historyApiFallback: true, // Ensures React Router takes over routing
    host: "0.0.0.0",
    port: 4321, // Ensure you're using the correct port
  },
});
