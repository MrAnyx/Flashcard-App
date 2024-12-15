<template>
    <div>
        <NuxtLayout name="app">
            <template #header>
                Settings
            </template>

            <UHorizontalNavigation
                :links="links"
                class="border-b dark:border-gray-800"
                :ui="{ inner: 'shrink-0', container: 'px-3 overflow-auto' }"
            />
            <section class="p-6">
                <NuxtPage />
            </section>
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
import type { HorizontalNavigationLink } from "#ui/types";

definePageMeta({
    name: "settings",
    middleware: ["auth", "initialize"]
});

useHead({
    title: "Settings"
});

const links: HorizontalNavigationLink[] = [{
    label: "Account",
    icon: "i-tabler-user",
    to: "/app/settings/account",
    exact: true
}, {
    label: "General",
    icon: "i-tabler-settings",
    to: "/app/settings/general",
    exact: true
}, {
    label: "Appearance",
    icon: "i-tabler-palette",
    to: "/app/settings/appearance",
    exact: true
}];
</script>
