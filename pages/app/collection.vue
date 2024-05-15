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
    middleware: "is-connected"
});
</script>
