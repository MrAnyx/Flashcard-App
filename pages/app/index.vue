<template>
    <div>
        <NuxtLayout name="app">
            <template #header>
                Personal dashboard
            </template>
            <section class="p-6 flex flex-col gap-y-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
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
                            :ui="{ body: { padding: 'p-3 sm:p-4', base: 'h-full flex flex-col justify-center' } }"
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
                            :ui="{ body: { padding: 'p-3 sm:p-4', base: 'h-full flex flex-col justify-center' } }"
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
                            :ui="{ body: { padding: 'p-3 sm:p-4', base: 'h-full flex flex-col justify-center' } }"
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
                            :ui="{ body: { padding: 'p-3 sm:p-4', base: 'h-full flex flex-col justify-center' } }"
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
                </div>
            </section>
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    name: "dashboard",
    middleware: ["initialize"]
});

useHead({
    title: "Dashboard"
});

const repository = useRepository();
const topicStore = useTopicStore();
const unitStore = useUnitStore();
const flashcardStore = useFlashcardStore();
const reviewStore = useReviewStore();

const provider = reactive({
    loading: true,
});

const tableColumns = [
    {
        key: "front",
        label: "Front",
        class: "w-full"
    },
    {
        key: "difficulty",
        label: "Difficulty",
        class: "w-0"
    }
];

const people = [{
    front: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed",
    difficulty: 9.65,
}, {
    front: "quia consequuntur magni dolores eos qui ratione voluptatem",
    difficulty: 9.23,
}, {
    front: "quaerat voluptatem. Ut enim ad minima veniam, quis nostrum",
    difficulty: 8.59,
}, {
    front: "vel illum qui dolorem eum fugiat quo voluptas nulla pariatur",
    difficulty: 6.12,
}, {
    front: "or avoids pleasure itself, because it is pleasure, but because those who do not know",
    difficulty: 2.61,
}];

onMounted(async () =>
{
    await loadDashboard();
});

const loadDashboard = async () =>
{
    try
    {
        provider.loading = true;

        // Additional queries

        provider.loading = false;
    }
    catch
    {
        useStandardToast("error");
    }
};
</script>
