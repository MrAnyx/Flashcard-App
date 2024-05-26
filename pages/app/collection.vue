<template>
    <NuxtLayout name="app">
        <template #header>
            Collection
        </template>
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
    titleTemplate: () => "Collection"
});

definePageMeta({
    name: "collection",
    middleware: "is-connected"
});
</script>
