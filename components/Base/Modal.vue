<template>
    <UModal>
        <UCard>
            <template #header>
                <div class="flex justify-between items-center">
                    <div class="flex gap-x-2 items-center">
                        <slot name="header">
                            <UIcon
                                v-if="props.icon"
                                :class="`h-5 w-5`"
                                :name="props.icon"
                            />
                            <span
                                v-if="props.title"
                                class="font-medium"
                            >{{ props.title }}</span>
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
}>();

const modal = useModal();
</script>
