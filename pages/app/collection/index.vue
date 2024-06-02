<template>
    <div>
        <!-- <RecentItems
            v-if="topicStore.recents.length >= 4"
            title="Recent topics"
            :items="topicStore.recents"
        /> -->
        <UModal v-model="isModalOpen">
            <div class="p-4">
                New topic
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
                        {{ state.total }} topics
                    </UBadge>
                </div>
                <UButton
                    label="Add a topic"
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
                :sort="pagination"
                :rows="state.topics"
                :columns="columns"
                :loading="state.loading"
                sort-mode="manual"
                :ui="{ td: { base: 'max-w-[0] truncate' } }"
                @update:sort="loadTopics"
            >
                <template #name-data="{ row }">
                    <ULink :to="{ name: 'units', params: { topicId: row.id } }">
                        {{ row.name }}
                    </ULink>
                </template>
                <template #favorite-data="{ row }">
                    <button @click="toggleFavorite(row)">
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
                    <UDropdown :items="rowOptions(row)">
                        <UButton
                            color="gray"
                            variant="ghost"
                            icon="i-heroicons-ellipsis-horizontal"
                        />
                    </UDropdown>
                </template>
            </UTable>
            <UPagination
                v-model="state.page"
                :page-count="state.total"
                :total="5"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { DropdownItem } from "#ui/types";
import type { Topic } from "~/types/entity";

definePageMeta({
    name: "topics"
});

useHead({
    title: "Topics",
});

onMounted(() => {
    loadTopics();
});

const state = reactive({
    topics: [] as Topic[],
    total: 0,
    loading: false,
    page: 1,
});

const pagination = ref({
    column: "name",
    direction: "desc" as const
});

const loadTopics = async () => {
    state.loading = true;
    const { data, error } = await useApi<Topic[]>("/topics", {
        method: "GET",
        query: {
            sort: pagination.value.column,
            order: pagination.value.direction,
            page: state.page
        },
    });

    if (!error.value) {
        state.topics = data.value!.data;
        state.total = data.value!["@pagination"]!.total;
    } else if (error.value.statusCode === 401) {
        useStandardToast("unauthorized");
    } else {
        useStandardToast("error");
    }
    state.loading = false;
};

const toggleFavorite = async (topic: Topic) => {
    const { error } = await useApi<Topic>(`/topics/${topic.id}`, {
        method: "PATCH",
        body: {
            favorite: !topic.favorite
        }
    });

    if (!error.value) {
        topic.favorite = !topic.favorite;
    } else if (error.value.statusCode === 401) {
        useStandardToast("unauthorized");
    } else {
        useStandardToast("error");
    }
};

const isModalOpen = ref(false);

const columns = [{
    key: "name",
    label: "Name",
    sortable: true,
}, {
    key: "description",
    label: "Description"
}, {
    key: "favorite",
    label: "Favorite",
    sortable: true,
}, {
    key: "actions"
}];

const rowOptions = (row: Topic): DropdownItem[][] => [
    [{
        label: "Edit",
        icon: "i-heroicons-pencil-square-20-solid",
        click: () => console.log("Edit", row.id)
    }, {
        label: "Duplicate",
        icon: "i-heroicons-document-duplicate-20-solid"
    }], [{
        label: "Delete",
        icon: "i-heroicons-trash-20-solid"
    }]
];
</script>
