<template>
    <UModal prevent-close>
        <UCard>
            <template #header>
                <div class="flex justify-between items-center">
                    <span class="font-medium">Keyboard shortcuts</span>
                    <UButton
                        icon="i-heroicons-x-mark"
                        color="white"
                        variant="ghost"
                        @click="modal.close()"
                    />
                </div>
            </template>
        </UCard>
    </UModal>
</template>

<script setup lang="ts">
const modal = useModal();

defineShortcuts({
    escape: {
        usingInput: true,
        handler: () => modal.close()
    }
});
</script>
