<template>
    <section class="py-4 lg:py-6 flex flex-col gap-y-6">
        <div class="px-4 lg:px-6 flex flex-col sm:flex-row justify-end gap-x-3 gap-y-2">
            <UButton
                :label="practiceStore.hasNextFlashcard && practiceStore.session ? 'Finish last session' : 'Previous session results'"
                variant="ghost"
                color="gray"
                :icon="practiceStore.hasNextFlashcard && practiceStore.session ? 'i-tabler-arrow-forward-up' : 'i-tabler-stars'"
                :to="{ name: 'practice' }"
            />
            <UButton
                label="Start a session"
                variant="soft"
                color="primary"
                icon="i-tabler-device-gamepad-2"
                :loading="provider.loadingSession"
                @click="executeStartSession()"
            />
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 px-4 lg:px-6">
            <template v-if="cardData.loading">
                <USkeleton
                    v-for="i in 4"
                    :key="i"
                    class="h-[84px]"
                />
            </template>
            <template v-else>
                <BaseDataCard
                    icon="i-tabler-versions"
                    label="Total sessions"
                    :value="sessionStore.total"
                />
                <BaseDataCard
                    icon="i-tabler-clock-pin"
                    label="Total sessions today"
                    :value="cardData.sessionsOnPeriod"
                />
                <BaseDataCard
                    icon="i-tabler-calendar"
                    label="Total reviews"
                    :value="reviewStore.total"
                />
                <BaseDataCard
                    icon="i-tabler-clock-pin"
                    label="Total reviews today"
                    :value="cardData.reviewsOnPeriod"
                />
            </template>
        </div>
        <UTable
            v-model:sort="pagination.sort"
            :rows="sessionStore.sessions"
            :columns="columns"
            :loading="provider.loadingTable"
            sort-mode="manual"
            @update:sort="loadTable"
            @select="select"
        >
            <template #startedAt-data="{ row }">
                <span>{{ row.startedAt ? formatDate(row.startedAt, DateTime.DATETIME_MED) : '-' }}</span>
            </template>

            <template #endedAt-data="{ row }">
                <span>{{ row.endedAt ? formatDate(row.endedAt, DateTime.DATETIME_MED) : '-' }}</span>
            </template>
        </UTable>

        <div
            v-if="(sessionStore.total / itemsPerPage) > 1"
            class="flex justify-center"
        >
            <UPagination
                v-model="pagination.page"
                :page-count="itemsPerPage"
                :total="sessionStore.total"
                @update:model-value="loadTable"
            />
        </div>
    </section>
</template>

<script lang="ts" setup>
import { DateTime } from "luxon";
import type { PaginationOrder } from "~/types/core";
import type { Session } from "~/types/entity";

definePageMeta({
    name: "sessions",
});

useHead({
    title: "Sessions"
});

// Stores and composables
const repository = useRepository();
const sessionStore = useSessionStore();
const reviewStore = useReviewStore();
const practiceStore = usePracticeStore();
const authStore = useAuthStore();

const provider = reactive({
    loadingSession: false,
    loadingTable: false,
});

const cardData = reactive({
    loading: true,
    sessionsOnPeriod: 0,
    reviewsOnPeriod: 0
});

const itemsPerPage = authStore.getSetting<number>("items_per_page");
const pagination = reactive({
    page: 1,
    sort: {
        column: "startedAt",
        direction: "desc" as PaginationOrder
    },
});

// Lifecycle hooks
onMounted(async () =>
{
    await Promise.all([
        loadCards(),
        loadTable()
    ]);
});

const executeStartSession = async () =>
{
    try
    {
        provider.loadingSession = true;
        await startSession();
    }
    finally
    {
        provider.loadingSession = false;
    }
};

const loadCards = async () =>
{
    try
    {
        cardData.loading = true;

        [cardData.sessionsOnPeriod, cardData.reviewsOnPeriod] = await Promise.all([
            repository.session.count("all", {
                from: DateTime.now().startOf("day").toISO(),
            }),
            repository.review.count("all", {
                from: DateTime.now().startOf("day").toISO(),
            })
        ]);
    }
    finally
    {
        cardData.loading = false;
    }
};

// Table data
const columns = [{
    key: "startedAt",
    label: "Started at",
    sortable: true,
    class: "min-w-[200px]"
}, {
    key: "endedAt",
    label: "Ended at",
    sortable: true,
    class: "min-w-[200px]"
}, {
    key: "totalReviews",
    label: "Total reviews",
    class: "min-w-[200px]"
}];

const loadTable = async () =>
{
    try
    {
        provider.loadingTable = true;

        const response = await repository.session.findAll({
            order: pagination.sort.direction,
            sort: pagination.sort.column,
            page: pagination.page,
            itemsPerPage
        });

        sessionStore.sessions = response.data;
    }
    finally
    {
        provider.loadingTable = false;
    }
};

const select = async (_row: Session) =>
{
    // modal.open(ModalSessionReviewRecap, {
    //     session: row
    // });
};
</script>
