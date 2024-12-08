<template>
    <Tooltip
        :text="props.tooltipText"
        activation="hover"
        help
    >
        <UBadge
            :color="props.color"
            variant="subtle"
            class="space-x-1 items-center"
        >
            <UIcon
                :name="props.icon"
                class="w-3 h-3"
            />
            <span>{{ props.label }}</span>
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
