// https://nuxt.com/docs/api/configuration/nuxt-config
import pkg from "./package.json";

console.log(process.env.NODE_ENV);

export default defineNuxtConfig({
    modules: ["@nuxt/ui", "@vueuse/nuxt", "@nuxtjs/i18n", "@pinia/nuxt", "@pinia-plugin-persistedstate/nuxt", "@nuxt/eslint", "nuxt-umami"],
    ssr: false,
    runtimeConfig: {
        public: {
            apiBaseUrl: process.env.API_BASE_URL,
            appVersion: pkg.version,
        },
    },
    umami: {
        id: process.env.UMAMI_TOKEN,
        host: process.env.UMAMI_HOST,
        autoTrack: true,
        enabled: process.env.NODE_ENV === "production",
        // proxy: 'cloak',
        // useDirective: true,
        // ignoreLocalhost: true,
        // excludeQueryParams: false,
        // domains: ['cool-site.app', 'my-space.site'],
        // customEndpoint: '/my-custom-endpoint',
        // logErrors: true,
    },
    imports: {
        dirs: [
            "utils/**"
        ]
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
    // sourcemap: {
    //     server: false,
    //     client: false
    // },
    devtools: {
        enabled: false,

        timeline: {
            enabled: true
        }
    },
    // vite: {
    //     server: {
    //         middlewareMode: true,
    //         hmr: {
    //             port: 3001
    //         }
    //     }
    // },
    compatibilityDate: "2024-07-28"
});
