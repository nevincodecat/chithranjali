import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["sparrow-united-locally.ngrok-free.app"], // NO https:// or trailing slash
  },
});
