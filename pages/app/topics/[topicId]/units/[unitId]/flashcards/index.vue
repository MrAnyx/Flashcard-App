<template>
    <div>
        <UBreadcrumb :links="links" class="px-6 py-4 border-b border-gray-800" />

        <RecentItems title="Recent units" :items="recentItems" sub-type="flashcard" />
        <UModal v-model="isModalOpen">
            <div class="p-4">
                New topic
            </div>
        </UModal>
        <div class="py-6 flex-1 overflow-y-auto">
            <div class="flex items-center mb-4 px-6 justify-between">
                <div class="flex items-center space-x-3">
                    <h4 class="font-medium text-lg text-gray-200">
                        Units
                    </h4>
                    <UBadge color="primary" variant="subtle">
                        {{ people.length }} units
                    </UBadge>
                </div>
                <UButton label="Add a unit" variant="soft" color="primary" @click="isModalOpen = true">
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
import type { BreadcrumbLink } from "#ui/types";
import type { RecentItem } from "~/types/RecentItem";

const links: BreadcrumbLink[] = [{
    label: "Topics",
    icon: "i-heroicons-folder",
    to: "/app/topics"
}, {
    label: "Korean"
}, {
    label: "Units",
    icon: "i-heroicons-swatch",
    to: "/app/topics/1/units"
}, {
    label: "Alphabet"
}];

definePageMeta({
    name: "units"
});

useHead({
    titleTemplate: () => "Topics"
});

const isModalOpen = ref(false);

const recentItems: RecentItem[] = [
    {
        id: 1,
        title: "Alphabet",
        subItemsCount: 16,
        url: "/app/topics/1/units/1/flashcards"
    },
    {
        id: 2,
        title: "Verbs",
        subItemsCount: 4,
        url: "/app/topics/1/units/2/flashcards"
    },
    {
        id: 3,
        title: "Names",
        subItemsCount: 7,
        url: "/app/topics/1/units/3/flashcards"
    },
    {
        id: 4,
        title: "Food",
        subItemsCount: 2,
        url: "/app/topics/1/units/4/flashcards"
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
