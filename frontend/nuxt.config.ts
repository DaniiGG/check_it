export default defineNuxtConfig({
  compatibilityDate: "2026-05-29",
  srcDir: "app/",
  app: {
    head: {
      title: "CheckIt — Liquidá tu backlog",
      htmlAttrs: { lang: "es" },
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
    },
    pageTransition: { name: "page", mode: "out-in" },
  },
  css: ["~/assets/main.css"],
  fonts: {
    families: {
      "Major Mono Display": [400],
      "JetBrains Mono": [300, 400, 500, 700],
    },
  },
  nitro: {
    preset: "node-server",
  },
  vite: {
    clearScreen: false,
  },
  future: {
    compatibilityVersion: 4,
  },
});
