import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  base: "/how-to-react/",
});
