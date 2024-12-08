<template>
    <UCard :ui="{ body: { padding: 'p-3 sm:p-4' } }">
        <div class="flex items-center space-x-4">
            <UIcon
                v-if="props.icon"
                :name="props.icon"
                class="dark:bg-gray-300 bg-gray-500 text-2xl shrink-0"
            />

            <div class="flex-1 flex flex-col min-w-0 text-left">
                <slot name="label">
                    <span class="truncate dark:text-gray-300 text-gray-500">{{ props.label }}</span>
                </slot>
                <slot name="value">
                    <span class="text-xl dark:text-gray-300 text-gray-700 truncate">{{ props.value }}</span>
                </slot>
            </div>
        </div>
    </UCard>
</template>

<script lang="ts" setup>
const props = defineProps<{
    icon?: string;
    label?: string;
    value?: string | number | boolean;
}>();
</script>
