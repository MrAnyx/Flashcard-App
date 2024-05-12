<template>
    <div>
        <RecentItems title="Recent topics" :items="recentItems" sub-type="unit" />
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
                    <UBadge color="primary" variant="subtle">
                        {{ topics.length }} topics
                    </UBadge>
                </div>
                <UButton label="Add a topic" variant="soft" color="primary" @click="isModalOpen = true">
                    <template #leading>
                        <UIcon name="i-heroicons-plus" class="w-5 h-5" />
                    </template>
                </UButton>
            </div>
            <UTable
                :rows="topics"
                :columns="columns"
                :ui="{ td: { base: 'max-w-[0] truncate' }}"
            >
                <template #favorite-data="{ row }">
                    <UIcon v-if="row.favorite" name="i-heroicons-star-solid" class="text-xl text-yellow-400" />
                    <UIcon v-else name="i-heroicons-star" class="text-xl" />
                </template>
                <template #actions-data="{ row }">
                    <UDropdown :items="rowOptions(row)">
                        <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal" />
                    </UDropdown>
                </template>
            </UTable>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { DropdownItem } from "#ui/types";
import type { RecentItem } from "~/types/RecentItem";

definePageMeta({
    name: "topics"
});

useHead({
    titleTemplate: () => "Topics"
});

onMounted(() => {
    loadTopics();
});

type Topic = {
    id: number;
    name: string;
    description: string;
    units: number;
    favorite: boolean;
}

const topics = ref<Topic[]>([
    {
        id: 1,
        name: "toto",
        description: "super description",
        units: 5,
        favorite: true
    }
]);

const loadTopics = () => {
};

const isModalOpen = ref(false);

const recentItems: RecentItem[] = [
    {
        id: 1,
        title: "Korean",
        subItemsCount: 16,
        url: "/app/collection/1"
    },
    {
        id: 2,
        title: "Sport",
        subItemsCount: 4,
        url: "/app/collection/2"
    },
    {
        id: 3,
        title: "Cooking",
        subItemsCount: 1,
        url: "/app/collection/3"
    },
    {
        id: 4,
        title: "Gaming",
        subItemsCount: 2,
        url: "/app/collection/4"
    }
];

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

const rowOptions = (row: any): DropdownItem[][] => [
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
