<template>
    <p class="text-sm c-text-secondary">
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
