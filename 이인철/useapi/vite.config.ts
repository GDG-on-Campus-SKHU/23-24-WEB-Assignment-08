import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/6260000': {
        target: 'http://apis.data.go.kr/6260000/FoodService',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/6260000/, ''),
        headers: {
          'Access-Control-Allow-Origin': '*' // 또는 허용하는 도메인을 명시적으로 지정
        }
      }
    }
  }
  
})
