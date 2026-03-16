// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',


  // Enable Nuxt 4 directory layout — source lives in app/
  future: {
    compatibilityVersion: 4,
  },

  devtools: { enabled: true },

  nitro: {
    prerender: {
      failOnError: false,
    },
  },

  modules: ['@nuxt/content'],

  content: {
    // @ts-ignore — highlight is a valid runtime option; @nuxt/content types lag behind
    highlight: {
      theme: 'github-light',
      langs: ['vue', 'ts', 'html', 'css', 'bash', 'json'],
    },
  },

  app: {
    baseURL: process.env.NUXT_APP_BASE_URL ?? '/',
    head: {
      title: 'AgDS-vue — Agriculture Design System',
      meta: [
        {
          name: 'description',
          content: 'Accessible Vue 3 components for the Agriculture Design System (AgDS) — Department of Agriculture, Fisheries and Forestry',
        },
      ],
    },
  },
})
