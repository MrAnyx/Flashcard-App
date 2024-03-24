// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        pageTransition: { name: "page", mode: "out-in" }
    },
    sourcemap: {
        server: false,
        client: false
    },
    devtools: {
        enabled: false
    },
    i18n: {
        defaultLocale: "en",
        locales: ["en", "fr"],
        vueI18n: "./i18n/i18n.config.ts"
    },
    modules: ["@nuxt/ui", "@vueuse/nuxt", "@nuxtjs/i18n"],
    colorMode: {
        preference: "dark"
    },
    tailwindcss: {
        viewer: false
    },
    ssr: false,
    vite: {
        server: {
            hmr: {
                port: 3001
            }
        }
    }
});
