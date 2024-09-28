<template>
    <NuxtLayout name="app">
        <template #header>
            Overview
        </template>
        <section class="p-6 flex flex-col gap-y-4">
            <UCard>
                <div class="flex flex-col gap-y-3">
                    <h2 class="text-2xl text-gray-700 dark:text-gray-300">
                        Welcome back {{ authStore.user?.username ?? "" }}
                    </h2>
                    <p class="text-gray-500 dark:text-gray-400 text-sm capitalize">
                        {{ DateTime.now().toFormat('DDDD') }}
                    </p>
                    <p class="text-gray-500 dark:text-gray-400">
                        Boost your skills with your flashcards! Each practice session brings you one step closer to your goals. So, are you ready to take on the challenge?
                    </p>

                    <div class="flex gap-x-3">
                        <UButton
                            label="Start a session"
                            variant="soft"
                            icon="i-tabler-device-gamepad-2"
                            :loading="provider.loadingSession"
                            @click="openSessionModal"
                        />
                        <UButton
                            label="Manage collection"
                            variant="ghost"
                            color="gray"
                            :to="{ name: 'topics' }"
                        />
                    </div>
                </div>
            </UCard>
            <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                <template v-if="provider.loading">
                    <USkeleton v-for="i in 8" :key="i" class="h-[84px]" />
                </template>
                <template v-else>
                    <BaseDataCard
                        icon="i-tabler-folder"
                        label="Total topics"
                        :value="formatNumber(topicStore.total)"
                    />
                    <BaseDataCard
                        icon="i-tabler-color-swatch"
                        label="Total units"
                        :value="formatNumber(unitStore.total)"
                    />
                    <BaseDataCard
                        icon="i-tabler-cards"
                        label="Total flashcards"
                        :value="formatNumber(flashcardStore.total)"
                    />
                    <BaseDataCard
                        icon="i-tabler-calendar"
                        label="Total reviews"
                        :value="formatNumber(reviewStore.total)"
                    />
                    <BaseDataCard
                        icon="i-tabler-calendar-repeat"
                        label="Flashcards to review"
                        :value="formatNumber(flashcardStore.totalToReview)"
                    />
                    <BaseDataCard
                        icon="i-tabler-versions"
                        label="Total sessions"
                        :value="formatNumber(totalSessions)"
                    />
                    <BaseDataCard
                        icon="i-tabler-circle-check"
                        label="Correct flashcards"
                        :value="`${formatNumber(correctFlashcards / (flashcardStore.total > 0 ? flashcardStore.total : 1))}%`"
                    />
                    <BaseDataCard
                        icon="i-tabler-stars"
                        :value="averageGrade !== 0 ? formatNumber(normalizeValue(averageGrade, { min: 1, max: 4 }, { min: 0, max: 100 })) : 0"
                    >
                        <template #label>
                            <div class=" dark:text-gray-300 text-gray-500 inline-flex items-center gap-x-2">
                                <span class="truncate">Average answer</span>
                                <Tooltip
                                    help
                                    activation="click"
                                    text="The average grade is normalized between 0 and 100. 100 being better than 0."
                                >
                                    <UIcon
                                        name="i-tabler-info-circle"
                                        class="shrink-0"
                                    />
                                </Tooltip>
                            </div>
                        </template>
                    </BaseDataCard>
                </template>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <UCard
                    :ui="{ body: { padding: '!p-0' } }"
                >
                    <template #header>
                        Recent topics
                    </template>
                    <UTable
                        :loading="provider.loading"
                        :rows="recentTopics"
                        :columns="recentItemColumns"
                    />
                </UCard>
                <UCard
                    :ui="{ body: { padding: '!p-0' } }"
                >
                    <template #header>
                        Recent units
                    </template>
                    <UTable
                        :loading="provider.loading"
                        :rows="recentUnits"
                        :columns="recentItemColumns"
                    />
                </UCard>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <UCard
                    :ui="{ body: { padding: '!p-0' } }"
                >
                    <template #header>
                        Easiest flashcards
                    </template>
                    <UTable
                        :loading="provider.loading"
                        :rows="easiestFlashcards"
                        :columns="flashcardColumns"
                    />
                </UCard>
                <UCard
                    :ui="{ body: { padding: '!p-0' } }"
                >
                    <template #header>
                        Hardest flashcards
                    </template>
                    <UTable
                        :loading="provider.loading"
                        :rows="hardestFlashcards"
                        :columns="flashcardColumns"
                    />
                </UCard>
            </div>
        </section>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { DateTime } from "luxon";
import { formatNumber, normalizeValue } from "#imports";
import type { Flashcard, Topic, Unit } from "~/types/entity";
import { ModalSessionIntroduction } from "#components";

definePageMeta({
    name: "overview",
    middleware: ["auth", "initialize"]
});

useHead({
    title: "Overview"
});

const repository = useRepository();
const topicStore = useTopicStore();
const unitStore = useUnitStore();
const flashcardStore = useFlashcardStore();
const reviewStore = useReviewStore();
const authStore = useAuthStore();
const modal = useModal();

const provider = reactive({
    loading: true,
    loadingSession: false,
});

const recentTopics = ref<Topic[]>([]);
const recentUnits = ref<Unit[]>([]);
const correctFlashcards = ref<number>(0);
const averageGrade = ref<number>(0);
const totalSessions = ref<number>(0);
const easiestFlashcards = ref<Flashcard[]>([]);
const hardestFlashcards = ref<Flashcard[]>([]);

const recentItemColumns = [
    {
        key: "name",
        label: "Name",
        class: "w-[30%]"
    }, {
        key: "description",
        label: "Description",
        class: "w-full"
    }
];

const flashcardColumns = [
    {
        key: "front",
        label: "Front",
        class: "w-full"
    },
    {
        key: "difficulty",
        label: "Difficulty",
        class: "w-[0]"
    }
];

onMounted(async () =>
{
    await loadDashboard();
});

const loadDashboard = async () =>
{
    try
    {
        provider.loading = true;

        const [recentTopicsRes, recentUnitsRes, easyFlashcardsRes, hardestFlashcardsRes, totalCorrectFlashcardsRes, averageGradeRes, totalSessionsRes] = await Promise.all([
            repository.topic.findRecent(),
            repository.unit.recentUnits(),
            repository.flashcard.findAll({
                itemsPerPage: 5,
                order: "asc",
                page: 1,
                sort: "difficulty"
            }),
            repository.flashcard.findAll({
                itemsPerPage: 5,
                order: "desc",
                page: 1,
                sort: "difficulty"
            }),
            repository.flashcard.countCorrect(),
            repository.flashcard.averageGrade(),
            repository.session.count()
        ]);

        provider.loading = false;

        recentTopics.value = recentTopicsRes.data!;
        recentUnits.value = recentUnitsRes.data!;
        easiestFlashcards.value = easyFlashcardsRes.data!.filter(f => !!f.difficulty);
        hardestFlashcards.value = hardestFlashcardsRes.data!.filter(f => !!f.difficulty);
        correctFlashcards.value = totalCorrectFlashcardsRes.data!;
        averageGrade.value = averageGradeRes.data!;
        totalSessions.value = totalSessionsRes.data!;
    }
    catch
    {
        useStandardToast("error");
    }
};

const openSessionModal = async () =>
{
    if (authStore.getSetting("show_session_introduction"))
    {
        modal.open(ModalSessionIntroduction);
    }
    else
    {
        provider.loadingSession = true;
        await startSession();
        provider.loadingSession = false;
        await modal.close();
    }
};
</script>
