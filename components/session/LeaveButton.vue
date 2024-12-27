<template>
    <UButton
        size="sm"
        icon="i-tabler-arrow-left"
        variant="ghost"
        square
        :to="props.to"
        color="red"
    >
        <stan class="hidden md:inline">
            Leave
        </stan>
    </UButton>
</template>

<script lang="ts" setup>
import type { RouteLocationAsPathGeneric, RouteLocationAsRelativeGeneric } from "vue-router";

const props = defineProps<{
    to?: string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric;
}>();
</script>
