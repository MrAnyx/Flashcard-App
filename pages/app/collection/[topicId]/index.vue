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
            :topic-id="1"
        /> -->
        <UModal v-model="isModalOpen">
            <div class="p-4">
                New unit
            </div>
        </UModal>
        <div class="py-6 flex-1 overflow-y-auto">
            <div class="flex items-center mb-4 px-6 justify-between">
                <div class="flex items-center space-x-3">
                    <h4 class="font-medium text-lg text-gray-200">
                        Topics
                    </h4>
                    <UBadge
                        color="primary"
                        variant="subtle"
                    >
                        {{ unitStore.units.length }} units
                    </UBadge>
                </div>
                <UButton
                    label="Add a unit"
                    variant="soft"
                    color="primary"
                    @click="isModalOpen = true"
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
                :rows="unitStore.units"
                :columns="columns"
                :ui="{ td: { base: 'max-w-[0] truncate' } }"
            >
                <template #favorite-data="{ row }">
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
                </template>
                <template #actions-data="{ row }">
                    <UDropdown :items="rowOptions(row)">
                        <UButton
                            color="gray"
                            variant="ghost"
                            icon="i-heroicons-ellipsis-horizontal"
                        />
                    </UDropdown>
                </template>
            </UTable>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { BreadcrumbLink, DropdownItem } from "#ui/types";
import type { Unit } from "~/types/entity";
import type { RecentItem } from "~/types/recentItem";

definePageMeta({
    name: "units"
});

const unitStore = useUnitStore();

onMounted(() => {
    // if (unitStore.recents.length === 0) {
    //     loadRecentUnits();
    // }
    loadUnits();
});

// const loadRecentUnits = async () => {
//     const { data, error } = await useApi<Unit[]>(`/topics/${route.params.topicId}/units/recent`, {
//         method: "GET",
//     });

//     if (!error.value) {
//         unitStore.recents = data.value!.data;
//     }
//     else if (error.value.statusCode === 401) {
//         useStandardToast("unauthorized");
//     }
//     else {
//         useStandardToast("error");
//     }
// };

const loadUnits = async () => {
    const { data, error } = await useApi<Unit[]>("/units", {
        method: "GET",
    });

    if (!error.value) {
        unitStore.units = data.value!.data;
    }
    else if (error.value.statusCode === 401) {
        useStandardToast("unauthorized");
    }
    else {
        useStandardToast("error");
    }
};

const isModalOpen = ref(false);

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

const rowOptions = (row: RecentItem): DropdownItem[][] => [
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

const breadcrumbItems: BreadcrumbLink[] = [
    {
        label: "Collection",
        icon: "i-heroicons-folder",
        to: "/app/collection"
    },
    {
        label: "Korean",
        to: "/app/collection/1"
    }
];
</script>
