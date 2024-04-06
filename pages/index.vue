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

useHead({
    titleTemplate: () => {
        return "Flashcard - Master your knowledge";
    }
});
</script>
