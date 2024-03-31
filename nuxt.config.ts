// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ["@nuxt/ui", "@vueuse/nuxt", "@nuxtjs/i18n"],
    ssr: true,
    app: {
        pageTransition: { name: "page", mode: "out-in" }
    },
    i18n: {
        defaultLocale: "en",
        locales: ["en", "fr"],
        vueI18n: "./i18n/i18n.config.ts"
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
