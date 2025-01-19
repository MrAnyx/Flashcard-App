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
        "pinia-plugin-persistedstate/nuxt",
        "@nuxtjs/i18n",
    ],
    ssr: false,
    imports: {
        dirs: [
            "utils/**",
            "jobs/**"
        ]
    },
    devtools: { enabled: false },
    css: [
        "~/assets/style/tailwind.scss"
    ],
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
            "slate", "cool", "zinc", "neutral", "stone",
            "gray"
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
    i18n: {
        defaultLocale: "en",
        locales: ["en", "fr"],
        vueI18n: "./i18n/i18n.config.ts",
        strategy: "no_prefix"
    },
    pinia: {
        storesDirs: ["./stores/**"],
    },
    piniaPluginPersistedstate: {
        storage: "localStorage",
        key: "meeio_%id"
    },
});
