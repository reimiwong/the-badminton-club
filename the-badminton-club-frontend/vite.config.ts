import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(() => {
  console.log("🔎 BUILD‑TIME VITE_API_URL =", process.env.VITE_API_URL)

  return {
    plugins: [
      react(),
      tailwindcss(),
    ],
  }
})