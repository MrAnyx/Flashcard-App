<template>
    <section class="py-6 flex flex-col gap-y-6 ">
        <div class="flex justify-end px-6">
            <UButton
                label="Start a session"
                variant="soft"
                color="primary"
                class="justify-self-end"
                icon="i-tabler-device-gamepad-2"
                @click="excuteStartSession()"
            />
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 px-6">
            <BaseDataCard
                icon="i-tabler-versions"
                label="Total sessions"
                :value="sessionStore.total"
            />
            <BaseDataCard
                icon="i-tabler-clock-pin"
                label="Sessions today"
                :value="2"
            />
            <BaseDataCard
                icon="i-tabler-calendar"
                label="Total reviews"
                :value="reviewStore.total"
            />
            <BaseDataCard
                icon="i-tabler-clock-pin"
                label="Reviews today"
                :value="79"
            />
        </div>

        <div class="grid grid-cols-1 xl:grid-cols-2 gap-4 px-6">
            <UCard
                class="w-full"
            >
                <template #header>
                    Number of sessions
                </template>
                <GraphLine />
            </UCard><UCard
                class="w-full"
            >
                <template #header>
                    Number of reviews
                </template>
                <GraphLine />
            </UCard>
        </div>
        <UTable
            v-model:sort="sort"
            :rows="sessionStore.sessions"
            :columns="columns"
            :loading="loading"
            sort-mode="manual"
            @update:sort="loadTable"
            @select="select"
        >
            <template #startedAt-data="{ row }">
                <span>{{ row.startedAt ? formatDate(row.startedAt, DateTime.DATETIME_MED) : '-' }}</span>
            </template>

            <template #endedAt-data="{ row }">
                <span>{{ row.endedt ? formatDate(row.endedt, DateTime.DATETIME_MED) : '-' }}</span>
            </template>
        </UTable>

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
    </section>
</template>

<script lang="ts" setup>
import { DateTime } from "luxon";
import { ModalSessionIntroduction } from "#components";
import type { Session } from "~/types/entity";

definePageMeta({
    name: "practice",
    middleware: ["initialize", "auth"]
});

useHead({
    title: "Sessions"
});

// Stores and composables
const repository = useRepository();
const sessionStore = useSessionStore();
const reviewStore = useReviewStore();
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
    column: "startedAt",
    direction: "asc" as const
});
const total = ref<number>(0);
const itemsPerPage = authStore.getSetting<number>("items_per_page");

// Table data
const columns = [{
    key: "startedAt",
    label: "Started at",
    sortable: true,
}, {
    key: "endedAt",
    label: "Ended at",
    sortable: true,
}, {
    key: "totalReviews",
    label: "Total reviews",
}];

const loadTable = async () =>
{
    try
    {
        loading.value = true;

        const response = await repository.session.findAll({
            order: sort.value.direction,
            sort: sort.value.column,
            page: page.value,
            itemsPerPage
        });

        total.value = response["@pagination"]!.total;

        sessionStore.sessions = response.data;
    }
    finally
    {
        loading.value = false;
    }
};

const select = (row: Session) =>
{
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
