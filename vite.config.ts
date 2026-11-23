import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// O site é publicado em https://flowzinnn.github.io/portfolio/
// Se um dia usar domínio próprio (ex.: nicolaswolf.com.br), troque `base` para '/'.
export default defineConfig({
  base: '/portfolio/',
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        // Bibliotecas em arquivos separados: o navegador guarda em cache entre visitas.
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (/node_modules[\\/](react|react-dom|scheduler|react-router)[\\/]/.test(id)) return 'react'
          if (/node_modules[\\/](motion|motion-dom|motion-utils|framer-motion)[\\/]/.test(id)) return 'motion'
          return 'vendor'
        },
      },
    },
  },
})
