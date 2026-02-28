import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Anotador-de-Generala/', // Para GitHub Pages - cambiar al nombre de tu repositorio
})
