<template>
    <div>
        <NuxtLayout name="app">
            <template #header>
                Overview
            </template>
            <section class="p-6 flex flex-col gap-y-4">
                <UCard>
                    <div class="flex flex-col gap-y-3">
                        <h2 class="text-2xl text-gray-700 dark:text-gray-300">
                            Welcome back MrAnyx
                        </h2>
                        <p class="text-gray-500 dark:text-gray-400 text-sm capitalize">
                            {{ DateTime.now().setLocale('fr').toFormat('DDDD') }}
                        </p>
                        <p class="text-gray-500 dark:text-gray-400">
                            Boost your skills with your flashcards! Each practice session brings you one step closer to your goals. So, are you ready to take on the challenge?
                        </p>

                        <div class="flex gap-x-3">
                            <UButton
                                label="Start a session"
                                variant="soft"
                            />
                            <UButton
                                label="Manage collection"
                                variant="ghost"
                                color="gray"
                                :to="{ name: 'topics' }"
                            />
                        </div>
                    </div>
                </UCard>
                <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
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
                                <span class="truncate dark:text-gray-300 text-gray-500">Total reviews</span>
                                <span
                                    class="text-xl dark:text-gray-300 text-gray-700 truncate"
                                >
                                    {{ formatNumber(reviewStore.total) }}
                                </span>
                            </div>
                        </div>
                    </UCard>
                </div>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <UCard
                        :ui="{ body: { padding: '!p-0' } }"
                    >
                        <template #header>
                            Recent topics
                        </template>
                        <UTable
                            :loading="provider.loading"
                            :rows="recentTopics"
                            :columns="recentItemColumns"
                        />
                    </UCard>
                    <UCard
                        :ui="{ body: { padding: '!p-0' } }"
                    >
                        <template #header>
                            Recent units
                        </template>
                        <UTable
                            :loading="provider.loading"
                            :rows="recentUnits"
                            :columns="recentItemColumns"
                        />
                    </UCard>
                </div>
            </section>
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
import { DateTime } from "luxon";
import type { Topic, Unit } from "~/types/entity";

definePageMeta({
    name: "overview",
    middleware: ["auth", "initialize"]
});

useHead({
    title: "Overview"
});

const repository = useRepository();
const topicStore = useTopicStore();
const unitStore = useUnitStore();
const flashcardStore = useFlashcardStore();
const reviewStore = useReviewStore();

const provider = reactive({
    loading: true,
});

const recentTopics = ref<Topic[]>([]);
const recentUnits = ref<Unit[]>([]);

const recentItemColumns = [
    {
        key: "name",
        label: "Name",
        class: "w-[30%]"
    }, {
        key: "description",
        label: "Description",
        class: "w-full"
    }
];

onMounted(async () =>
{
    await loadDashboard();
});

const loadDashboard = async () =>
{
    try
    {
        provider.loading = true;

        const recentTopicsRes = await repository.topic.recentTopics();
        recentTopics.value = recentTopicsRes.data!;

        const recentUnitsRes = await repository.unit.recentUnits();
        recentUnits.value = recentUnitsRes.data!;

        // Additional queries

        provider.loading = false;
    }
    catch
    {
        useStandardToast("error");
    }
};
</script>
