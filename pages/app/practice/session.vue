<template>
    <div class="h-full flex flex-col">
        <UMeter
            :value="sessionStore.currentFlashcard"
            :max="sessionStore.currentSessionFlashcards.length"
            size="sm"
        />
        <template v-if="sessionStore.hasNextFlashcard">
            <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-800 overflow-auto shrink-0">
                <UBreadcrumb
                    :links="[
                        { label: 'Tech ', icon: 'i-tabler-folder', labelClass: 'text-gray-500 dark:text-gray-400', iconClass: 'text-gray-500 dark:text-gray-400' },
                        { label: 'Turing machine', icon: 'i-tabler-color-swatch', labelClass: 'text-gray-500 dark:text-gray-400', iconClass: 'text-gray-500 dark:text-gray-400' }
                    ]"
                    class="min-w-fit"
                />
            </div>
            <section class="p-6 grow flex flex-col items-center overflow-auto">
                <div class="grid grid-cols-2 items-center w-full gap-x-">
                    <UButton
                        size="sm"
                        icon="i-tabler-arrow-left"
                        class="justify-self-start"
                        variant="ghost"
                        square
                        :to="{ name: 'practice' }"
                        color="red"
                    >
                        <stan class="hidden md:inline">
                            Leave
                        </stan>
                    </UButton>

                    <div class="flex justify-end">
                        <UBadge
                            variant="subtle"
                        >
                            <UIcon name="i-tabler-flame" class="w-5 h-5 mr-1" />
                            5 in a row
                        </UBadge>
                    </div>
                </div>

                <UCard class="max-w-2xl mt-6 overflow-auto sm:mt-10 w-full min-h-[120px]" :ui="{ body: { padding: '' }, header: { padding: '' } }">
                    <template #header>
                        <div class="flex justify-between items-center gap-x-4 overflow-x-auto p-3">
                            <Tooltip
                                activation="click"
                                :disabled="currentQuestion?.difficulty === null"
                                :text="`Difficulty of ${formatNumber(currentQuestion?.difficulty ?? 0)}/10`"
                                :help="currentQuestion?.difficulty !== null"
                            >
                                <UBadge :color="difficulty.color" variant="subtle">
                                    {{ difficulty.label }}
                                </UBadge>
                            </Tooltip>
                            <Tooltip
                                v-if="currentQuestion?.help !== null"
                                activation="click"
                                help
                                :text="currentQuestion.help"
                            >
                                <UButton
                                    icon="i-tabler-mood-puzzled"
                                    size="xs"
                                    square
                                    variant="ghost"
                                    color="yellow"
                                >
                                    Hint
                                </UButton>
                            </Tooltip>
                        </div>
                    </template>

                    <p class="leading-8 sm:leading-10 md:leading-10 text-base sm:text-lg md:text-xl p-4 md:p-5">
                        {{ currentQuestion?.front }}
                    </p>
                </UCard>

                <div class="grow shrink" />

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full shrink-0 mt-6 sm:mt-10">
                    <UButton
                        class="flex justify-center h-9 sm:h-12"
                        icon="i-tabler-checks"
                        variant="outline"
                        color="green"
                        size="lg"
                        :loading="state.loading"
                        @click="answer(GradeType.easy)"
                    >
                        Easy
                    </UButton>
                    <UButton
                        class="flex justify-center h-9 sm:h-12"
                        icon="i-tabler-circle-dashed-check"
                        variant="outline"
                        color="sky"
                        size="lg"
                        :loading="state.loading"
                        @click="answer(GradeType.good)"
                    >
                        Good
                    </UButton>
                    <UButton
                        class="flex justify-center h-9 sm:h-12"
                        icon="i-tabler-brain"
                        variant="outline"
                        color="yellow"
                        size="lg"
                        :loading="state.loading"
                        @click="answer(GradeType.hard)"
                    >
                        Hard
                    </UButton>
                    <UButton
                        class="flex justify-center h-9 sm:h-12"
                        icon="i-tabler-reload"
                        variant="outline"
                        color="red"
                        size="lg"
                        :loading="state.loading"
                        @click="answer(GradeType.again)"
                    >
                        Again
                    </UButton>
                </div>
            </section>
        </template>
        <template v-else>
            <section class="p-6 grow flex flex-col items-center overflow-auto">
                <div class="grid grid-cols-2 items-center w-full gap-x-">
                    <!-- TODO Factoriser -->
                    <UButton
                        size="sm"
                        icon="i-tabler-arrow-left"
                        class="justify-self-start"
                        variant="ghost"
                        square
                        :to="{ name: 'practice' }"
                        color="red"
                    >
                        <stan class="hidden md:inline">
                            Leave
                        </stan>
                    </UButton>
                </div>

                <UCard class="max-w-2xl mt-6 overflow-auto sm:mt-10 w-full" :ui="{ body: { padding: '' }, header: { padding: '' } }">
                    <template #header>
                        <div class="flex justify-between items-center gap-x-4 overflow-x-auto p-3">
                            <h4 class="font-bold text-lg">
                                Results
                            </h4>

                            <Tooltip
                                activation="click"
                                help
                                :text="`Accuracy of 86%`"
                            >
                                <UBadge
                                    v-if="mostFrequent(sessionStore.grades.map(g => g.grade)) === GradeType.easy"
                                    color="green"
                                    variant="subtle"
                                    class="flex items-center gap-x-1"
                                >
                                    <UIcon name="i-tabler-rosette-discount-check" class="w-4 h-4" />
                                    Awesome
                                </UBadge>
                                <UBadge
                                    v-if="mostFrequent(sessionStore.grades.map(g => g.grade)) === GradeType.good"
                                    color="sky"
                                    variant="subtle"
                                    class="flex items-center gap-x-1"
                                >
                                    <UIcon name="i-tabler-thumb-up" class="w-4 h-4" />
                                    Good
                                </UBadge>
                                <UBadge
                                    v-if="mostFrequent(sessionStore.grades.map(g => g.grade)) === GradeType.hard"
                                    color="yellow"
                                    variant="subtle"
                                    class="flex items-center gap-x-1"
                                >
                                    <UIcon name="i-tabler-shadow" class="w-4 h-4" />
                                    Almost
                                </UBadge>
                                <UBadge
                                    v-if="mostFrequent(sessionStore.grades.map(g => g.grade)) === GradeType.again"
                                    color="red"
                                    variant="subtle"
                                    class="flex items-center gap-x-1"
                                >
                                    <UIcon name="i-tabler-repeat" class="w-4 h-4" />
                                    Try again
                                </UBadge>
                            </Tooltip>
                        </div>
                    </template>

                    <UMeterGroup
                        :max="sessionStore.grades.length"
                        size="sm"
                        :ui="{ list: 'hidden' }"
                    >
                        <UMeter :value="sessionStore.grades.filter(g => g.grade === GradeType.easy).length" color="green" />
                        <UMeter :value="sessionStore.grades.filter(g => g.grade === GradeType.good).length" color="sky" />
                        <UMeter :value="sessionStore.grades.filter(g => g.grade === GradeType.hard).length" color="yellow" />
                        <UMeter :value="sessionStore.grades.filter(g => g.grade === GradeType.again).length" color="red" />
                    </UMeterGroup>

                    <div class="p-4 md:p-5 flex flex-col gap-y-6">
                        <div class="grid md:grid-cols-2 gap-3 text-gray-500 dark:text-gray-400">
                            <div class="flex gap-x-1 items-center shrink-0">
                                <UIcon name="i-tabler-clock" />
                                <span>Finished in ~{{ secondsToMinutes(sessionStore.grades.map(g => g.duration).reduce((acc, duration) => acc + duration) / 1000) }} minutes</span>
                            </div>
                            <div class="flex items-center gap-x-1 shrink-0 md:justify-end">
                                <UIcon name="i-tabler-cards" />
                                <span>{{ sessionStore.currentSessionFlashcards.length }} Flashcards</span>
                            </div>
                        </div>

                        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <template v-for="(grade, i) in sessionStore.grades" :key="i">
                                <div class="grow ring ring-gray-800 ring-1 rounded-md p-2 text-gray-400 dark:text-gray-300 flex items-center">
                                    <span class="font-medium grow text-center">{{ i + 1 }}</span>
                                    <Tooltip
                                        v-if="grade.grade === GradeType.easy"
                                        help
                                        text="Easy"
                                        activation="click"
                                    >
                                        <UIcon name="i-tabler-checks" :class="`text-${gradeColor(grade.grade)}-400`" />
                                    </Tooltip>
                                    <Tooltip
                                        v-if="grade.grade === GradeType.good"
                                        help
                                        text="Good"
                                        activation="click"
                                    >
                                        <UIcon name="i-tabler-circle-dashed-check" :class="`text-${gradeColor(grade.grade)}-400`" />
                                    </Tooltip>
                                    <Tooltip
                                        v-if="grade.grade === GradeType.hard"
                                        help
                                        text="Hard"
                                        activation="click"
                                    >
                                        <UIcon name="i-tabler-brain" :class="`text-${gradeColor(grade.grade)}-400`" />
                                    </Tooltip>
                                    <Tooltip
                                        v-if="grade.grade === GradeType.again"
                                        help
                                        text="Again"
                                        activation="click"
                                    >
                                        <UIcon name="i-tabler-reload" :class="`text-${gradeColor(grade.grade)}-400`" />
                                    </Tooltip>
                                </div>
                            </template>
                        </div>

                        <div class="flex gap-3">
                            <div class="flex items-center gap-x-1">
                                <UIcon name="i-tabler-checks" :class="`text-${gradeColor(GradeType.easy)}-400`" />
                                <span class="text-gray-500 dark:text-gray-400">
                                    Easy:
                                    {{ sessionStore.grades.filter(g => g.grade === GradeType.easy).length }}
                                    ({{ formatNumber(100 * sessionStore.grades.filter(g => g.grade === GradeType.easy).length/sessionStore.grades.length) }}%)
                                </span>
                            </div>
                            <div class="flex items-center gap-x-1">
                                <UIcon name="i-tabler-circle-dashed-check" :class="`text-${gradeColor(GradeType.good)}-400`" />
                                <span class="text-gray-500 dark:text-gray-400">
                                    Good:
                                    {{ sessionStore.grades.filter(g => g.grade === GradeType.good).length }}
                                    ({{ formatNumber(100 * sessionStore.grades.filter(g => g.grade === GradeType.good).length/sessionStore.grades.length) }}%)
                                </span>
                            </div>
                            <div class="flex items-center gap-x-1">
                                <UIcon name="i-tabler-brain" :class="`text-${gradeColor(GradeType.hard)}-400`" />
                                <span class="text-gray-500 dark:text-gray-400">
                                    Hard:
                                    {{ sessionStore.grades.filter(g => g.grade === GradeType.hard).length }}
                                    ({{ formatNumber(100 * sessionStore.grades.filter(g => g.grade === GradeType.hard).length/sessionStore.grades.length) }}%)
                                </span>
                            </div>
                            <div class="flex items-center gap-x-1">
                                <UIcon name="i-tabler-reload" :class="`text-${gradeColor(GradeType.again)}-400`" />
                                <span class="text-gray-500 dark:text-gray-400">
                                    Again:
                                    {{ sessionStore.grades.filter(g => g.grade === GradeType.again).length }}
                                    ({{ formatNumber(100 * sessionStore.grades.filter(g => g.grade === GradeType.again).length/sessionStore.grades.length) }}%)
                                </span>
                            </div>
                        </div>

                        <div class="flex flex-col gap-y-8">
                            <UCard
                                v-for="(flashcard, i) in sessionStore.currentSessionFlashcards"
                                :key="i"
                                :ui="{ header: { padding: '' }, body: { padding: '' } }"
                            >
                                <template #header>
                                    <div class="p-3 flex justify-between">
                                        <div class="font-medium flex items-center gap-x-2">
                                            <UIcon v-if="sessionStore.grades[i].grade === GradeType.easy" name="i-tabler-checks" :class="`text-${gradeColor(GradeType.easy)}-400`" />
                                            <UIcon v-else-if="sessionStore.grades[i].grade === GradeType.good" name="i-tabler-circle-dashed-check" :class="`text-${gradeColor(GradeType.good)}-400`" />
                                            <UIcon v-else-if="sessionStore.grades[i].grade === GradeType.hard" name="i-tabler-brain" :class="`text-${gradeColor(GradeType.hard)}-400`" />
                                            <UIcon v-else-if="sessionStore.grades[i].grade === GradeType.again" name="i-tabler-reload" :class="`text-${gradeColor(GradeType.again)}-400`" />
                                            <span>Question {{ i + 1 }}</span>
                                        </div>
                                        <div class="flex items-center gap-x-2  text-gray-500 dark:text-gray-400">
                                            <UIcon name="i-tabler-clock" />
                                            {{ millisecondsToHuman(sessionStore.grades[i].duration) }}
                                        </div>
                                    </div>
                                </template>
                                <p class="p-3 text-gray-300">
                                    {{ flashcard.front }}
                                </p>
                                <UDivider />
                                <p class="p-3 text-gray-300">
                                    {{ flashcard.back }}
                                </p>
                            </UCard>
                        </div>
                    </div>
                </UCard>
            </section>
        </template>
    </div>
