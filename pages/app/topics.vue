<template>
    <NuxtLayout name="app">
        <template #header>
            Topics
        </template>
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
    titleTemplate: () => "Topics"
});
</script>
