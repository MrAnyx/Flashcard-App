<template>
    <UCard :ui="{ body: { padding: 'p-3 sm:p-4' } }">
        <div class="flex items-center space-x-4">
            <UIcon
                v-if="props.icon"
                :name="props.icon"
                class="dark:bg-gray-400 bg-gray-500 text-2xl shrink-0"
            />

            <div class="flex-1 flex flex-col min-w-0">
                <span class="dark:text-gray-300 text-gray-500 inline-flex items-center gap-x-2">
                    <slot name="label">
                        <span class="truncate">{{ props.label }}</span>
                    </slot>

                    <Tooltip
                        v-if="props.info"
                        help
                        activation="hover"
                        :text="props.info"
                    >
                        <UIcon
                            :name="props.infoIcon ?? 'i-tabler-info-circle'"
                            class="shrink-0"
                        />
                    </Tooltip>
                </span>
                <span class="text-xl dark:text-gray-300 text-gray-700 truncate">
                    <slot name="value">
                        {{ props.value }}
                    </slot>
                </span>
            </div>
        </div>
    </UCard>
</template>

<script lang="ts" setup>
const props = defineProps<{
    icon?: string;
    label: string;
    value: string | number | boolean;
    info?: string;
    infoIcon?: string;
}>();
</script>
