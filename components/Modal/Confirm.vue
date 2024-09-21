<template>
    <BaseModal
        :title="props.title ?? 'Confirm'"
        :icon="props.icon"
    >
        <div class="flex flex-col gap-y-4">
            <p>
                {{ description ?? "Do you want to proceed ?" }}
            </p>
            <div class="flex gap-x-2 justify-end">
                <UButton
                    :label="cancelLabel ?? 'Cancel'"
                    variant="ghost"
                    color="gray"
                    @click="modal.close()"
                />
                <UButton
                    :label="confirmLabel ?? 'Confirm'"
                    :color="color ?? 'primary'"
                    @click="confirm"
                />
            </div>
        </div>
    </BaseModal>
</template>

<script lang="ts" setup>
import type { ButtonColor } from "#ui/types";

const modal = useModal();

const emit = defineEmits(["confirm"]);

const props = defineProps<{
    title?: string;
    description?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    icon?: string;
    color?: ButtonColor;
}>();

const confirm = () =>
{
    emit("confirm");
    modal.close();
};
</script>
