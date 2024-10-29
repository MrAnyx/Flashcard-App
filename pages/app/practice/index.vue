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
                label="Total sessions today"
                :value="cardsdata.sessionsOnPeriod"
            />
            <BaseDataCard
                icon="i-tabler-calendar"
                label="Total reviews"
                :value="reviewStore.total"
            />
            <BaseDataCard
                icon="i-tabler-clock-pin"
                label="Total reviews today"
                :value="cardsdata.reviewsOnPeriod"
            />
        </div>

        <div class="grid grid-cols-1 xl:grid-cols-2 gap-4 px-6">
            <UCard>
                <template #header>
                    Number of sessions over the last 30 days
                </template>
                <GraphLine :data="sessionGraph" :tooltip-template="template" :x-ticks="xTicks" />
            </UCard>
            <UCard>
                <template #header>
                    Number of reviews over the last 30 days
                </template>
                <GraphLine :data="reviewGraph" :tooltip-template="template" :x-ticks="xTicks" />
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
            v-if="(sessionStore.total / itemsPerPage) > 1"
            class="mt-4 flex justify-center"
        >
            <UPagination
                v-model="page"
                :page-count="itemsPerPage"
                :total="sessionStore.total"
                @update:model-value="loadTable"
            />
        </div>
    </section>
</template>

<script lang="ts" setup>
import { DateTime } from "luxon";
import { eachDayOfInterval, format, sub } from "date-fns";
import { ModalSessionIntroduction, ModalSessionReviewRecap } from "#components";
import type { Session } from "~/types/entity";
import type { DataRecord } from "~/types/graph";
import type { Period } from "~/types/period";

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
    await loadCards();
    await loadGraphs();
});

const loading = ref(false);
const page = ref(1);
const sort = ref({
    column: "startedAt",
    direction: "desc" as const
});
const itemsPerPage = authStore.getSetting<number>("items_per_page");

const cardsdata = reactive({
    sessionsOnPeriod: 0,
    reviewsOnPeriod: 0
});

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

const loadCards = async () =>
{
    loading.value = true;

    const sessionResponse = await repository.session.count("all", "today");
    cardsdata.sessionsOnPeriod = sessionResponse.data;

    const reviewResponse = await repository.review.count("all", "today");
    cardsdata.reviewsOnPeriod = reviewResponse.data;

    loading.value = false;
};

const xTicks = (i: number) =>
{
    if (i === 0 || i === sessionGraph.value.length - 1 || !sessionGraph.value[i])
    {
        return "";
    }
    return format(sessionGraph.value[i].x, "d MMM");
};

const template = (d: DataRecord) => `${format(d.x, "d MMM")}: ${d.y}`;

const sessionGraph = ref<DataRecord[]>([]);
const reviewGraph = ref<DataRecord[]>([]);

const loadGraphs = async () =>
{
    loading.value = true;

    const sessionGraphResponse = await repository.session.countGroupByDate();
    sessionGraph.value = eachDayOfInterval({ start: sub(new Date(), { days: 30 }), end: new Date() }).map(el => ({
        x: el,
        y: sessionGraphResponse.data.find(res => res.date === format(el, "yyyy-MM-dd"))?.total ?? 0
    }));

    const reviewGraphResponse = await repository.review.countGroupByDate();
    reviewGraph.value = eachDayOfInterval({ start: sub(new Date(), { days: 30 }), end: new Date() }).map(el => ({
        x: el,
        y: reviewGraphResponse.data.find(res => res.date === format(el, "yyyy-MM-dd"))?.total ?? 0
    }));

    loading.value = false;
};

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

        sessionStore.sessions = response.data;
    }
    finally
    {
        loading.value = false;
    }
};

const select = async (row: Session) =>
{
    modal.open(ModalSessionReviewRecap, {
        session: row
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
