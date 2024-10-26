// https://nuxt.com/docs/api/configuration/nuxt-config
import pkg from "./package.json";

console.log(process.env.NODE_ENV);

export default defineNuxtConfig({
    modules: ["@nuxt/ui", "@vueuse/nuxt", "@nuxtjs/i18n", "@pinia/nuxt", "@pinia-plugin-persistedstate/nuxt", "nuxt-umami", "@nuxt/eslint"],
    ssr: false,
    imports: {
        dirs: [
            "utils/**"
        ]
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
    router: {
        options: {
            scrollBehaviorType: "smooth"
        }
    },
    colorMode: {
        preference: "dark"
    },
    runtimeConfig: {
        public: {
            apiBaseUrl: process.env.API_BASE_URL,
            appVersion: pkg.version,
        },
    },
    // vite: {
    //     server: {
    //         middlewareMode: true,
    //         hmr: {
    //             port: 3001
    //         }
    //     }
    // },
    compatibilityDate: "2024-07-28",
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
    i18n: {
        defaultLocale: "en",
        locales: ["en", "fr"],
        vueI18n: "./i18n/i18n.config.ts",
        strategy: "no_prefix"
    },
    pinia: {
        storesDirs: ["./stores/**"]
    },
    piniaPersistedstate: {
        storage: "localStorage"
    },
    tailwindcss: {
        viewer: false
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
});
