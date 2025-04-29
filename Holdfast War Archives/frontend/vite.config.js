import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: process.env.VITE_BASE_PATH || "/Holdfast_War_Archives",
  // Add this section to explicitly define the root directory
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  // Add this to explicitly define where to find index.html
  root: '.',
})