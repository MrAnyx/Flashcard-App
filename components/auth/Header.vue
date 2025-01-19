<template>
    <header class="flex flex-col gap-y-2 text-center">
        <h2 class="text-3xl font-medium3 c-text-primary">
            <slot name="title">
                {{ props.title }}
            </slot>
        </h2>
        <p class="c-text-secondary leading-loose">
            <slot name="subtitle">
                {{ props.subtitle }}
            </slot>
        </p>
    </header>
</template>

<script lang="ts" setup>
const props = defineProps<{
    title?: string;
    subtitle?: string;
}>();
</script>
