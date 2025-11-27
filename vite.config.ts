import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    // Aumentamos el límite de aviso para que no moleste en consola
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          // 1. Separar el núcleo de React
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // 2. Separar Firebase (es pesado)
          'vendor-firebase': ['firebase/app', 'firebase/auth', 'firebase/firestore'],
          // 3. Separar la librería de Iconos (esto soluciona el archivo gigante de iconos)
          'vendor-icons': ['react-icons'],
          // 4. Utilidades varias
          'vendor-utils': ['@emailjs/browser', 'recharts']
        }
      }
    }
  }
})