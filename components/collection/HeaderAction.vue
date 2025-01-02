<template>
    <header class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
            <h4 class="font-medium text-lg">
                {{ props.title }}
            </h4>
            <UBadge
                v-if="props.countItems"
                color="primary"
                variant="subtle"
            >
                {{ formatNumber(props.countItems) }} {{ pluralize(props.countItems, "item") }}
            </UBadge>
        </div>
        <UButton
            color="primary"
            variant="soft"
            size="sm"
            leading-icon="i-tabler-plus"
            @click="emit('actionClick')"
        >
            <span class="hidden sm:inline">
                {{ props.actionLabel }}
            </span>
        </UButton>
    </header>
</template>

<script lang="ts" setup>
const props = defineProps<{
    title: string;
    countItems?: number;
    actionLabel: string;
}>();

const emit = defineEmits(["actionClick"]);
</script>
