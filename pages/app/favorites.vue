<template>
    <NuxtLayout name="app">
        <template #header>
            Favorites
        </template>
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
    name: "favorites",
    middleware: ["initialize"]
});

useHead({
    title: "My favorites"
});
</script>
