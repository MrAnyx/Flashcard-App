import pkg from "./package.json";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        "@nuxtjs/device",
        "@vueuse/nuxt",
        "@nuxt/image",
        "@nuxt/eslint",
        "@nuxt/test-utils/module",
        "@nuxt/ui",
        "@pinia/nuxt",
        "pinia-plugin-persistedstate/nuxt"
    ],
    ssr: false,
    imports: {
        dirs: [
            "utils/**",
            "jobs/**"
        ]
    },
    devtools: { enabled: true },
    router: {
        options: {
            scrollBehaviorType: "smooth"
        }
    },
    colorMode: {
        preference: "light"
    },
    ui: {
        safelistColors: [
            "red", "orange", "amber", "yellow", "lime", "green", "emerald", "teal", "cyan", "sky", "blue", "indigo", "violet", "purple", "fuchsia", "pink", "rose",
            "slate", "cool", "zinc", "neutral", "stone"
        ]
    },
    runtimeConfig: {
        public: {
            apiBaseUrl: process.env.API_BASE_URL,
            appVersion: pkg.version,
        },
    },
    compatibilityDate: "2024-11-01",
    eslint: {
        config: {
            stylistic: {
                indent: 4,
                semi: true,
                quotes: "double",
                commaDangle: "only-multiline",
                braceStyle: "allman",
                quoteProps: "as-needed",
            }
        },
    },
    pinia: {
        storesDirs: ["./stores/**"],
    },
    piniaPluginPersistedstate: {
        storage: "localStorage",
        key: "flashcard_%id"
    },
});
