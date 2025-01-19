<template>
    <div class="grid grid-cols-1 gap-3 lg:grid-cols-2">
        <div class="flex flex-col gap-y-1">
            <span class="c-text-primary font-medium">{{ props.label }}</span>
            <span class="c-text-secondary text-sm">{{ props.caption }}</span>
        </div>
        <slot />
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
    label: string;
    caption: string;
}>();
</script>
