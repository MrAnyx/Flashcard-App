<template>
    <NuxtLayout name="app">
        <template #header>
            Practice
        </template>
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: ["initialize"]
});

useHead({
    titleTemplate: (titleChunk) =>
    {
        return titleChunk ? `${titleChunk} - Practice` : "Practice";
    }
});
</script>
