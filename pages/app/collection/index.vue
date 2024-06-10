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
                    <h4 class="font-medium text-lg text-gray-200">
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
                    @click="showTopicModal()"
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
                @update:sort="loadTopics"
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
                    v-if="(topicStore.total / paginationStore.itemsPerPage) > 1"
                    v-model="page"
                    :page-count="paginationStore.itemsPerPage"
                    :total="topicStore.total"
                    @update:model-value="loadTopics"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { TopicForm } from "#components";
import type { DropdownItem } from "#ui/types";
import { usePaginationStore } from "~/stores/pagination.store";
import type { Topic } from "~/types/entity";

definePageMeta({
    name: "topics"
});

useHead({
    title: "Topics",
});

onMounted(() =>
{
    loadTopics();
});

const data = useData();
const topicStore = useTopicStore();
const paginationStore = usePaginationStore();

const loading = ref(false);
const page = ref(1);
const sort = ref({
    column: "name",
    direction: "asc" as const
});

const loadTopics = async () =>
{
    loading.value = true;

    try
    {
        const topics = await data.topic.getTopics({
            order: sort.value.direction,
            sort: sort.value.column,
            page: page.value
        });

        topicStore.total = topics!["@pagination"]!.total;
        topicStore.topics = topics!.data;
    }
    finally
    {
        loading.value = false;
    }
};

const toggleFavorite = async (topic: Topic) =>
{
    await data.topic.updatePartialTopic(topic.id, {
        favorite: !topic.favorite
    });
    topic.favorite = !topic.favorite;
};

const duplicateTopic = async (topic: Topic) =>
{
    const duplicatedTopic = await data.topic.createTopic({
        name: topic.name,
        description: topic.description,
        favorite: false
    });

    topicStore.addTopic(duplicatedTopic!.data);

    useStandardToast("success", {
        description: `The topic ${topic.name} has been duplicated`
    });
};

const deleteTopic = async (topic: Topic) =>
{
    await data.topic.deleteTopic(topic.id);

    topicStore.deleteTopic(topic);

    useStandardToast("success", {
        description: `The topic ${topic.name} has been deleted`
    });
};

const modal = useModal();

const showTopicModal = (topic?: Topic) =>
{
    modal.open(TopicForm, {
        topic
    });
};

const select = (row: Topic) =>
{
    return navigateTo({
        name: "units",
        params: {
            topicId: row.id
        }
    });
};

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

const rowOptions = (row: Topic): DropdownItem[][] => [
    [{
        label: "Edit",
        icon: "i-heroicons-pencil-square-20-solid",
        click: () => showTopicModal(row)
    }, {
        label: "Duplicate",
        icon: "i-heroicons-document-duplicate-20-solid",
        click: () => duplicateTopic(row)
    }], [{
        label: "Delete",
        class: "bg-red-500/15",
        labelClass: "text-red-500",
        iconClass: "bg-red-500",
        icon: "i-heroicons-trash-20-solid",
        click: () => deleteTopic(row)
    }]
];
</script>
