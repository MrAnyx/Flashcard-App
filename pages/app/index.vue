<template>
    <div>
        <NuxtLayout name="app">
            <template #header>
                Personal dashboard
            </template>
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    name: "dashboard",
});

useHead({
    title: "Dashboard"
});
</script>
