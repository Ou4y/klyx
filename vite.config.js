import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    target: ['es2017', 'safari12'],
    cssTarget: 'safari12',
    cssCodeSplit: true,
    sourcemap: false,
  },
})
