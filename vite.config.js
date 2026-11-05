import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    // Forward /api/... calls from the React site to the donation server
    proxy: {
      "/api": "http://localhost:4242",
    },
  },
});
