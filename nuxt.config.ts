// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2024-04-03",
    // devtools: { enabled: true },
    modules: ["@nuxt/ui", "@nuxt/fonts", "@nuxt/image", "nuxt-swiper"],
    fonts: {
        defaults: {
            weights: [400],
            styles: ["normal"],
            subsets: ["Aeonik TRIAL"],
        },
    },
    css: ["~/assets/css/style.scss"],
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@use "@/assets/css/_templates.scss" as *;',
                },
            },
        },
    },
});