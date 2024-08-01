<template>
    <div>
        <UBreadcrumb
            :links="breadcrumbItems"
            class="px-6 py-4 border-b border-gray-800"
        />
        <!-- <RecentItems
            v-if="unitStore.recents.length >= 4"
            title="Recent units"
            :items="unitStore.recents"
        /> -->

        <div class="py-6 flex-1">
            <div class="flex items-center mb-4 px-6 justify-between">
                <div class="flex items-center space-x-3">
                    <h4 class="font-medium text-lg text-gray-200">
                        Units
                    </h4>
                    <UBadge
                        color="primary"
                        variant="subtle"
                    >
                        {{ unitStore.total }} unit{{ unitStore.total > 1 ? 's' : '' }}
                    </UBadge>
                </div>
                <UButton
                    label="Add a unit"
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
            </div>
            <UTable
                v-model:sort="sort"
                :rows="unitStore.units"
                :columns="columns"
                :loading="loading"
                sort-mode="manual"
                :ui="{ td: { base: 'max-w-[0] truncate' } }"
                @update:sort="loadTable"
                @select="selectRow"
            >
                <template #favorite-data="{ row }">
                    <button @click.stop="toggleFavorite(row)">
                        <UIcon
                            v-if="row.favorite"
                            name="i-tabler-star-filled"
                            class="text-xl text-yellow-400"
                        />
                        <UIcon
                            v-else
                            name="i-tabler-star"
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
                            icon="i-tabler-dots"
                        />
                    </UDropdown>
                </template>
            </UTable>
            <div class="mt-4 flex justify-center">
                <UPagination
                    v-if="(unitStore.total / paginationStore.itemsPerPage) > 1"
                    v-model="page"
                    :page-count="paginationStore.itemsPerPage"
                    :total="unitStore.total"
                    @update:model-value="loadTable"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ModalUnitForm } from "#components";
import type { BreadcrumbLink, DropdownItem } from "#ui/types";
import type { Unit } from "~/types/entity";

// Meta methods for page
definePageMeta({
    name: "units"
});

useHead({
    title: "Units"
});

// Stores and composables
const repository = useRepository();
const unitStore = useUnitStore();
const topicStore = useTopicStore();
const paginationStore = usePaginationStore();
const modal = useModal();

// Lifecycle hooks
onMounted(async () =>
{
    unitStore.selectedUnit = undefined;
    await loadTable();
});

const topic = topicStore.selectedTopic!;
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
    sortable: true
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
    try
    {
        loading.value = true;

        const repsonse = await repository.unit.getUnitsByTopic(topic.id, {
            order: sort.value.direction,
            sort: sort.value.column,
            page: page.value,
            itemsPerPage: paginationStore.itemsPerPage
        });

        unitStore.units = repsonse.data;
    }
    finally
    {
        loading.value = false;
    }
};

const toggleFavorite = async (row: Unit) =>
{
    await repository.unit.updatePartialUnit(row.id, {
        favorite: !row.favorite
    });
    row.favorite = !row.favorite;
};

const duplicateRow = async (row: Unit) =>
{
    const response = await repository.unit.createUnit(topic.id, {
        name: row.name,
        description: row.description,
        favorite: false
    });

    unitStore.prepend(response.data);

    useStandardToast("success", {
        description: `The unit ${row.name} has been duplicated`
    });
};

const deleteRow = async (row: Unit) =>
{
    await repository.unit.deleteUnit(row.id);

    unitStore.delete(row);

    useStandardToast("success", {
        description: `The unit ${row.name} has been deleted`
    });
};

const resetRow = async (row: Unit) =>
{
    await repository.unit.resetUnit(row.id);

    useStandardToast("success", {
        description: `The unit ${row.name} has been reset`
    });
};

const selectRow = (row: Unit) =>
{
    unitStore.selectedUnit = row;
    return navigateTo({
        name: "flashcards",
        params: {
            topicId: topic.id,
            unitId: row.id
        }
    });
};

const rowOptions = (row: Unit): DropdownItem[][] => [
    [{
        label: "Edit",
        icon: "i-tabler-edit",
        click: () => showCreateUpdateModal(row)
    }, {
        label: "Duplicate",
        icon: "i-tabler-copy",
        click: () => duplicateRow(row)
    }], [{
        label: "Reset",
        icon: "i-tabler-sparkles",
        click: () => resetRow(row)
    }, {
        label: "Delete",
        class: "bg-red-500/15",
        labelClass: "text-red-500",
        iconClass: "bg-red-500",
        icon: "i-tabler-trash",
        click: () => deleteRow(row)
    }]
];

// Modal
const showCreateUpdateModal = (row?: Unit) =>
{
    modal.open(ModalUnitForm, {
        topic: topic,
        unit: row
    });
};

// Breadcrumb
const breadcrumbItems: BreadcrumbLink[] = [
    {
        label: "Collection",
        icon: "i-tabler-folder",
        to: {
            name: "topics",
        }
    },
    {
        label: topic.name,
    }
];
</script>
