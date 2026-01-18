import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: { 
    proxy: { //proxy demek frontendden gelen ıstek uzerıne araya gırıp backende yonlendıır
      '/api': { // axios.post('api/auth/login') dedı mesela ıstekde bulundu backendden proxy /api istegibi yakalayıp onu backend e yonlendıır
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
