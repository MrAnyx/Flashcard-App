<template>
    <div class="relative flex items-center justify-center overflow-hidden">
        <!-- Grid background -->
        <div class="absolute inset-0 landing-grid [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]" />

        <!-- Hero content -->
        <div class="relative flex flex-col items-center justify-center gap-y-8 px-6">
            <ULink
                to="https://github.com/meeio-app/frontend/releases"
                target="_blank"
            >
                <UBadge
                    variant="subtle"
                    color="sky"
                    size="lg"
                    icon="i-tabler-sparkles"
                >
                    Release {{ version }}
                </UBadge>
            </ULink>
            <div class="flex flex-col items-center gap-y-4 text-center">
                <h1 class="text-4xl lg:text-6xl font-bold c-text-primary">
                    Master your knowledge
                </h1>
                <p class="text-base lg:text-lg c-text-secondary">
                    Unlock your potential with a beautiful designed yet powerful flashcard application. And it's Open Source!
                </p>
            </div>
            <div class="flex gap-4">
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
                    to="https://github.com/meeio-app/meeio"
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
