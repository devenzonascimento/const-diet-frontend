import path from "path"
import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"
 
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@tailwind": "./tailwind.config.js",
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,  
  }
})
