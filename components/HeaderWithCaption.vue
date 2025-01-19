<template>
    <div>
        <h2 class="font-bold text-xl c-text-primary">
            {{ props.title }}
        </h2>
        <span class="c-text-secondary text-sm">{{ props.caption }}</span>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
    title: string;
    caption: string;
}>();
</script>
