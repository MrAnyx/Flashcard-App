// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    modules: ["@nuxt/ui", "@vueuse/nuxt", "@nuxtjs/i18n", "@pinia/nuxt", "@pinia-plugin-persistedstate/nuxt", "@nuxt/eslint"],
    ssr: true,
    runtimeConfig: {
        public: {
            apiBaseUrl: process.env.API_BASE_URL
        }
    },
    eslint: {
        config: {
            stylistic: {
                indent: 4,
                semi: true,
                quotes: "double",
                commaDangle: "only-multiline",
                braceStyle: "allman",
                quoteProps: "as-needed"
            }
        },
    },
    piniaPersistedstate: {
        cookieOptions: {
            sameSite: "strict"
        },
        storage: "localStorage"
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
            middlewareMode: true,
            hmr: {
                port: 3001
            }
        }
    }
});
