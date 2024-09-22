<template>
    <div class="h-full flex flex-col">
        <UMeter :value="20" size="sm" />
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

                <div class="flex justify-end ">
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
                            help
                            text="Search on Google for more details"
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
                        <Tooltip
                            activation="click"
                            text="Difficulty of 6/10"
                            help
                        >
                            <UBadge color="yellow" variant="subtle">
                                Medium
                            </UBadge>
                        </Tooltip>
                    </div>
                </template>

                <p class="leading-8 sm:leading-10 md:leading-10 text-base sm:text-lg md:text-xl p-4 md:p-5">
                    Given a non-deterministic Turing machine (NDTM), explain how it relates to solving problems in NP, and whether an NDTM can solve problems in NP-complete in polynomial time. Additionally, outline the significance of polynomial-time reductions in proving that a problem is NP-complete. Finally, provide an example of a real-world problem that is NP-complete and discuss whether quantum computing might offer a path to solving such problems efficiently
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
                >
                    Easy
                </UButton>
                <UButton
                    class="flex justify-center h-9 sm:h-12"
                    icon="i-tabler-circle-dashed-check"
                    variant="outline"
                    color="sky"
                    size="lg"
                >
                    Good
                </UButton>
                <UButton
                    class="flex justify-center h-9 sm:h-12"
                    icon="i-tabler-brain"
                    variant="outline"
                    color="orange"
                    size="lg"
                >
                    Hard
                </UButton>
                <UButton
                    class="flex justify-center h-9 sm:h-12"
                    icon="i-tabler-reload"
                    variant="outline"
                    color="red"
                    size="lg"
                >
                    Again
                </UButton>
            </div>
        </section>
    </div>
</template>

<script lang="ts" setup>
import { ModalConfirm } from "#components";

definePageMeta({
    name: "session",
});

const modal = useModal();

onBeforeRouteLeave(async () =>
{
    return await displayModalAsync();
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
</script>
