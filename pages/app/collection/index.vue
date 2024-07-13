<template>
    <div>
        <!-- <RecentItems
            v-if="topicStore.recents.length >= 4"
            title="Recent topics"
            :items="topicStore.recents"
        /> -->
        <div class="py-6 flex-1">
            <div class="flex items-center mb-4 px-6 justify-between">
                <div class="flex items-center space-x-3">
                    <h4 class="font-medium text-lg">
                        Topics
                    </h4>
                    <UBadge
                        color="primary"
                        variant="subtle"
                    >
                        {{ topicStore.total }} topic{{ topicStore.total > 1 ? 's' : '' }}
                    </UBadge>
                </div>
                <UButton
                    label="Add a topic"
                    variant="soft"
                    color="primary"
                    @click="showCreateUpdateModal()"
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
                v-model:sort="sort"
                :rows="topicStore.topics"
                :columns="columns"
                :loading="loading"
                sort-mode="manual"
                :ui="{ td: { base: 'max-w-[0] truncate' } }"
                @update:sort="loadTable"
                @select="select"
            >
                <template #favorite-data="{ row }">
                    <button @click.stop="toggleFavorite(row)">
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
                    </button>
                </template>
                <template #actions-data="{ row }">
                    <UDropdown
                        :items="rowOptions(row)"
                        @click.stop
                    >
                        <UButton
                            color="gray"
                            variant="ghost"
                            icon="i-heroicons-ellipsis-horizontal"
                        />
                    </UDropdown>
                </template>
            </UTable>
            <div
                v-if="(topicStore.total / paginationStore.itemsPerPage) > 1"
                class="mt-4 flex justify-center"
            >
                <UPagination
                    v-model="page"
                    :page-count="paginationStore.itemsPerPage"
                    :total="topicStore.total"
                    @update:model-value="loadTable"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ModalTopicForm } from "#components";
import type { DropdownItem } from "#ui/types";
import { usePaginationStore } from "~/stores/pagination.store";
import type { Topic } from "~/types/entity";

// Meta methods for page
definePageMeta({
    name: "topics",
});

useHead({
    title: "Topics"
});

// Stores and composables
const data = useData();
const topicStore = useTopicStore();
const paginationStore = usePaginationStore();
const modal = useModal();

// Lifecycle hooks
onMounted(async () =>
{
    topicStore.selectedTopic = undefined;
    await loadTable();
});

const loading = ref(false);
const page = ref(1);
const sort = ref({
    column: "name",
    direction: "asc" as const
});

// Table data
const columns = [{
    key: "name",
    label: "Name",
    sortable: true,
}, {
    key: "description",
    label: "Description",
    sortable: true,
}, {
    key: "favorite",
    label: "Favorite",
    sortable: true,
}, {
    key: "actions",
    label: "Actions",
}];

const loadTable = async () =>
{
    loading.value = true;

    try
    {
        const response = await data.topic.getTopics({
            order: sort.value.direction,
            sort: sort.value.column,
            page: page.value,
            itemsPerPage: paginationStore.itemsPerPage
        });

        topicStore.total = response!["@pagination"]!.total;
        topicStore.topics = response!.data;
    }
    finally
    {
        loading.value = false;
    }
};

const toggleFavorite = async (row: Topic) =>
{
    await data.topic.updatePartialTopic(row.id, {
        favorite: !row.favorite
    });
    row.favorite = !row.favorite;
};

const duplicateRow = async (row: Topic) =>
{
    const response = await data.topic.createTopic({
        name: row.name,
        description: row.description,
        favorite: false
    });

    topicStore.prepend(response!.data);

    useStandardToast("success", {
        description: `The topic ${row.name} has been duplicated`
    });
};

const deleteRow = async (row: Topic) =>
{
    await data.topic.deleteTopic(row.id);

    topicStore.delete(row);

    useStandardToast("success", {
        description: `The topic ${row.name} has been deleted`
    });
};

const resetRow = async (row: Topic) =>
{
    await data.topic.resetTopic(row.id);

    useStandardToast("success", {
        description: `The topic ${row.name} has been reset`
    });
};

const select = (row: Topic) =>
{
    topicStore.selectedTopic = row;
    return navigateTo({
        name: "units",
        params: {
            topicId: row.id
        }
    });
};

const rowOptions = (row: Topic): DropdownItem[][] => [
    [{
        label: "Edit",
        icon: "i-heroicons-pencil-square-20-solid",
        click: () => showCreateUpdateModal(row)
    }, {
        label: "Duplicate",
        icon: "i-heroicons-document-duplicate-20-solid",
        click: () => duplicateRow(row)
    }], [{
        label: "Reset",
        icon: "i-heroicons-sparkles",
        click: () => resetRow(row)
    }, {
        label: "Delete",
        class: "bg-red-500/15",
        labelClass: "text-red-500",
        iconClass: "bg-red-500",
        icon: "i-heroicons-trash-20-solid",
        click: () => deleteRow(row)
    }]
];

// Modal
const showCreateUpdateModal = (row?: Topic) =>
{
    modal.open(ModalTopicForm, {
        topic: row
    });
};
</script>
