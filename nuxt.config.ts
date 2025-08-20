import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  // ssr: false,
  devtools: {
    enabled: true,
  },
  modules: [
    '@nuxt/ui',
    '@pinia/nuxt',
    '@byc/pinia-colada-nuxt',
  ],
  css: [
    '~/assets/css/main.css',
  ],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  imports: {
    dirs: ['./server/utils'],
  },
  ui: {
    fonts: false,
  },
})
