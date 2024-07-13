<template>
    <div>
        <NuxtLoadingIndicator />
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
        <UNotifications />
        <UModals />
    </div>
</template>

<script setup lang="ts">
useHead({
    titleTemplate: (titleChunk) =>
    {
        return titleChunk ? `${titleChunk} - Flashcard` : "Flashcard";
    }
});
</script>

<style lang="scss">
::-webkit-scrollbar {
    background-color: transparent;
    height: .6em;
    width: .6em
}

html.dark {
    body {
        background-color: rgb(var(--color-gray-900));
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
}

html.light {
    body {
        background-color: rgb(var(--color-white));
    }

    ::-webkit-scrollbar-track {
        --tw-bg-opacity: 1;
        background-color: rgb(var(--color-gray-300)/var(--tw-bg-opacity));
    }

    ::-webkit-scrollbar-thumb {
        border-radius: .6em;
        --tw-bg-opacity: 1;
        background-color: rgb(var(--color-gray-400)/var(--tw-bg-opacity));
    }

    ::-webkit-scrollbar-thumb:hover {
        --tw-bg-opacity: 1;
        background-color: rgb(var(--color-gray-500)/var(--tw-bg-opacity));
    }
}
</style>
