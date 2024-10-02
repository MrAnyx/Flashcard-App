<template>
    <div class="h-full flex flex-col">
        <UMeter
            :value="sessionStore.currentFlashcard"
            :max="sessionStore.currentSessionFlashcards.length"
            size="sm"
        />
        <SessionQuestions v-if="sessionStore.hasNextFlashcard" />
        <SessionResults v-else />
    </div>
</template>

<script lang="ts" setup>
import { ModalConfirm } from "#components";

definePageMeta({
    name: "session",
});

const modal = useModal();
const sessionStore = useSessionStore();

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
</script>
