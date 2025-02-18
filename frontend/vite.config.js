import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  server: {
    allowedHosts: ["store.rashash.io"],

   origin:"https://store.rashash.io"
  },
  plugins: [react(), tailwindcss()],
});
