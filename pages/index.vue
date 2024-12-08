<template>
    <div class="h-svh">
        <h1>Landing page</h1>
        <NuxtLink to="/app">
            App
        </NuxtLink>
        <NuxtLink to="/auth/login">
            Login
        </NuxtLink>
        <NuxtLink to="/pricing">
            Pricing
        </NuxtLink>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    name: "landing",
});

useHead({
    title: "Master your knowledge"
});
</script>
