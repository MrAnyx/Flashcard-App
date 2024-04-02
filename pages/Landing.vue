<template>
    <div>
        <h1>Landing page</h1>
        <NuxtLink :to="{ name: 'home'}">
            App
        </NuxtLink>
        <NuxtLink :to="{name: 'login'}">
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
