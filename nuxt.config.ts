// // https://nuxt.com/docs/api/configuration/nuxt-config
// export default defineNuxtConfig({
//   compatibilityDate: "2025-07-15",
//   devtools: { enabled: true },
//   modules: ["@nuxtjs/tailwindcss", "@nuxt/icon", "@pinia/nuxt",'pinia-plugin-persistedstate/nuxt'],
//   piniaPluginPersistedstate: {
//     storage: "localStorage", // or 'cookies' if small data
//   },
// });
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/icon",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
  ],

  piniaPluginPersistedstate: {
    storage: "localStorage",
  },
});
