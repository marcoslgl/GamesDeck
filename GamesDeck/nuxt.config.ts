// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  srcDir: "./app",
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
  css: ["../assets/app.css"],

  app: {
    head: {
      htmlAttrs: {
        lang: "es",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "GamesDeck - Descubre los mejores streamers y categorías de juegos en directo. Sigue tus canales favoritos y únete a la comunidad gaming.",
        },
        { name: "theme-color", content: "#000000" },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "GamesDeck" },
        {
          property: "og:description",
          content: "Descubre los mejores streamers y juegos en directo en GamesDeck.",
        },
        { property: "og:image", content: "/og-image.png" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:creator", content: "@GamesDeck" },
      ],
      link: [
        { rel: "canonical", href: "https://gamesdeck.com" },
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      ],
    },
  },
});
