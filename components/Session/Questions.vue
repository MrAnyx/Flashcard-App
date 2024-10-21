<template>
    <div class="flex flex-col">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-800 overflow-auto shrink-0">
            <UBreadcrumb
                :links="[
                    { label: 'Tech', icon: 'i-tabler-folder', labelClass: 'text-gray-500 dark:text-gray-400', iconClass: 'text-gray-500 dark:text-gray-400' },
                    { label: 'Turing machine', icon: 'i-tabler-color-swatch', labelClass: 'text-gray-500 dark:text-gray-400', iconClass: 'text-gray-500 dark:text-gray-400' }
                ]"
                class="min-w-fit"
            />
        </div>
        <section class="p-6 grow flex flex-col items-center overflow-auto">
            <div class="flex justify-between items-center w-full gap-x-2">
                <UButton
                    size="sm"
                    icon="i-tabler-arrow-left"
                    variant="ghost"
                    square
                    :to="{ name: 'practice' }"
                    color="red"
                >
                    <stan class="hidden md:inline">
                        Leave
                    </stan>
                </UButton>

                <UBadge
                    v-if="sessionStore.currentStrike >= 3"
                    variant="subtle"
                >
                    <UIcon name="i-tabler-flame" class="w-5 h-5 mr-1" />
                    {{ sessionStore.currentStrike }} in a row
                </UBadge>
            </div>

            <UCard class="max-w-2xl mt-6 overflow-auto w-full min-h-[120px]" :ui="{ body: { padding: '' }, header: { padding: '' } }">
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
    </div>
</template>

<script lang="ts" setup>
import type { BadgeColor } from "#ui/types";
import { GradeType } from "~/types/entity";
import Tooltip from "~/components/Tooltip.vue";

definePageMeta({
    name: "session",
});

const repository = useRepository();
const sessionStore = useSessionStore();
const reviewStore = useReviewStore();

const state = reactive({
    loading: false,
});

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
        else
        {
            // Not working
            await repository.session.stop(sessionStore.currentSession!.id);
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
