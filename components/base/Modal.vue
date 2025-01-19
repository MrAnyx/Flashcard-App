<template>
    <UModal
        :fullscreen="props.fullscreen ?? false"
        :ui="modalUi"
    >
        <UCard :ui="cardUi">
            <template
                v-if="!props.hideHeader"
                #header
            >
                <div class="flex justify-between items-center">
                    <div class="flex gap-x-2 items-center">
                        <slot name="header">
                            <UIcon
                                v-if="props.icon"
                                :class="`h-5 w-5`"
                                class="c-text-primary"
                                :name="props.icon"
                            />
                            <span
                                v-if="props.title"
                                class="font-medium c-text-primary"
                            >
                                {{ props.title }}
                            </span>
                        </slot>
                    </div>
                    <UButton
                        icon="i-tabler-x"
                        color="gray"
                        variant="ghost"
                        @click="modal.close()"
                    />
                </div>
            </template>
            <slot />
        </UCard>
    </UModal>
</template>

<script lang="ts" setup>
const props = defineProps<{
    title?: string;
    icon?: string;
    borderless?: boolean;
    fullscreen?: boolean;
    hideHeader?: boolean;
}>();

const modal = useModal();

const cardUi = {
    ...(props.borderless ? { body: { padding: "" } } : {})
};

const modalUi = {
    overlay: {
        base: "backdrop-blur-sm"
    }
};
</script>
