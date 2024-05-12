<template>
    <div>
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
        <UNotifications />
    </div>
</template>

<script setup lang="ts">
useHead({
    titleTemplate: (titleChunk) => {
        return titleChunk ? `${titleChunk} - Flashcard` : "Flashcard";
    }
});
</script>

<style>
body {
    background-color: rgb(var(--color-gray-900));
}

::-webkit-scrollbar {
    background-color: transparent;
    height: .6em;
    width: .6em
}

::-webkit-scrollbar-track {
    --tw-bg-opacity: 1;
    background-color: rgb(var(--color-gray-800)/1);
    background-color: rgb(var(--color-gray-800)/var(--tw-bg-opacity));
}

::-webkit-scrollbar-thumb {
    border-radius: .6em;
    --tw-bg-opacity: 1;
    background-color: rgb(var(--color-gray-700)/1);
    background-color: rgb(var(--color-gray-700)/var(--tw-bg-opacity));
}

::-webkit-scrollbar-thumb:hover {
    --tw-bg-opacity: 1;
    background-color: rgb(var(--color-gray-600)/1);
    background-color: rgb(var(--color-gray-600)/var(--tw-bg-opacity));
}
</style>
