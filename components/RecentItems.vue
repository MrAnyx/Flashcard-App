<template>
    <div class="bg-gray-800/20 border-b border-gray-800 p-6 ">
        <h4 class="font-medium text-lg text-gray-200 mb-6">
            {{ title }}
        </h4>

        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <ULink v-for="item, id in items" :key="id" :to="`/app/topics/${item.id}/units`">
                <UCard
                    class="hover:!ring-primary/65 hover:ring-2 transition-all"
                    :ui="{ body: { padding: 'p-3 sm:p-4' } }"
                >
                    <div class="flex items-center space-x-4">
                        <UIcon name="i-heroicons-folder" class="bg-gray-300 text-2xl shrink-0" />

                        <div class="flex-1 text-gray-300 flex flex-col min-w-0 text-left">
                            <span class="truncate">{{ item.title }}</span>
                            <span class="text-sm text-gray-500 truncate">{{ item.subItemsCount }} {{ subType }}s</span>
                        </div>
                    </div>
                </UCard>
            </ULink>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { RecentItem } from "~/types/RecentItem";

defineProps<{
    title: string
    items: RecentItem[],
    subType: "unit" | "flashcard"
}>();
</script>
