<template>
    <NuxtLayout name="app">
        <template #header>
            Collection
        </template>
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
    name: "collection",
});

useHead({
    titleTemplate: (titleChunk) =>
    {
        return titleChunk ? `${titleChunk} - Collection` : "Collection";
    }
});
</script>
