<template>
    <div>
        <NuxtLayout name="app">
            <template #header>
                Personal dashboard
            </template>
            <section class="p-6">
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
                                    name="i-heroicons-folder"
                                    class="dark:bg-gray-300 bg-gray-500 text-2xl shrink-0"
                                />

                                <div class="flex-1 flex flex-col min-w-0 text-left">
                                    <span class="truncate dark:text-gray-300 text-gray-500">Total topics</span>
                                    <span
                                        class="text-xl dark:text-gray-300 text-gray-700 truncate"
                                    >
                                        {{ formatNumber(data.totalTopics) }}
                                    </span>
                                </div>
                            </div>
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

const provider = reactive({
    loading: true,
});

const data = reactive({
    totalTopics: 0
});

onMounted(async () =>
{
    await loadDashboard();
});

const loadDashboard = async () =>
{
    try
    {
        provider.loading = true;
        const topicData = await repository.topic.countTopics();
        data.totalTopics = topicData.data;
        provider.loading = false;
    }
    catch
    {
        useStandardToast("error");
    }
};
</script>
