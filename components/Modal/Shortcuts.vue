<template>
    <UModal>
        <UCard :ui="{ body: { base: 'max-h-[600px]' } }">
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
            <div class="flex flex-col gap-y-10">
                <div
                    v-for="section in AppShortcutSections"
                    :key="section.section"
                >
                    <h4 class="text-lg font-bold mb-3">
                        {{ section.section }}
                    </h4>

                    <div class="flex flex-col gap-y-3">
                        <div
                            v-for="shortcut in section.shortcuts"
                            :key="shortcut.name"
                            class="flex justify-between"
                        >
                            <div>
                                <p class="text-md">
                                    {{ shortcut.name }}
                                </p>
                                <span class="text-sm text-gray-400">{{ shortcut.description }}</span>
                            </div>
                            <div class="shrink-0 flex gap-x-1">
                                <UKbd
                                    v-for="shortcutKey in shortcut.shortcut"
                                    :key="shortcutKey"
                                    size="md"
                                >
                                    {{ shortcutKey }}
                                </UKbd>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </UCard>
    </UModal>
</template>

<script setup lang="ts">
const modal = useModal();
</script>
