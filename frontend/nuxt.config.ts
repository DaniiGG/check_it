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
      Orbitron: [500, 700, 900],
      Rajdhani: [300, 400, 500, 600, 700],
    },
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || "http://localhost:3000",
    },
  },
  nitro: {
    preset: "vercel",
  },
  vite: {
    clearScreen: false,
  },
  future: {
    compatibilityVersion: 4,
  },
});
