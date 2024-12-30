<template>
    <div class="relative flex items-center justify-center overflow-hidden">
        <!-- Grid background -->
        <div class="absolute inset-0 landing-grid [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]" />

        <!-- Hero content -->
        <div class="relative flex flex-col items-center justify-center gap-y-8 px-6">
            <UBadge
                variant="subtle"
                color="sky"
                size="lg"
                icon="i-tabler-sparkles"
            >
                Release v{{ version }}
            </UBadge>
            <div class="flex flex-col items-center gap-y-4 text-center">
                <h1 class="text-6xl font-bold text-gray-800 dark:text-gray-200">
                    Master your knowledge
                </h1>
                <p class="text-lg text-gray-600 dark:text-gray-400">
                    Unlock your potential with a beautiful designed yet powerful flashcard application. And it's Open Source!
                </p>
            </div>
            <div class="flex gap-x-4">
                <UButton
                    trailing-icon="i-tabler-arrow-right"
                    color="sky"
                    variant="soft"
                    :to="{ name: 'overview' }"
                >
                    Get started
                </UButton>
                <UButton
                    variant="ghost"
                    color="gray"
                    leading-icon="i-tabler-brand-github"
                    to="https://github.com/MrAnyx/Flashcard-App"
                    target="_blank"
                >
                    Github
                </UButton>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const version = useVersion();
</script>

<style>
.landing-grid {
    background-size: 100px 100px;
    background-image:
        linear-gradient(to right, rgb(var(--color-gray-200)) 1px, transparent 1px),
        linear-gradient(to bottom, rgb(var(--color-gray-200)) 1px, transparent 1px);
}
.dark {
  .landing-grid {
    background-image:
        linear-gradient(to right, rgb(var(--color-gray-800)) 1px, transparent 1px),
        linear-gradient(to bottom, rgb(var(--color-gray-800)) 1px, transparent 1px);
  }
}
</style>
