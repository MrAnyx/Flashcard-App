<template>
    <div>
        <RecentItems
            v-if="topicStore.recents.length >= 4"
            title="Recent topics"
            :items="topicStore.recents"
            route="units"
        />
        <UModal v-model="isModalOpen">
            <div class="p-4">
                New topic
            </div>
        </UModal>
        <div class="py-6 flex-1 overflow-y-auto">
            <div class="flex items-center mb-4 px-6 justify-between">
                <div class="flex items-center space-x-3">
                    <h4 class="font-medium text-lg text-gray-200">
                        Topics
                    </h4>
                    <UBadge
                        color="primary"
                        variant="subtle"
                    >
                        {{ topicStore.topics.length }} topics
                    </UBadge>
                </div>
                <UButton
                    label="Add a topic"
                    variant="soft"
                    color="primary"
                    @click="isModalOpen = true"
                >
                    <template #leading>
                        <UIcon
                            name="i-heroicons-plus"
                            class="w-5 h-5"
                        />
                    </template>
                </UButton>
            </div>
            <UTable
                :rows="topicStore.topics"
                :columns="columns"
                :ui="{ td: { base: 'max-w-[0] truncate' } }"
            >
                <template #favorite-data="{ row }">
                    <UIcon
                        v-if="row.favorite"
                        name="i-heroicons-star-solid"
                        class="text-xl text-yellow-400"
                    />
                    <UIcon
                        v-else
                        name="i-heroicons-star"
                        class="text-xl"
                    />
                </template>
                <template #actions-data="{ row }">
                    <UDropdown :items="rowOptions(row)">
                        <UButton
                            color="gray"
                            variant="ghost"
                            icon="i-heroicons-ellipsis-horizontal"
                        />
                    </UDropdown>
                </template>
            </UTable>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { DropdownItem } from "#ui/types";
import type { Topic } from "~/types/entity";
import type { RecentItem } from "~/types/recentItem";

definePageMeta({
    name: "topics"
});

useHead({
    title: "Topics",
});

const topicStore = useTopicStore();

onMounted(() => {
    if (topicStore.recents.length === 0) {
        loadRecentTopics();
    }
    loadTopics();
});

const loadRecentTopics = async () => {
    const { data, error } = await useApi<Topic[]>("/topics/recent", {
        method: "GET",
    });

    if (!error.value) {
        topicStore.recents = data.value!.data;
    }
    else if (error.value.statusCode === 401) {
        useStandardToast("unauthorized");
    }
    else {
        useStandardToast("error");
    }
};

const loadTopics = async () => {
    const { data, error } = await useApi<Topic[]>("/topics", {
        method: "GET",
    });

    if (!error.value) {
        topicStore.topics = data.value!.data;
    }
    else if (error.value.statusCode === 401) {
        useStandardToast("unauthorized");
    }
    else {
        useStandardToast("error");
    }
};

const isModalOpen = ref(false);

const columns = [{
    key: "name",
    label: "Name"
}, {
    key: "description",
    label: "Description"
}, {
    key: "units",
    label: "Units"
}, {
    key: "favorite",
    label: "Favorite"
}, {
    key: "actions"
}];

const rowOptions = (row: RecentItem): DropdownItem[][] => [
    [{
        label: "Edit",
        icon: "i-heroicons-pencil-square-20-solid",
        click: () => console.log("Edit", row.id)
    }, {
        label: "Duplicate",
        icon: "i-heroicons-document-duplicate-20-solid"
    }, {
        label: "Move",
        icon: "i-heroicons-arrow-top-right-on-square"
    }], [{
        label: "Delete",
        icon: "i-heroicons-trash-20-solid"
    }]
];
</script>
