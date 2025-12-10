import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Configuración para Vitest
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setupTests.js', // Aquí es donde se importa jest-dom
    css: true,
  },
})