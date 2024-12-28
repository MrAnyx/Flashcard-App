<template>
    <UButton
        size="sm"
        icon="i-tabler-arrow-left"
        variant="ghost"
        square
        color="red"
        @click="leaveSession"
    >
        <stan class="hidden md:inline">
            Leave
        </stan>
    </UButton>
</template>

<script lang="ts" setup>
import type { RouteLocationAsPathGeneric, RouteLocationAsRelativeGeneric } from "vue-router";

const props = defineProps<{
    to: string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric;
}>();

const leaveSession = async () =>
{
    // const practiceStore = usePracticeStore();
    // practiceStore.resetSession();

    await navigateTo(props.to);
};
</script>
