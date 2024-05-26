<template>
    <div class="bg-gray-800/20 border-b border-gray-800 p-6 ">
        <h4 class="font-medium text-lg text-gray-200 mb-6">
            {{ title }}
        </h4>

        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <ULink
                v-for="item, key in items"
                :key="key"
                :to="topicId !== undefined ? { name: 'flashcards', params: { topicId, unitId: item.id } } : { name: 'units', params: { topicId: item.id } }"
            >
                <UCard
                    class="hover:!ring-primary/65 hover:ring-2 transition-all h-full"
                    :ui="{ body: { padding: 'p-3 sm:p-4', base: 'h-full flex flex-col justify-center' } }"
                >
                    <div class="flex items-center space-x-4">
                        <UIcon
                            name="i-heroicons-folder"
                            class="bg-gray-300 text-2xl shrink-0"
                        />

                        <div class="flex-1 text-gray-300 flex flex-col min-w-0 text-left">
                            <span class="truncate">{{ item.name }}</span>
                            <span
                                v-if="item.description !== ''"
                                class="text-sm text-gray-500 truncate"
                            >
                                {{ item.description }}
                            </span>
                        </div>
                    </div>
                </UCard>
            </ULink>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { RecentItem } from "~/types/recentItem";

defineProps<{
    title: string;
    items: RecentItem[];
    topicId?: number;
}>();
</script>
