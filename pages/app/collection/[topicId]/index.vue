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
                    @click="showUnitModal()"
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
                :rows="unitStore.units"
                :columns="columns"
                :loading="loading"
                sort-mode="manual"
                :ui="{ td: { base: 'max-w-[0] truncate' } }"
                @update:sort="loadUnits"
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
            <div class="mt-4 flex justify-center">
                <UPagination
                    v-if="(unitStore.total / paginationStore.itemsPerPage) > 1"
                    v-model="page"
                    :page-count="paginationStore.itemsPerPage"
                    :total="unitStore.total"
                    @update:model-value="loadUnits"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { UnitForm } from "#components";
import type { BreadcrumbLink, DropdownItem } from "#ui/types";
import { usePaginationStore } from "~/stores/pagination.store";
import type { Unit } from "~/types/entity";

// Meta methods for page
definePageMeta({
    name: "units"
});

useHead({
    title: "Units"
});

// Stores and composables
const data = useData();
const unitStore = useUnitStore();
const paginationStore = usePaginationStore();
const modal = useModal();

// Lifecycle hooks
onMounted(async () =>
{
    await loadUnits();
});

const topicId = Number(useRoute().params["topicId"]);
const topic = await data.topic.getTopic(topicId);
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

const loadUnits = async () =>
{
    loading.value = true;

    try
    {
        const units = await data.unit.getUnitsByTopic(topicId, {
            order: sort.value.direction,
            sort: sort.value.column,
            page: page.value
        });

        unitStore.total = units!["@pagination"]!.total;
        unitStore.units = units!.data;
    }
    finally
    {
        loading.value = false;
    }
};

const toggleFavorite = async (unit: Unit) =>
{
    await data.unit.updatePartialUnit(unit.id, {
        favorite: !unit.favorite
    });
    unit.favorite = !unit.favorite;
};

const duplicateUnit = async (unit: Unit) =>
{
    const duplicatedUnit = await data.unit.createUnit(topicId, {
        name: unit.name,
        description: unit.description,
        favorite: false
    });

    unitStore.addUnit(duplicatedUnit!.data);

    useStandardToast("success", {
        description: `The unit ${unit.name} has been duplicated`
    });
};

const deleteTopic = async (unit: Unit) =>
{
    await data.unit.deleteUnit(unit.id);

    unitStore.deleteUnit(unit);

    useStandardToast("success", {
        description: `The unit ${unit.name} has been deleted`
    });
};

const select = (unit: Unit) =>
{
    return navigateTo({
        name: "flashcards",
        params: {
            topicId,
            unitId: unit.id
        }
    });
};

const rowOptions = (unit: Unit): DropdownItem[][] => [
    [{
        label: "Edit",
        icon: "i-heroicons-pencil-square-20-solid",
        click: () => showUnitModal(unit)
    }, {
        label: "Duplicate",
        icon: "i-heroicons-document-duplicate-20-solid",
        click: () => duplicateUnit(unit)
    }], [{
        label: "Delete",
        class: "bg-red-500/15",
        labelClass: "text-red-500",
        iconClass: "bg-red-500",
        icon: "i-heroicons-trash-20-solid",
        click: () => deleteTopic(unit)
    }]
];

// Modal
const showUnitModal = (unit?: Unit) =>
{
    modal.open(UnitForm, {
        topic: topic!.data,
        unit
    });
};

// Breadcrumb
const breadcrumbItems: BreadcrumbLink[] = [
    {
        label: "Collection",
        icon: "i-heroicons-folder",
        to: {
            name: "topics",
        }
    },
    {
        label: topic!.data.name,
    }
];
</script>
