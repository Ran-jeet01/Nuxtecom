import Icons from "unplugin-icons/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "@nuxt/icon"],
  icon: {
    // Ensures local collections are prioritized (you already installed ri & mdi)
    serverBundle: {
      collections: ["ri", "mdi"], // optional but recommended
    },
  },
});
