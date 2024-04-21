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
                        {{ people.length }} topics
                    </UBadge>
                </div>
                <UButton label="Add a topic" variant="soft" color="primary" @click="isModalOpen = true">
                    <template #leading>
                        <UIcon name="i-heroicons-plus" class="w-5 h-5" />
                    </template>
                </UButton>
            </div>
            <UTable :rows="people" :columns="columns">
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
import type { RecentItem } from "~/types/RecentItem";

definePageMeta({
    name: "topics"
});

useHead({
    titleTemplate: () => "Topics"
});

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
    key: "title",
    label: "Title"
}, {
    key: "email",
    label: "Email"
}, {
    key: "role",
    label: "Role"
}, {
    key: "actions"
}];

const people = [{
    id: 1,
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member"
}, {
    id: 2,
    name: "Courtney Henry",
    title: "Designer",
    email: "courtney.henry@example.com",
    role: "Admin"
}, {
    id: 3,
    name: "Tom Cook",
    title: "Director of Product",
    email: "tom.cook@example.com",
    role: "Member"
}];

const rowOptions = (row: any) => [
    [{
        label: "Edit",
        icon: "i-heroicons-pencil-square-20-solid",
        click: () => console.log("Edit", row.id)
    }, {
        label: "Duplicate",
        icon: "i-heroicons-document-duplicate-20-solid"
    }], [{
        label: "Archive",
        icon: "i-heroicons-archive-box-20-solid"
    }, {
        label: "Move",
        icon: "i-heroicons-arrow-right-circle-20-solid"
    }], [{
        label: "Delete",
        icon: "i-heroicons-trash-20-solid"
    }]
];
</script>
