import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    proxy: {
      "/api": "https://traveler-s-horizons.onrender.com",
    },
  },
  plugins: [react()],
});
