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
    middleware: ["auth", "initialize"]
});

useHead({
    title: "Collection"
});
</script>
