<template>
    <div>
        <NuxtLayout name="app">
            <template #header>
                Practice
            </template>

            <section class="p-6 flex flex-col gap-y-4">
                <UCard>
                    <div class="flex flex-col gap-y-3">
                        <h2 class="text-2xl text-gray-700 dark:text-gray-300">
                            Welcome back MrAnyx
                        </h2>
                        <p class="text-gray-500 dark:text-gray-400">
                            {{ DateTime.now().setLocale('fr').toFormat(' DDDD') }}
                        </p>

                        <div class="flex gap-x-3">
                            <UButton
                                label="Start a session"
                                variant="soft"
                            />
                            <UButton
                                label="Manage settings"
                                variant="ghost"
                                color="gray"
                                :to="{ name: 'settings-general' }"
                            />
                        </div>
                    </div>
                </UCard>
                <!-- <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                    <template v-if="provider.loading">
                        <USkeleton
                            v-for="i in 4"
                            :key="i"
                            class="h-[84px]"
                        />
                    </template>
                    <template v-else>
                        <UCard
                            class="h-full"
                            :ui="{ body: { padding: 'p-3 sm:p-4' } }"
                        >
                            <div class="flex items-center space-x-4">
                                <UIcon
                                    name="i-tabler-folder"
                                    class="dark:bg-gray-300 bg-gray-500 text-2xl shrink-0"
                                />

                                <div class="flex-1 flex flex-col min-w-0 text-left">
                                    <span class="truncate dark:text-gray-300 text-gray-500">Total topics</span>
                                    <span
                                        class="text-xl dark:text-gray-300 text-gray-700 truncate"
                                    >
                                        {{ formatNumber(topicStore.total) }}
                                    </span>
                                </div>
                            </div>
                        </UCard>
                        <UCard
                            class="h-full"
                            :ui="{ body: { padding: 'p-3 sm:p-4' } }"
                        >
                            <div class="flex items-center space-x-4">
                                <UIcon
                                    name="i-tabler-color-swatch"
                                    class="dark:bg-gray-300 bg-gray-500 text-2xl shrink-0"
                                />

                                <div class="flex-1 flex flex-col min-w-0 text-left">
                                    <span class="truncate dark:text-gray-300 text-gray-500">Total units</span>
                                    <span
                                        class="text-xl dark:text-gray-300 text-gray-700 truncate"
                                    >
                                        {{ formatNumber(unitStore.total) }}
                                    </span>
                                </div>
                            </div>
                        </UCard>
                        <UCard
                            class="h-full"
                            :ui="{ body: { padding: 'p-3 sm:p-4' } }"
                        >
                            <div class="flex items-center space-x-4">
                                <UIcon
                                    name="i-tabler-cards"
                                    class="dark:bg-gray-300 bg-gray-500 text-2xl shrink-0"
                                />

                                <div class="flex-1 flex flex-col min-w-0 text-left">
                                    <span class="truncate dark:text-gray-300 text-gray-500">Total flashcards</span>
                                    <span
                                        class="text-xl dark:text-gray-300 text-gray-700 truncate"
                                    >
                                        {{ formatNumber(flashcardStore.total) }}
                                    </span>
                                </div>
                            </div>
                        </UCard><UCard
                            class="h-full"
                            :ui="{ body: { padding: 'p-3 sm:p-4' } }"
                        >
                            <div class="flex items-center space-x-4">
                                <UIcon
                                    name="i-tabler-calendar"
                                    class="dark:bg-gray-300 bg-gray-500 text-2xl shrink-0"
                                />

                                <div class="flex-1 flex flex-col min-w-0 text-left">
                                    <span class="truncate dark:text-gray-300 text-gray-500">Total reviews</span>
                                    <span
                                        class="text-xl dark:text-gray-300 text-gray-700 truncate"
                                    >
                                        {{ formatNumber(reviewStore.total) }}
                                    </span>
                                </div>
                            </div>
                        </UCard>
                    </template>
                </div>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <template v-if="provider.loading">
                        <USkeleton
                            v-for="i in 2"
                            :key="i"
                            class="h-[84px]"
                        />
                    </template>
                    <template v-else>
                        <UCard
                            :ui="{ body: { padding: '!p-0' } }"
                        >
                            <UTable
                                :rows="people"
                                :columns="tableColumns"
                            />
                        </UCard>
                        <UCard
                            :ui="{ body: { padding: '!p-0' } }"
                        >
                            <UTable
                                :rows="people"
                                :columns="tableColumns"
                            />
                        </UCard>
                    </template>
                </div> -->

                <UCard class="w-full">
                    <GraphLine />
                </UCard>
            </section>
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
import { DateTime } from "luxon";

definePageMeta({
    name: "practice",
    middleware: ["initialize"]
});

useHead({
    title: "Practice"
});
</script>
