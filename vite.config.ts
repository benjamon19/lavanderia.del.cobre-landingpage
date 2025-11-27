// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-firebase': ['firebase/app', 'firebase/auth', 'firebase/firestore'],
          // CAMBIO: Separar iconos por familias si es posible, o dejarlo así si ya funciona bien
          'vendor-icons': ['react-icons'], 
          'vendor-utils': ['@emailjs/browser', 'recharts']
        }
      }
    }
  }
})