import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom", // allows DOM-like testing
    globals: true,         // optional, gives global test() and expect()
    setupFiles: "./src/setupTests.js", // we'll create this next
  },
});
