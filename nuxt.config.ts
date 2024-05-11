// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ["@nuxt/ui", "@vueuse/nuxt", "@nuxtjs/i18n", "@pinia/nuxt"],
    ssr: true,
    runtimeConfig: {
        public: {
            env: process.env.ENV,
            apiBaseUrl: process.env.API_BASE_URL
        }
    },
    router: {
        options: {
            scrollBehaviorType: "smooth"
        }
    },
    i18n: {
        defaultLocale: "en",
        locales: ["en", "fr"],
        vueI18n: "./i18n/i18n.config.ts",
        strategy: "no_prefix"
    },
    pinia: {
        storesDirs: ["./stores/**"]
    },
    colorMode: {
        preference: "dark"
    },
    tailwindcss: {
        viewer: false
    },
    sourcemap: {
        server: false,
        client: false
    },
    devtools: {
        enabled: false
    },
    vite: {
        server: {
            hmr: {
                port: 3001
            }
        }
    }
});
