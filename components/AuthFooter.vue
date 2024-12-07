<template>
    <p class="text-sm text-gray-400">
        <slot>
            {{ props.content }}
        </slot>
    </p>
</template>

<script lang="ts" setup>
const props = defineProps<{
    content?: string;
}>();
</script>
