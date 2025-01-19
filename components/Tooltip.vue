<template>
    <UPopover
        :mode="props.activation"
        :disabled="props.disabled"
        class="inline-flex"
    >
        <template #panel="{ close }">
            <slot
                name="content"
                :close="close"
            >
                <div class="p-2 md:p-2 max-w-sm md:max-w-lg">
                    <p
                        class="text-sm c-text-primary"
                        :class="{ truncate: props.truncate }"
                    >
                        {{ props.text }}
                    </p>
                </div>
            </slot>
        </template>
        <div
            :class="{ '*:cursor-help': props.help }"
            class="inline-flex"
        >
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
    disabled?: boolean;
}>();
</script>
