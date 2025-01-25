<template>
    <section class="p-6 flex flex-col items-center overflow-auto gap-y-6">
        <div class="flex justify-between items-center w-full gap-x-2">
            <SessionLeaveButton :to="{ name: 'sessions' }" />

            <Tooltip
                activation="hover"
                help
                :text="`Accuracy of ${formatNumber(practiceStore.accuracy * 100)}%`"
            >
                <UBadge
                    :color="resultGrade.color"
                    variant="subtle"
                    class="flex items-center gap-x-1"
                    :icon="resultGrade.icon"
                >
                    {{ resultGrade.text }}
                </UBadge>
            </Tooltip>
        </div>

        <UCard
            class="overflow-auto w-full"
            :ui="{ body: { padding: '' } }"
        >
            <UMeterGroup
                :max="practiceStore.grades.length"
                size="sm"
                :ui="{ list: 'hidden' }"
            >
                <UMeter
                    v-for="grade in Object.values(GradeType).reverse()"
                    :key="grade"
                    :value="practiceStore.grades.filter(g => g.grade === grade).length"
                    :color="gradeData(grade).color as MeterColor"
                />
            </UMeterGroup>

            <div class="p-4 md:p-5 flex flex-col gap-y-6 md:gap-y-8">
                <div class="flex flex-col md:flex-row gap-x-3 gap-y-1 md:justify-between c-text-secondary overflow-x-auto text-sm md:text-base">
                    <div class="flex gap-x-1 items-center">
                        <UIcon
                            name="i-tabler-clock"
                            class=" shrink-0"
                        />
                        <span class="shrink-0">Finished in ~{{ millisecondsToHuman(practiceStore.grades.map(g => g.duration).reduce((acc, duration) => acc + duration, 0)) }}</span>
                    </div>
                    <div class="flex items-center gap-x-1 shrink-0">
                        <UIcon
                            name="i-tabler-cards"
                            class=" shrink-0"
                        />
                        <span class="shrink-0">{{ practiceStore.flashcards.length }} {{ pluralize(practiceStore.flashcards.length, "Flashcard") }}</span>
                    </div>
                </div>

                <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <template
                        v-for="(grade, i) in practiceStore.grades"
                        :key="i"
                    >
                        <div class="ring ring-gray-200 dark:ring-gray-800 ring-1 rounded-md p-2 flex items-center">
                            <span class="font-medium grow text-center text-sm md:text-base c-text-primary">{{ i + 1 }}</span>
                            <Tooltip
                                help
                                :text="gradeData(grade.grade).label"
                                activation="hover"
                            >
                                <UIcon
                                    :name="gradeData(grade.grade).icon"
                                    :class="`text-${gradeData(grade.grade).color}-400`"
                                />
                            </Tooltip>
                        </div>
                    </template>
                </div>

                <div class="flex flex-col md:flex-row gap-x-5 gap-y-3 text-sm md:text-base">
                    <div
                        v-for="grade in Object.values(GradeType).reverse()"
                        :key="grade"
                        class="flex items-center gap-x-1.5"
                    >
                        <UIcon
                            :name="gradeData(grade).icon"
                            :class="`text-${gradeData(grade).color}-400`"
                        />
                        <div>
                            <span class="c-text-primary">{{ gradeData(grade).label }}: {{ practiceStore.grades.filter(g => g.grade === grade).length }}</span>
                            <span class="c-text-secondary ml-1">({{ formatNumber(100 * practiceStore.grades.filter(g => g.grade === grade).length/practiceStore.grades.length) }}%)</span>
                        </div>
                    </div>
                </div>

                <div class="flex flex-col gap-y-5 md:gap-y-8">
                    <UCard
                        v-for="(flashcard, i) in practiceStore.flashcards"
                        :key="i"
                        :ui="{ header: { padding: '' }, body: { padding: '' } }"
                    >
                        <template #header>
                            <div class="p-3 flex justify-between">
                                <div class="font-medium flex items-center gap-x-2">
                                    <UIcon
                                        :name="gradeData(practiceStore.grades[i].grade).icon"
                                        :class="`text-${gradeData(practiceStore.grades[i].grade).color}-400`"
                                    />
                                    <span class="text-sm md:text-base c-text-primary">Question {{ i + 1 }}</span>
                                </div>
                                <div class="hidden md:flex items-center gap-x-1.5 c-text-secondary text-sm md:text-base">
                                    <UIcon name="i-tabler-clock" />
                                    {{ millisecondsToHuman(practiceStore.grades[i].duration) }}
                                </div>
                            </div>
                        </template>
                        <p class="p-3 c-text-primary text-sm md:text-base">
                            {{ flashcard.front }}
                        </p>
                        <UDivider
                            label="Answer"
                            :ui="{ label: 'c-text-secondary' }"
                        />
                        <p class="p-3 c-text-primary text-sm md:text-base">
                            {{ flashcard.back }}
                        </p>
                    </UCard>
                </div>
            </div>
        </UCard>
    </section>
</template>

<script lang="ts" setup>
import { GradeType } from "../../types/entity";
import Tooltip from "~/components/Tooltip.vue";
import type { BadgeColor, MeterColor } from "#ui/types";

const practiceStore = usePracticeStore();
const repository = useRepository();

onMounted(async () =>
{
    if (!practiceStore.session!.endedAt)
    {
        practiceStore.session = await repository.session.stop(practiceStore.session!.id);
    }
});

type ResultBadgeData = {
    color: BadgeColor;
    icon: string;
    text: string;
};

const resultGrade = computed<ResultBadgeData>(() =>
{
    switch (practiceStore.mostFrequentGrade)
    {
        case GradeType.easy:
            return { color: "green", icon: "i-tabler-rosette-discount-check", text: "Awesome" };
        case GradeType.good:
            return { color: "sky", icon: "i-tabler-thumb-up", text: "Good" };
        case GradeType.hard:
            return { color: "yellow", icon: "i-tabler-shadow", text: "Almost" };
        case GradeType.again:
            return { color: "red", icon: "i-tabler-repeat", text: "Try again" };
        default:
            return { color: "gray", icon: "i-tabler-help", text: "No grades" };
    }
});
</script>
