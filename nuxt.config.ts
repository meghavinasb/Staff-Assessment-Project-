// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  css: [
    '~/assets/css/global.css'
  ],
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],

  pinia: {
    storesDirs: ['./stores/**']
  },

  devtools: {
    enabled: true
  },

  compatibilityDate: "2024-08-18"


})
