<template>
    <div>
        <NuxtLayout name="app">
            <template #header>
                Administration
            </template>

            <UHorizontalNavigation
                :links="links"
                class="border-b border-gray-800"
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

useHead({
    titleTemplate: (titleChunk) =>
    {
        return titleChunk ? `${titleChunk} - Administration` : "Administration";
    }
});

definePageMeta({
    name: "admin-dashboard",
    middleware: "is-admin"
});

const links: HorizontalNavigationLink[] = [{
    label: "Account",
    icon: "i-heroicons-user",
    to: "/app/settings/account",
    exact: true
}, {
    label: "General",
    icon: "i-heroicons-cog-6-tooth",
    to: "/app/settings/general"
}, {
    label: "Appearance",
    icon: "i-heroicons-swatch",
    to: "/app/settings/appearance"
}];
</script>
