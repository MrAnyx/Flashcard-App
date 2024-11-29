// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt({
    ignores: [".devcontainer/", ".docker/", ".github/", ".nuxt/", ".output/", ".vscode/", "node_modules/"],
    rules: {
        "no-async-promise-executor": "off",

        "@typescript-eslint/no-unused-vars": "warn",
        "vue/max-attributes-per-line": ["error", {
            singleline: {
                max: 3
            },
            multiline: {
                max: 1
            }
        }]
    }
});
