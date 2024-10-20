<template>
    <div>
        <div class="py-6">
            <div class="flex items-center mb-4 px-6 justify-between">
                <div class="flex items-center space-x-3">
                    <h4 class="font-medium text-lg">
                        Sessions
                    </h4>
                    <UBadge
                        v-if="!loading"
                        color="primary"
                        variant="subtle"
                    >
                        {{ total }} topic{{ total > 1 ? 's' : '' }}
                    </UBadge>
                </div>
                <UButton
                    label="Start a session"
                    variant="soft"
                    color="primary"
                    icon="i-tabler-device-gamepad-2"
                    @click="excuteStartSession()"
                />
            </div>
            <UTable
                v-model:sort="sort"
                :rows="topicStore.topics"
                :columns="columns"
                :loading="loading"
                sort-mode="manual"
                @update:sort="loadTable"
                @select="select"
            />
            <div
                v-if="(total / itemsPerPage) > 1"
                class="mt-4 flex justify-center"
            >
                <UPagination
                    v-model="page"
                    :page-count="itemsPerPage"
                    :total="total"
                    @update:model-value="loadTable"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ModalSessionIntroduction } from "#components";
import type { Topic } from "~/types/entity";

definePageMeta({
    name: "practice",
    middleware: ["initialize", "auth"]
});

useHead({
    title: "Sessions"
});

// Stores and composables
const repository = useRepository();
const topicStore = useTopicStore();
const authStore = useAuthStore();
const modal = useModal();

// Lifecycle hooks
onMounted(async () =>
{
    await loadTable();
});

const loading = ref(false);
const page = ref(1);
const sort = ref({
    column: "name",
    direction: "asc" as const
});
const total = ref<number>(0);
const itemsPerPage = authStore.getSetting<number>("items_per_page");

// Table data
const columns = [{
    key: "name",
    label: "Name",
    sortable: true,
    class: "w-[20%]"
}, {
    key: "description",
    label: "Description",
    sortable: true,
    class: "w-full"
}];

const loadTable = async () =>
{
    try
    {
        loading.value = true;

        const response = await repository.topic.findAll({
            order: sort.value.direction,
            sort: sort.value.column,
            page: page.value,
            itemsPerPage
        });

        total.value = response["@pagination"]!.total;

        topicStore.topics = response.data;
    }
    finally
    {
        loading.value = false;
    }
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

const excuteStartSession = async () =>
{
    if (authStore.getSetting("show_session_introduction"))
    {
        modal.open(ModalSessionIntroduction);
    }
    else
    {
        await startSession();
        await modal.close();
    }
};
</script>
