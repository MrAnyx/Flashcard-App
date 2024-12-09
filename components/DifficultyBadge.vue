<template>
    <Tooltip
        :text="props.tooltipText"
        activation="hover"
        help
    >
        <UBadge
            :color="props.color"
            variant="subtle"
            :icon="props.icon"
        >
            {{ props.label }}
        </UBadge>
    </Tooltip>
</template>

<script lang="ts" setup>
import type { BadgeColor } from "#ui/types";

const props = defineProps<{
    tooltipText: string;
    color: BadgeColor;
    label: string;
    icon: string;
}>();
</script>
