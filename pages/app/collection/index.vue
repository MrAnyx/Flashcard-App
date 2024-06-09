<template>
    <div>
        <!-- <RecentItems
            v-if="topicStore.recents.length >= 4"
            title="Recent topics"
            :items="topicStore.recents"
        /> -->
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
                :rows="state.topics"
                :columns="columns"
                :loading="state.loading"
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
        </div>
    </div>
</template>

<script setup lang="ts">
import { TopicForm } from "#components";
import type { DropdownItem } from "#ui/types";
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

const state = reactive({
    topics: [] as Topic[],
    total: 0,
    loading: false,
});

const page = ref(1);
const sort = ref({
    column: "name",
    direction: "asc" as const
});

const loadTopics = async () =>
{
    state.loading = true;

    try
    {
        const topics = await data.topic.getTopics({
            order: sort.value.direction,
            sort: sort.value.column,
            page: page.value
        });

        state.total = topics!["@pagination"]!.total;
        state.topics = topics!.data;
    }
    finally
    {
        state.loading = false;
    }
};

const toggleFavorite = async (topic: Topic) =>
{
    await data.topic.patchTopic(topic.id, {
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

    state.topics.push(duplicatedTopic!.data);

    useStandardToast("success", {
        description: `The topic ${topic.name} has been duplicated`
    });
};

const deleteTopic = async (topic: Topic) =>
{
    await data.topic.deleteTopic(topic.id);

    const topicToRemove = state.topics.findIndex(t => t.id === topic.id);
    state.topics.splice(topicToRemove, 1);

    useStandardToast("success", {
        description: `The topic ${topic.name} has been deleted`
    });
};

const modal = useModal();

const showTopicModal = () =>
{
    modal.open(TopicForm, {

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
    label: "Description"
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
        click: () => console.log("Edit", row.id)
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
