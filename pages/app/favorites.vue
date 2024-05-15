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
    middleware: "is-connected"
});
</script>
