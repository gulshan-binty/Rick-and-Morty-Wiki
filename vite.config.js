import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // eslint-disable-next-line no-undef
  // base: process.env.VITE_BASE_PATH || "/Rick-and-Morty-Wiki",
});
