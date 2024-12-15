<template>
    <div>
        <h2 class="font-medium text-xl">
            {{ props.title }}
        </h2>
        <span class="text-gray-400 text-sm">{{ props.caption }}</span>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
    title: string;
    caption: string;
}>();
</script>
