import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Permite usar describe, it, expect sin importarlos
    environment: 'jsdom', // Simula el navegador
    setupFiles: './src/test/setupTests.js', // Archivo de configuración inicial
    css: true, // Procesa archivos CSS/SCSS si los importas en tests
  },
})