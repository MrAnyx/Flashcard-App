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
                {{ props.countItems }} {{ pluralize(props.countItems, "item") }}
            </UBadge>
        </div>
        <UButton
            :label="props.actionLabel"
            variant="soft"
            color="primary"
            @click="emit('actionClick')"
        >
            <template #leading>
                <UIcon
                    name="i-tabler-plus"
                    class="w-5 h-5"
                />
            </template>
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
