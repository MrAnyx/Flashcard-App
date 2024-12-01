<template>
    <NuxtLayout name="app">
        <template #header>
            Practice
        </template>
        <div class="h-full flex flex-col justify-between items-center">
            <h1>Hello World</h1>
            <!-- <div class="grow bg-red-500 overflow-auto">
                <h1
                    v-for="i in 90"
                    :key="i"
                >
                    hello world
                </h1>
            </div> -->
            <h1>Hello World</h1>
        </div>
    </NuxtLayout>
</template>

<script lang="ts" setup>
definePageMeta({
    name: "practice",
});

useHead({
    title: "Practice"
});
</script>
