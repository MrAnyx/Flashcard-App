<template>
    <NuxtLayout name="app">
        <template #header>
            Practice
        </template>
        <NuxtPage />
    </NuxtLayout>
</template>

<script lang="ts" setup>
definePageMeta({
    middleware: ["auth", "initialize"] // Order is important to first check login and then initialize
});

useHead({
    title: "Practice"
});
</script>
