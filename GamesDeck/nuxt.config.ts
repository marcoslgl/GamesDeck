// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  srcDir: "./app",
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
  css: ["../assets/app.css"],
});
