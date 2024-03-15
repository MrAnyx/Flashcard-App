// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {
        enabled: false
    },
    modules: ["@nuxt/ui", "@vueuse/nuxt"],
    colorMode: {
        preference: "dark"
    },
    tailwindcss: {
        viewer: false
    },
    ssr: true,
    vite: {
        server: {
            hmr: {
                port: 3001
            }
        }
    }
});