</template>

<script lang="ts" setup>
import { ModalConfirm } from "#components";
import type { BadgeColor } from "#ui/types";
import { GradeType } from "~/types/entity";
import Tooltip from "~/components/Tooltip.vue";

definePageMeta({
    name: "session",
});

const modal = useModal();
const repository = useRepository();
const sessionStore = useSessionStore();
const reviewStore = useReviewStore();

const state = reactive({
    loading: false,
});

onBeforeRouteLeave(async () =>
{
    return sessionStore.hasNextFlashcard ? await displayModalAsync() : true;
});

const displayModalAsync = () =>
{
    return new Promise<boolean>((resolve) =>
    {
        modal.open(ModalConfirm, {
            title: "Leave the session",
            description: "Are you sure you want to leave this session. You'll not be able to finish it.",
            icon: "i-tabler-door-exit",
            cancelLabel: "Stay here",
            confirmLabel: "Leave",
            color: "red",
            onConfirm: () => resolve(true),
            onClose: () => resolve(false)
        });
    });
};

const currentQuestion = computed(() => sessionStore.currentSessionFlashcards[sessionStore.currentFlashcard]);
const difficulty = computed<{ label: string; color: BadgeColor }>(() =>
{
    if (!currentQuestion.value || currentQuestion.value.difficulty === null)
    {
        return {
            label: "Not trained yet",
            color: "gray"
        };
    }

    if (currentQuestion.value.difficulty >= 7)
    {
        return {
            label: "Hard",
            color: "red"
        };
    }
    else if (currentQuestion.value.difficulty <= 4)
    {
        return {
            label: "Easy",
            color: "green"
        };
    }
    else
    {
        return {
            label: "Medium",
            color: "yellow"
        };
    }
});

const answer = async (gradeType: number) =>
{
    try
    {
        state.loading = true;
        await repository.flashcard.review(currentQuestion.value.id, gradeType, sessionStore.currentSession!.id);
        sessionStore.addGrade(gradeType);
        reviewStore.increment();

        if (sessionStore.hasNextFlashcard)
        {
            sessionStore.nextFlashcards();
        }
    }
    catch
    {
        useStandardToast("error", {
            description: "Unable to the send the answer"
        });
    }
    finally
    {
        state.loading = false;
    }
};
</script>
