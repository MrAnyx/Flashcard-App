<template>
    <div class="bg-gray-800/20 border-b border-gray-800 p-6 ">
        <h4 class="font-medium text-lg text-gray-200 mb-6">
            {{ title }}
        </h4>

        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <UCard
                v-for="i in 4"
                :key="i"
                class="hover:!ring-primary/65 hover:ring-2 transition-all"

                :ui="{ body: { padding: 'p-3 sm:p-4' } }"
            >
                <div class="flex items-center space-x-4">
                    <UIcon name="i-heroicons-folder" class="bg-gray-300 text-2xl shrink-0" />

                    <div class="flex-1 text-gray-300 flex flex-col min-w-0">
                        <span class="truncate">Korean</span>

                        <span class="text-sm text-gray-500 truncate">4 units</span>
                    </div>
                </div>
            </UCard>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    title: string
    items: any[]
}>();
</script>
