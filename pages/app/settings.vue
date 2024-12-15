<template>
    <div>
        <NuxtLayout name="app">
            <template #header>
                Settings
            </template>

            <section>
                <div class="px-2 border-b border-gray-200 dark:border-gray-800 overflow-auto">
                    <UHorizontalNavigation
                        :links="links"
                    />
                </div>
                <div class="p-6">
                    <NuxtPage />
                </div>
            </section>
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
import type { HorizontalNavigationLink } from "#ui/types";

definePageMeta({
    middleware: ["auth", "initialize"]
});

useHead({
    title: "Settings"
});

const links: HorizontalNavigationLink[] = [{
    label: "Account",
    icon: "i-tabler-user",
    to: {
        name: "settings-account"
    },
    exact: true
}, {
    label: "General",
    icon: "i-tabler-settings",
    to: {
        name: "settings-general"
    },
    exact: true
}, {
    label: "Appearance",
    icon: "i-tabler-palette",
    to: {
        name: "settings-appearance"
    },
    exact: true
}];
</script>
