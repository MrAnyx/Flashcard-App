<template>
    <div>
        <NuxtLayout name="app">
            <template #header>
                Practice
            </template>
            <div class="p-6">
                <UCard class="w-full">
                    <GraphLine />
                </UCard>
            </div>
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    name: "practice",
    middleware: ["initialize"]
});

useHead({
    title: "Practice"
});
</script>
