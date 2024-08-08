<template>
    <UModal>
        <UCard>
            <template #header>
                <div class="flex justify-between items-center">
                    <span class="font-medium">{{ props.title ?? "Confirm" }}</span>
                    <UButton
                        icon="i-tabler-x"
                        color="white"
                        variant="ghost"
                        @click="modal.close()"
                    />
                </div>
            </template>
            <div class="flex flex-col gap-y-4">
                <p>
                    {{ description ?? "Do you want to proceed ?" }}
                </p>
                <div class="flex gap-x-2 justify-end">
                    <UButton
                        :label="confirmLabel ?? 'Cancel'"
                        variant="ghost"
                        color="gray"
                        @click="modal.close()"
                    />
                    <UButton
                        :label="confirmLabel ?? 'Confirm'"
                        color="primary"
                        @click="confirm"
                    />
                </div>
            </div>
        </UCard>
    </UModal>
</template>

<script lang="ts" setup>
const modal = useModal();

const emit = defineEmits(["confirm"]);

const props = defineProps<{
    title?: string;
    description?: string;
    confirmLabel?: string;
    cancelLabel?: string;
}>();

const confirm = () =>
{
    emit("confirm");
    modal.close();
};
</script>
