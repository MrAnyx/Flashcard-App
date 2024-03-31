<template>
    <main class="fixed inset-0 flex overflow-hidden">
        <aside class="border-r border-gray-800 w-64 p-4 hidden lg:block">
            <Sidebar />
        </aside>
        <USlideover v-model="isSidebarOpen" class="lg:hidden" side="left" :ui="{ width: 'w-screen max-w-md' }">
            <aside class="p-4 h-full">
                <Sidebar @close="isSidebarOpen = !isSidebarOpen" />
            </aside>
        </USlideover>
        <section class="flex-1 flex flex-col w-full">
            <header class="h-16 shrink-0 flex items-center border-b border-gray-800 px-6">
                <UButton
                    color="gray"
                    variant="ghost"
                    square
                    icon="i-heroicons-bars-3"
                    size="sm"
                    class="mr-4 lg:hidden"
                    @click.prevent="isSidebarOpen = !isSidebarOpen"
                />
                <UBreadcrumb :links="links" />
            </header>
            <RecentItems title="Recent topics" :items="[]" />
            <UModal v-model="isModalOpen">
                <div class="p-4">
                    bonjour
                </div>
            </UModal>
            <div class="py-6 flex-1 overflow-y-auto">
                <div class="flex items-center mb-4 px-6 justify-between">
                    <div class="flex items-center space-x-3">
                        <h4 class="font-medium text-lg text-gray-200">
                            Topics
                        </h4>
                        <UBadge color="primary" variant="subtle">
                            6 topics
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
        </section>
    </main>
</template>

<script setup lang="ts">
import type { DropdownItem } from "#ui/types";
import Sidebar from "@/components/Sidebar.vue";
import RecentItems from "@/components/RecentItems.vue";

useHead({
    titleTemplate: (titleChunk) => {
        return "Topics";
    }
});
const isSidebarOpen = ref(false);
const isModalOpen = ref(false);

const links = [{
    label: "Topic",
    icon: "i-heroicons-folder",
    to: "/"
}, {
    label: "Korean",
    to: "/"
}, {
    label: "Unit",
    icon: "i-heroicons-swatch",
    to: "/"
}, {
    label: "Alphabet"
}];

const items: DropdownItem[][] = [[{
    label: "Edit",
    icon: "i-heroicons-pencil-square-20-solid",
    click: () => {
        console.log("Edit");
    }
}, {
    label: "Delete",
    icon: "i-heroicons-trash-20-solid",
    class: "hover:!bg-red-500/30"
}]];

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
