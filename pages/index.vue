<template>
    <div>
        <h1>Landing page</h1>
        <NuxtLink to="/app">
            App
        </NuxtLink>
        <NuxtLink to="/auth/login">
            Login
        </NuxtLink>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    name: "landing"
});

useHead({
    title: "Master your knowledge"
});
</script>
