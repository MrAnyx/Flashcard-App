<template>
    <div class="h-full">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-800 overflow-auto">
            <UBreadcrumb
                :links="breadcrumbItems"
                class="min-w-fit"
            />
        </div>
        <div class="py-6">
            <div class="flex items-center mb-4 px-6 justify-between">
                <div class="flex items-center space-x-3">
                    <h4 class="font-medium text-lg">
                        Flashcard
                    </h4>
                    <UBadge
                        v-if="!loading"
                        color="primary"
                        variant="subtle"
                    >
                        {{ totalFlashcardByUnit }} flashcard{{ totalFlashcardByUnit > 1 ? 's' : '' }}
                    </UBadge>
                </div>
                <UButton
                    label="Add a flashcard"
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
                :rows="flashcardStore.flashcards"
                :columns="columns"
                :loading="loading"
                sort-mode="manual"
                :ui="{ td: { base: 'max-w-[0] truncate' } }"
                @update:sort="loadTable"
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
                    v-if="(totalFlashcardByUnit / itemsPerPage) > 1"
                    v-model="page"
                    :page-count="itemsPerPage"
                    :total="totalFlashcardByUnit"
                    @update:model-value="loadTable"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ModalConfirm, ModalFlashcardForm } from "#components";
import type { BreadcrumbLink, DropdownItem } from "#ui/types";
import type { Flashcard } from "~/types/entity";

// Meta methods for page
definePageMeta({
    name: "flashcards"
});

useHead({
    title: "Flashcards"
});

// Stores and composables
const repository = useRepository();
const topicStore = useTopicStore();
const unitStore = useUnitStore();
const flashcardStore = useFlashcardStore();
const authStore = useAuthStore();
const modal = useModal();

// Lifecycle hooks
onMounted(async () =>
{
    await loadTable();
});

const topic = topicStore.selectedTopic!;
const unit = unitStore.selectedUnit!;

const loading = ref(false);
const page = ref(1);
const sort = ref({
    column: "front",
    direction: "asc" as const
});
const itemsPerPage = authStore.getSetting<number>("items_per_page");
const totalFlashcardByUnit = ref(0);

// Table data
const columns = [{
    key: "front",
    label: "Front",
    sortable: true,
    class: "w-full"
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
    loading.value = true;

    try
    {
        const response = await repository.flashcard.findByUnit(unit.id, {
            order: sort.value.direction,
            sort: sort.value.column,
            page: page.value,
            itemsPerPage
        });

        flashcardStore.flashcards = response.data;
        totalFlashcardByUnit.value = response["@pagination"]!.total;
    }
    finally
    {
        loading.value = false;
    }
};

const toggleFavorite = async (row: Flashcard) =>
{
    await repository.flashcard.partialUpdate(row.id, {
        favorite: !row.favorite
    });
    row.favorite = !row.favorite;
};

const duplicateRow = async (row: Flashcard) =>
{
    const response = await repository.flashcard.create(unit.id, {
        front: row.front,
        back: row.back,
        details: row.details,
        favorite: false
    });

    flashcardStore.prepend(response.data);

    useStandardToast("success", {
        description: `The flashcard ${row.front} has been duplicated`
    });
};

const deleteRow = async (row: Flashcard) =>
{
    modal.open(ModalConfirm, {
        title: "Delete",
        description: `You are about to delete the flashcard ${row.front}. This action can not be undone`,
        icon: "i-tabler-trash",
        confirmLabel: "Delete",
        color: "red",
        async onConfirm()
        {
            await repository.flashcard.delete(row.id);

            flashcardStore.delete(row);

            useStandardToast("success", {
                description: `The flashcard ${row.front} has been deleted`
            });
        }
    });
};

const resetRow = async (row: Flashcard) =>
{
    modal.open(ModalConfirm, {
        title: "Reset",
        description: `You are about to reset the flashcard ${row.front}. This action can not be undone`,
        icon: "i-tabler-sparkles",
        confirmLabel: "Reset",
        color: "red",
        async onConfirm()
        {
            await repository.flashcard.reset(row.id);

            useStandardToast("success", {
                description: `The flashcard ${row.front} has been reset`
            });
        }
    });
};

const rowOptions = (row: Flashcard): DropdownItem[][] => [
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
const showCreateUpdateModal = (row?: Flashcard) =>
{
    modal.open(ModalFlashcardForm, {
        topic: topic,
        unit: unit,
        flashcard: row
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
        to: {
            name: "units",
            params: {
                topicId: topic.id
            }
        }
    },
    {
        label: unit.name,
    }
];
</script>
