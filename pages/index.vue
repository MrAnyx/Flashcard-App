<template>
    <section class="flex flex-col h-svh overflow-auto">
        <nav class="h-16 w-full fixed flex items-center justify-center border-b border-gray-200 dark:border-gray-800 backdrop-blur">
            <div class="w-7/12">
                nav
            </div>
        </nav>
        <div
            v-for="i in 100"
            :key="i"
        >
            toto
        </div>
    </section>
</template>

<script setup lang="ts">
definePageMeta({
    name: "landing",
});

useHead({
    title: "Master your knowledge"
});
</script>
