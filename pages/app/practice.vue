<template>
    <div>
        <NuxtLayout name="app">
            <template #header>
                Practice
            </template>
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    name: "practice",
    middleware: "is-connected"
});

useHead({
    title: "Practice"
});
</script>
