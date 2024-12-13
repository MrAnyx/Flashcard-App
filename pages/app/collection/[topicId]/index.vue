<template>
    <section class="flex flex-col gap-4">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-800 overflow-auto">
            <UBreadcrumb :links="breadcrumbItems" />
        </div>
        <CollectionHeaderAction
            title="Units"
            :count-items="unitStore.collectionTotal"
            action-label="Add a unit"
            class="px-6"
            @action-click="showCreateUpdateModal()"
        />
        <UTable
            v-model:sort="pagination.sort"
            :rows="unitStore.units"
            :columns="columns"
            :loading="pageProvider.loading"
            sort-mode="manual"
            @update:sort="loadTable"
            @select="selectRow"
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
            v-if="(unitStore.collectionTotal / itemsPerPage) > 1"
            class="flex justify-center"
        >
            <UPagination
                v-model="pagination.page"
                :page-count="itemsPerPage"
                :total="unitStore.collectionTotal"
                @update:model-value="loadTable"
            />
        </div>
    </section>
</template>

<script setup lang="ts">
import { ModalConfirm, ModalSessionIntroduction, ModalUnitForm } from "#components";
import type { BreadcrumbLink, DropdownItem } from "#ui/types";
import type { PaginationOrder } from "~/types/core";
import type { Unit } from "~/types/entity";
import type { Collection } from "~/types/session";

definePageMeta({
    name: "units"
});

useHead({
    title: "Units"
});

const route = useRoute();
const topicStore = useTopicStore();
const repository = useRepository();
const unitStore = useUnitStore();
const authStore = useAuthStore();
const modal = useModal();

const topicId = parseInt(route.params.topicId as string);

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
    unitStore.collectionSelectedUnit = undefined;
});

onMounted(async () =>
{
    unitStore.collectionSelectedUnit = undefined;
    await loadParentTopic();

    if (topicStore.collectionSelectedTopic)
    {
        await loadTable();
    }
});

const breadcrumbItems = computed<BreadcrumbLink[]>(() => [
    {
        label: "Collection",
        icon: "i-tabler-folder",
        to: {
            name: "topics",
        }
    },
    {
        label: topicStore.collectionSelectedTopic?.name ?? "",
    }
]);

const loadParentTopic = async () =>
{
    if (Number.isNaN(topicId))
    {
        useStandardToast("error", {
            description: "Unable to load the parent topic"
        });
        return;
    }

    topicStore.collectionSelectedTopic = topicStore.find(topicId) ?? await repository.topic.find(topicId);
};

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
    key: "actions",
    label: "Actions",
    class: "w-0"
}];

const loadTable = async () =>
{
    try
    {
        pageProvider.loading = true;

        const repsonse = await repository.unit.findByTopic(topicStore.collectionSelectedTopic!.id, {
            order: pagination.sort.direction,
            sort: pagination.sort.column,
            page: pagination.page,
            itemsPerPage
        });

        unitStore.units = repsonse.data;
        unitStore.collectionTotal = repsonse.pagination.total;
    }
    finally
    {
        pageProvider.loading = false;
    }
};

const toggleFavorite = async (row: Unit) =>
{
    await repository.unit.partialUpdate(row.id, {
        favorite: !row.favorite
    });
    row.favorite = !row.favorite;
};

const rowOptions = (row: Unit): DropdownItem[][] => [
    [
        {
            label: "Start a session",
            icon: "i-tabler-device-gamepad-2",
            class: "bg-primary-300/15 hover:!bg-gray-100 dark:hover:!bg-gray-900",
            labelClass: "text-primary-500",
            iconClass: "bg-primary-500",
            click: () => excuteStartSession(row)
        }
    ],
    [
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

const excuteStartSession = async (row: Unit) =>
{
    const collection: Collection = {
        id: row.id,
        type: "unit"
    };

    if (authStore.getSetting<boolean>("show_session_introduction"))
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

const showCreateUpdateModal = (row?: Unit) =>
{
    modal.open(ModalUnitForm, {
        topic: topicStore.collectionSelectedTopic!,
        unit: row
    });
};

const duplicateRow = async (row: Unit) =>
{
    const response = await repository.unit.create(topicStore.collectionSelectedTopic!.id, {
        name: row.name,
        description: row.description,
        favorite: false
    });

    unitStore.prepend(response);

    useStandardToast("success", {
        description: `The unit ${row.name} has been duplicated`
    });
};

const resetRow = async (row: Unit) =>
{
    modal.open(ModalConfirm, {
        title: "Reset",
        description: `You are about to reset the unit ${row.name}. This action can not be undone`,
        icon: "i-tabler-sparkles",
        confirmLabel: "Reset",
        color: "red",
        async onConfirm()
        {
            await repository.unit.reset(row.id);

            useStandardToast("success", {
                description: `The unit ${row.name} has been reset`
            });
        }
    });
};

const deleteRow = async (row: Unit) =>
{
    modal.open(ModalConfirm, {
        title: "Delete",
        description: `You are about to delete the unit ${row.name}. This action can not be undone`,
        icon: "i-tabler-trash",
        confirmLabel: "Delete",
        color: "red",
        async onConfirm()
        {
            await repository.unit.delete(row.id);

            unitStore.delete(row);

            useStandardToast("success", {
                description: `The unit ${row.name} has been deleted`
            });
        }
    });
};

const selectRow = (row: Unit) =>
{
    unitStore.collectionSelectedUnit = row;
    return navigateTo({
        name: "flashcards",
        params: {
            topicId: topicStore.collectionSelectedTopic!.id,
            unitId: row.id
        }
    });
};
</script>
