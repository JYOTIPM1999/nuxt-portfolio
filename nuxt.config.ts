// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Jyoti Prakash | Frontend Developer",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content: "Portfolio of Jyoti Prakash Mohapatra",
        },
        // Remove or override Open Graph Nuxt previews
        { property: "og:image", content: "/custom-preview.png" },
      ],
      link: [
        // Point to your custom favicon inside the public/ folder
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      ],
    },
  },
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: ["@nuxt/ui"],
});
