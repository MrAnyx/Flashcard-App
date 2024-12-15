<template>
    <div class="grid grid-cols-1 gap-3 lg:grid-cols-2">
        <div>
            <h4>{{ props.label }}</h4>
            <span class="text-gray-400 text-sm">{{ props.caption }}</span>
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
