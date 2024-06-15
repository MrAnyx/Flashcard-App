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
                        Flashcard
                    </h4>
                    <UBadge
                        color="primary"
                        variant="subtle"
                    >
                        {{ flashcardStore.total }} flashcard{{ flashcardStore.total > 1 ? 's' : '' }}
                    </UBadge>
                </div>
                <UButton
                    label="Add a flashcard"
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
                :rows="flashcardStore.flashcards"
                :columns="columns"
                :loading="loading"
                sort-mode="manual"
                :ui="{ td: { base: 'max-w-[0] truncate' } }"
                @update:sort="loadFlashcards"
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
                    v-if="(flashcardStore.total / paginationStore.itemsPerPage) > 1"
                    v-model="page"
                    :page-count="paginationStore.itemsPerPage"
                    :total="flashcardStore.total"
                    @update:model-value="loadFlashcards"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { FlashcardForm } from "#components";
import type { BreadcrumbLink, DropdownItem } from "#ui/types";
import { usePaginationStore } from "~/stores/pagination.store";
import type { Flashcard } from "~/types/entity";

// Meta methods for page
definePageMeta({
    name: "flashcards"
});

useHead({
    title: "Flashcards"
});

// Stores and composables
const data = useData();
const flashcardStore = useFlashcardStore();
const paginationStore = usePaginationStore();
const modal = useModal();

// Lifecycle hooks
onMounted(async () =>
{
    await loadFlashcards();
});

const topicId = Number(useRoute().params["topicId"]);
const unitId = Number(useRoute().params["unitId"]);
const topic = await data.topic.getTopic(topicId);
const unit = await data.unit.getUnit(unitId);

const loading = ref(false);
const page = ref(1);
const sort = ref({
    column: "front",
    direction: "asc" as const
});

// Table data
const columns = [{
    key: "front",
    label: "Front",
    sortable: true
}, {
    key: "favorite",
    label: "Favorite",
    sortable: true,
}, {
    key: "actions",
    label: "Actions",
}];

const loadFlashcards = async () =>
{
    loading.value = true;

    try
    {
        const flashcards = await data.flashcard.getFlashcardsByUnit(unitId, {
            order: sort.value.direction,
            sort: sort.value.column,
            page: page.value
        });

        flashcardStore.total = flashcards!["@pagination"]!.total;
        flashcardStore.flashcards = flashcards!.data;
    }
    finally
    {
        loading.value = false;
    }
};

const toggleFavorite = async (flashcard: Flashcard) =>
{
    await data.flashcard.updatePartialFlashcard(flashcard.id, {
        favorite: !flashcard.favorite
    });
    flashcard.favorite = !flashcard.favorite;
};

const duplicateFlashcard = async (flashcard: Flashcard) =>
{
    const duplicatedFlashcard = await data.flashcard.createFlashcard(unitId, {
        front: flashcard.front,
        back: flashcard.back,
        details: flashcard.details,
        favorite: false
    });

    flashcardStore.addFlashcard(duplicatedFlashcard!.data);

    useStandardToast("success", {
        description: `The flashcard ${flashcard.front} has been duplicated`
    });
};

const deleteFlashcard = async (flashcard: Flashcard) =>
{
    await data.flashcard.deleteFlashcard(flashcard.id);

    flashcardStore.deleteFlashcard(flashcard);

    useStandardToast("success", {
        description: `The flashcard ${flashcard.front} has been deleted`
    });
};

const rowOptions = (flashcard: Flashcard): DropdownItem[][] => [
    [{
        label: "Edit",
        icon: "i-heroicons-pencil-square-20-solid",
        click: () => showUnitModal(flashcard)
    }, {
        label: "Duplicate",
        icon: "i-heroicons-document-duplicate-20-solid",
        click: () => duplicateFlashcard(flashcard)
    }], [{
        label: "Delete",
        class: "bg-red-500/15",
        labelClass: "text-red-500",
        iconClass: "bg-red-500",
        icon: "i-heroicons-trash-20-solid",
        click: () => deleteFlashcard(flashcard)
    }]
];

// Modal
const showUnitModal = (flashcard?: Flashcard) =>
{
    modal.open(FlashcardForm, {
        topic: topic!.data,
        unit: unit!.data,
        flashcard
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
        to: {
            name: "units",
            params: {
                topicId
            }
        }
    },
    {
        label: unit!.data.name,
    }
];
</script>
