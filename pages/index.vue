<template>
    <div>
        <h1>Landing page</h1>
        <NuxtLink to="/app">
            App
        </NuxtLink>
        <NuxtLink to="/auth/login">
            Login
        </NuxtLink>

        <button @click="store.increment">
            {{ store.count }}
        </button>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    name: "landing"
});

useHead({
    titleTemplate: () => "Flashcard - Master your knowledge"
});

useAppConfig();

const store = useCounterStore();

// await useApi("/users/me", {});
</script>
