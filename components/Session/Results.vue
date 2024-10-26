<template>
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

        <UCard class="mt-6 overflow-auto w-full" :ui="{ body: { padding: '' }, header: { padding: '' } }">
            <template #header>
                <div class="flex justify-between items-center gap-x-4 overflow-x-auto p-3">
                    <h4 class="font-bold text-lg">
                        Results
                    </h4>

                    <Tooltip
                        activation="click"
                        help
                        :text="`Accuracy of ${formatNumber(practiceStore.accuracy * 100)}%`"
                    >
                        <UBadge
                            v-if="mostFrequent(practiceStore.grades.map(g => g.grade)) === GradeType.easy"
                            color="green"
                            variant="subtle"
                            class="flex items-center gap-x-1"
                        >
                            <UIcon name="i-tabler-rosette-discount-check" class="w-4 h-4" />
                            Awesome
                        </UBadge>
                        <UBadge
                            v-if="mostFrequent(practiceStore.grades.map(g => g.grade)) === GradeType.good"
                            color="sky"
                            variant="subtle"
                            class="flex items-center gap-x-1"
                        >
                            <UIcon name="i-tabler-thumb-up" class="w-4 h-4" />
                            Good
                        </UBadge>
                        <UBadge
                            v-if="mostFrequent(practiceStore.grades.map(g => g.grade)) === GradeType.hard"
                            color="yellow"
                            variant="subtle"
                            class="flex items-center gap-x-1"
                        >
                            <UIcon name="i-tabler-shadow" class="w-4 h-4" />
                            Almost
                        </UBadge>
                        <UBadge
                            v-if="mostFrequent(practiceStore.grades.map(g => g.grade)) === GradeType.again"
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
                :max="practiceStore.grades.length"
                size="sm"
                :ui="{ list: 'hidden' }"
            >
                <UMeter :value="practiceStore.grades.filter(g => g.grade === GradeType.easy).length" color="green" />
                <UMeter :value="practiceStore.grades.filter(g => g.grade === GradeType.good).length" color="sky" />
                <UMeter :value="practiceStore.grades.filter(g => g.grade === GradeType.hard).length" color="yellow" />
                <UMeter :value="practiceStore.grades.filter(g => g.grade === GradeType.again).length" color="red" />
            </UMeterGroup>

            <div class="p-4 md:p-5 flex flex-col gap-y-6 overflow-y-auto">
                <div class="grid md:grid-cols-2 gap-3 text-gray-500 dark:text-gray-400">
                    <div class="flex gap-x-1 items-center shrink-0">
                        <UIcon name="i-tabler-clock" />
                        <span>Finished in ~{{ millisecondsToHuman(practiceStore.grades.map(g => g.duration).reduce((acc, duration) => acc + duration, 0)) }}</span>
                    </div>
                    <div class="flex items-center gap-x-1 shrink-0 md:justify-end">
                        <UIcon name="i-tabler-cards" />
                        <span>{{ practiceStore.currentSessionFlashcards.length }} Flashcards</span>
                    </div>
                </div>

                <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <template v-for="(grade, i) in practiceStore.grades" :key="i">
                        <div class="grow ring ring-gray-200 dark:ring-gray-800 ring-1 rounded-md p-2 text-gray-500 dark:text-gray-300 flex items-center">
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
                            {{ practiceStore.grades.filter(g => g.grade === GradeType.easy).length }}
                            ({{ formatNumber(100 * practiceStore.grades.filter(g => g.grade === GradeType.easy).length/practiceStore.grades.length) }}%)
                        </span>
                    </div>
                    <div class="flex items-center gap-x-1">
                        <UIcon name="i-tabler-circle-dashed-check" :class="`text-${gradeColor(GradeType.good)}-400`" />
                        <span class="text-gray-500 dark:text-gray-400">
                            Good:
                            {{ practiceStore.grades.filter(g => g.grade === GradeType.good).length }}
                            ({{ formatNumber(100 * practiceStore.grades.filter(g => g.grade === GradeType.good).length/practiceStore.grades.length) }}%)
                        </span>
                    </div>
                    <div class="flex items-center gap-x-1">
                        <UIcon name="i-tabler-brain" :class="`text-${gradeColor(GradeType.hard)}-400`" />
                        <span class="text-gray-500 dark:text-gray-400">
                            Hard:
                            {{ practiceStore.grades.filter(g => g.grade === GradeType.hard).length }}
                            ({{ formatNumber(100 * practiceStore.grades.filter(g => g.grade === GradeType.hard).length/practiceStore.grades.length) }}%)
                        </span>
                    </div>
                    <div class="flex items-center gap-x-1">
                        <UIcon name="i-tabler-reload" :class="`text-${gradeColor(GradeType.again)}-400`" />
                        <span class="text-gray-500 dark:text-gray-400">
                            Again:
                            {{ practiceStore.grades.filter(g => g.grade === GradeType.again).length }}
                            ({{ formatNumber(100 * practiceStore.grades.filter(g => g.grade === GradeType.again).length/practiceStore.grades.length) }}%)
                        </span>
                    </div>
                </div>

                <div class="flex flex-col gap-y-8">
                    <UCard
                        v-for="(flashcard, i) in practiceStore.currentSessionFlashcards"
                        :key="i"
                        :ui="{ header: { padding: '' }, body: { padding: '' } }"
                    >
                        <template #header>
                            <div class="p-3 flex justify-between">
                                <div class="font-medium flex items-center gap-x-2">
                                    <UIcon v-if="practiceStore.grades[i].grade === GradeType.easy" name="i-tabler-checks" :class="`text-${gradeColor(GradeType.easy)}-400`" />
                                    <UIcon v-else-if="practiceStore.grades[i].grade === GradeType.good" name="i-tabler-circle-dashed-check" :class="`text-${gradeColor(GradeType.good)}-400`" />
                                    <UIcon v-else-if="practiceStore.grades[i].grade === GradeType.hard" name="i-tabler-brain" :class="`text-${gradeColor(GradeType.hard)}-400`" />
                                    <UIcon v-else-if="practiceStore.grades[i].grade === GradeType.again" name="i-tabler-reload" :class="`text-${gradeColor(GradeType.again)}-400`" />
                                    <span>Question {{ i + 1 }}</span>
                                </div>
                                <div class="flex items-center gap-x-2 text-gray-500 dark:text-gray-400">
                                    <UIcon name="i-tabler-clock" />
                                    {{ millisecondsToHuman(practiceStore.grades[i].duration) }}
                                </div>
                            </div>
                        </template>
                        <p class="p-3 text-gray-500 dark:text-gray-300">
                            {{ flashcard.front }}
                        </p>
                        <UDivider />
                        <p class="p-3 text-gray-500 dark:text-gray-300">
                            {{ flashcard.back }}
                        </p>
                    </UCard>
                </div>
            </div>
        </UCard>
    </section>
</template>

<script lang="ts" setup>
import { GradeType } from "~/types/entity";
import Tooltip from "~/components/Tooltip.vue";

definePageMeta({
    name: "session",
});

const practiceStore = usePracticeStore();
</script>
