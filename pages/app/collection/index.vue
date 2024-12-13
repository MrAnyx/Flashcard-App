<template>
    <section class="py-6 flex flex-col gap-4">
        <CollectionHeaderAction
            title="Topics"
            :count-items="topicStore.total"
            action-label="Add a topic"
            class="px-6"
            @action-click="showCreateUpdateModal()"
        />
        <UTable
            v-model:sort="pagination.sort"
            :rows="topicStore.topics"
            :columns="columns"
            :loading="pageProvider.loading"
            sort-mode="manual"
            @update:sort="loadTable"
            @select="select"
        >
            <template #favorite-data="{ row }">
                <UButton
                    :padded="false"
                    :color="row.favorite ? 'yellow' : 'gray'"
                    variant="link"
                    :icon="row.favorite ? 'i-tabler-star-filled' : 'i-tabler-star'"
                    @click.stop="toggleFavorite(row)"
                />
            </template>
            <template #actions-data="{ row }">
                <UDropdown
                    :items="rowOptions(row)"
                    @click.stop
                >
                    <UButton
                        color="gray"
                        variant="ghost"
                        icon="i-tabler-dots"
                    />
                </UDropdown>
            </template>
        </UTable>

        <div
            v-if="(topicStore.total / itemsPerPage) > 1"
            class="flex justify-center"
        >
            <UPagination
                v-model="pagination.page"
                :page-count="itemsPerPage"
                :total="topicStore.total"
                @update:model-value="loadTable"
            />
        </div>
    </section>
</template>

<script lang="ts" setup>
import { ModalConfirm, ModalSessionIntroduction, ModalTopicForm } from "#components";
import type { DropdownItem } from "#ui/types";
import type { PaginationOrder } from "~/types/core";
import type { Topic } from "~/types/entity";
import type { Collection } from "~/types/session";

definePageMeta({
    name: "topics"
});

const topicStore = useTopicStore();
const authStore = useAuthStore();
const repository = useRepository();
const modal = useModal();

const pageProvider = reactive({
    loading: true
});

const itemsPerPage = authStore.getSetting<number>("items_per_page");
const pagination = reactive({
    page: 1,
    sort: {
        column: "name",
        direction: "asc" as PaginationOrder
    },
});

// Lifecycle hooks
onBeforeUnmount(() =>
{
    topicStore.collectionSelectedTopic = undefined;
});

onMounted(async () =>
{
    topicStore.collectionSelectedTopic = undefined;
    await loadTable();
});

// Table data
const columns = [{
    key: "name",
    label: "Name",
    sortable: true,
    class: "w-[30%] min-w-[200px]"
}, {
    key: "description",
    label: "Description",
    sortable: true,
    class: "w-[100%] min-w-[200px]"
}, {
    key: "favorite",
    label: "Favorite",
    sortable: true,
    class: "w-0"
}, {
    label: "Actions",
    key: "actions",
    class: "w-0"
}];

const loadTable = async () =>
{
    try
    {
        pageProvider.loading = true;

        const response = await repository.topic.findAll({
            order: pagination.sort.direction,
            sort: pagination.sort.column,
            page: pagination.page,
            itemsPerPage
        });

        topicStore.topics = response.data;
    }
    finally
    {
        pageProvider.loading = false;
    }
};

// Table actions
const toggleFavorite = async (row: Topic) =>
{
    await repository.topic.partialUpdate(row.id, {
        favorite: !row.favorite
    });
    row.favorite = !row.favorite;
};

const rowOptions = (row: Topic): DropdownItem[][] => [
    [
        {
            label: "Start a session",
            icon: "i-tabler-device-gamepad-2",
            class: "bg-primary-300/15 hover:!bg-gray-100 dark:hover:!bg-gray-900",
            labelClass: "text-primary-500",
            iconClass: "bg-primary-500",
            click: () => excuteStartSession(row)
        }
    ], [
        {
            label: "Edit",
            icon: "i-tabler-edit",
            click: () => showCreateUpdateModal(row)
        }, {
            label: "Duplicate",
            icon: "i-tabler-copy",
            click: () => duplicateRow(row)
        }
    ], [
        {
            label: "Reset",
            icon: "i-tabler-sparkles",
            click: () => resetRow(row)
        }, {
            label: "Delete",
            class: "bg-red-500/15 hover:!bg-gray-100 dark:hover:!bg-gray-900",
            labelClass: "text-red-500",
            iconClass: "bg-red-500",
            icon: "i-tabler-trash",
            click: () => deleteRow(row)
        }
    ]
];

const excuteStartSession = async (row: Topic) =>
{
    const collection: Collection = {
        id: row.id,
        type: "topic"
    };
    if (authStore.getSetting("show_session_introduction"))
    {
        modal.open(ModalSessionIntroduction, {
            collection
        });
    }
    else
    {
        await startSession(collection);
        await modal.close();
    }
};

const showCreateUpdateModal = (row?: Topic) =>
{
    modal.open(ModalTopicForm, {
        topic: row
    });
};

const duplicateRow = async (row: Topic) =>
{
    const response = await repository.topic.create({
        name: row.name,
        description: row.description,
        favorite: false
    });

    topicStore.prepend(response);

    useStandardToast("success", {
        description: `The topic ${row.name} has been duplicated`
    });
};

const resetRow = async (row: Topic) =>
{
    modal.open(ModalConfirm, {
        title: "Reset",
        description: `You are about to reset the topic ${row.name}. This action can not be undone`,
        icon: "i-tabler-sparkles",
        confirmLabel: "Reset",
        color: "red",
        async onConfirm()
        {
            await repository.topic.reset(row.id);

            useStandardToast("success", {
                description: `The topic ${row.name} has been reset`
            });
        }
    });
};

const deleteRow = async (row: Topic) =>
{
    modal.open(ModalConfirm, {
        title: "Delete",
        description: `You are about to delete the topic ${row.name}. This action can not be undone`,
        icon: "i-tabler-trash",
        confirmLabel: "Delete",
        color: "red",
        async onConfirm()
        {
            await repository.topic.delete(row.id);

            topicStore.delete(row);

            useStandardToast("success", {
                description: `The topic ${row.name} has been deleted`
            });
        }
    });
};

const select = (row: Topic) =>
{
    topicStore.collectionSelectedTopic = row;
    return navigateTo({
        name: "units",
        params: {
            topicId: row.id
        }
    });
};
</script>
