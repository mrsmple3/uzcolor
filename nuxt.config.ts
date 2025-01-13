// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2024-04-03",
    devtools: {enabled: true},
    modules: [
        "@nuxt/ui",
        "@nuxt/fonts",
        "@nuxt/image",
        "nuxt-swiper",
        "@pinia/nuxt",
        '@vee-validate/nuxt',
        "shadcn-nuxt",
    ],
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
                sass: {
                    api: "modern",
                },
            },
        },
    },
    runtimeConfig: {
        public: {
            twilioAccountSid: process.env.TWILIO_ACCOUNT_SID,
            twilioAuthToken: process.env.TWILIO_AUTH_TOKEN,
        },
        jwtAccessSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
        jwtRefreshSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
    },
    plugins: [
        '~/plugins/vue-the-mask.ts'
    ],
    colorMode: {
        preference: 'dark'
    },
    shadcn: {
        prefix: 'UI',
        componentDir: './components/ui'
    }
});