// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: './'  , // 👈 this fixes relative path issues!
  plugins: [react() ,  tailwindcss()],
})
