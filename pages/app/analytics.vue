<template>
    <div>
        <NuxtLayout name="app">
            <template #header>
                Analytics
            </template>

            <section class="p-6 flex flex-col gap-y-4">
                <USelectMenu
                    v-model="selectedPeriod"
                    :options="periods"
                    class="w-32"
                />
                <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                    <UCard
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
                                <span class="text-xl dark:text-gray-300 text-gray-700 truncate inline-flex items-center gap-x-2">
                                    {{ formatNumber(23) }}
                                    <UTooltip
                                        :text="`+${formatNumber(23)}% from last period`"
                                    >
                                        <UIcon
                                            name="i-tabler-trending-up"
                                            class="text-green-500"
                                        />
                                    </UTooltip>
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
                                name="i-tabler-calendar"
                                class="dark:bg-gray-300 bg-gray-500 text-2xl shrink-0"
                            />

                            <div class="flex-1 flex flex-col min-w-0 text-left">
                                <span class="truncate dark:text-gray-300 text-gray-500">Correct answers</span>
                                <span class="text-xl dark:text-gray-300 text-gray-700 truncate inline-flex items-center gap-x-2">
                                    {{ formatNumber(16) }}
                                    <UTooltip
                                        :text="`+${formatNumber(23)}% from last period`"
                                    >
                                        <UIcon
                                            name="i-tabler-trending-up"
                                            class="text-green-500"
                                        />
                                    </UTooltip>
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
                                name="i-tabler-calendar"
                                class="dark:bg-gray-300 bg-gray-500 text-2xl shrink-0"
                            />

                            <div class="flex-1 flex flex-col min-w-0 text-left">
                                <span class="truncate dark:text-gray-300 text-gray-500">Average answer</span>
                                <span class="text-xl dark:text-gray-300 text-gray-700 truncate inline-flex items-center gap-x-2">
                                    {{ formatNumber(3.5) }}
                                    <UTooltip
                                        :text="`-${formatNumber(23)}% from last period`"
                                    >
                                        <UIcon
                                            name="i-tabler-trending-down"
                                            class="text-red-500"
                                        />
                                    </UTooltip>
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
                                name="i-tabler-calendar"
                                class="dark:bg-gray-300 bg-gray-500 text-2xl shrink-0"
                            />

                            <div class="flex-1 flex flex-col min-w-0 text-left">
                                <span class="truncate dark:text-gray-300 text-gray-500">Correct flashcards</span>
                                <span class="text-xl dark:text-gray-300 text-gray-700 truncate inline-flex items-center gap-x-2">
                                    {{ formatNumber(98) }}
                                    <UTooltip
                                        :text="`+${formatNumber(23)}% from last period`"
                                    >
                                        <UIcon
                                            name="i-tabler-trending-up"
                                            class="text-green-500"
                                        />
                                    </UTooltip>
                                </span>
                            </div>
                        </div>
                    </UCard>
                </div>

                <div class="grid grid-cols-1 xl:grid-cols-2 gap-4">
                    <UCard
                        class="w-full"
                    >
                        <template #header>
                            Number of reviews
                        </template>
                        <GraphLine />
                    </UCard>
                    <UCard
                        class="w-full"
                    >
                        <template #header>
                            Last sessions
                        </template>
                    </UCard>
                </div>
            </section>
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
import { formatNumber } from "#imports";

definePageMeta({
    name: "analytics",
    middleware: ["initialize", "premium"]
});

useHead({
    title: "Analytics"
});

const periods = ["Today", "Last 7 days", "Last 30 days"];
const selectedPeriod = ref(periods[0]);
</script>
