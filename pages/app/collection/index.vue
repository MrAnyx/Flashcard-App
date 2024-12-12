<template>
    <section class="py-6 flex flex-col gap-4">
        <header class="flex items-center px-6 justify-between">
            <div class="flex items-center space-x-3">
                <h4 class="font-medium text-lg">
                    Topics
                </h4>
                <UBadge
                    color="primary"
                    variant="subtle"
                >
                    {{ topicStore.total }} {{ pluralize(topicStore.total, "item") }}
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
                        name="i-tabler-plus"
                        class="w-5 h-5"
                    />
                </template>
            </UButton>
        </header>

        <div>
            <UTable
                v-model:sort="pagination.sort"
                :rows="topicStore.topics"
                :columns="columns"
                :loading="provider.loading"
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

const provider = reactive({
    loading: false
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
onMounted(async () =>
{
    topicStore.selectedTopic = undefined;
    await loadTable();
});

// Table data
const columns = [{
    key: "name",
    label: "Name",
    sortable: true,
    class: "w-[30%]"
}, {
    key: "description",
    label: "Description",
    sortable: true,
    class: "w-[100%]"
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
        provider.loading = true;

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
        provider.loading = false;
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
    topicStore.selectedTopic = row;
    return navigateTo({
        name: "units",
        params: {
            topicId: row.id
        }
    });
};
</script>
