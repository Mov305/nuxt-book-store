// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
    'nuxt-graphql-client',
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', 'acceptHMRUpdate'],
      },
    ],
  ],
  'graphql-client': {
    watch: true,
    autoImport: true,
    functionPrefix: 'Gql',
    documentPaths: ['./'],
    preferGETQueries: false,
  },

  imports: {
    dirs: ['stores'],
  },

  runtimeConfig: {
    public: {
      GQL_HOST: process.env.GQL_HOST || 'http://localhost:3001/graphql',
    },
  },
});
