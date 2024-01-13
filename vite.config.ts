import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/DIA_5Term_Frontend/",
  plugins: [react()],
})
