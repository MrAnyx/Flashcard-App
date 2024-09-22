<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <UPopover :mode="props.activation">
        <template #panel="{ close }">
            <slot name="content" :close="close">
                <div class="p-2 md:p-2 max-w-sm md:max-w-lg">
                    <p
                        class="text-sm text-gray-600 dark:text-gray-300"
                        :class="{ truncate: props.truncate }"
                    >
                        {{ props.text }}
                    </p>
                </div>
            </slot>
        </template>
        <div :class="{ '*:cursor-help': props.help }">
            <slot />
        </div>
    </UPopover>
</template>

<script lang="ts" setup>
const props = defineProps<{
    text?: string;
    activation: "hover" | "click";
    truncate?: boolean;
    help?: boolean;
}>();
</script>
