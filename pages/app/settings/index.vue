<template>
    <div>
        <NuxtLayout name="app">
            <template #header>
                Settings
            </template>
            <UHorizontalNavigation
                :links="links"
                class="border-b border-gray-800 overflow-auto"
                :ui="{ inner: 'shrink-0', container: 'px-4'}"
            />
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
const route = useRoute();

const links = [{
    label: "Profile",
    avatar: {
        src: "https://avatars.githubusercontent.com/u/739984?v=4"
    },
    badge: 100
}, {
    label: "Installation",
    icon: "i-heroicons-home",
    to: "/getting-started/installation"
}, {
    label: "Horizontal Navigation",
    icon: "i-heroicons-chart-bar",
    to: `${route.path.startsWith("/dev") ? "/dev" : ""}/components/horizontal-navigation`
}, {
    label: "Command Palette",
    icon: "i-heroicons-command-line",
    to: "/components/command-palette"
}];
</script>
