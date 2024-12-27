<template>
    <UButton
        class="flex justify-center h-9 sm:h-12"
        :icon="data?.icon"
        variant="outline"
        :color="data?.color ?? 'primary'"
        size="lg"
        :loading="props.loading"
        @click="emit('answer', props.grade)"
    >
        {{ data?.text }}
    </UButton>
</template>

<script lang="ts" setup>
import type { Grade } from "~/types/entity";
import type { ButtonColor } from "#ui/types";

const emit = defineEmits(["answer"]);

const props = defineProps<{
    loading?: boolean;
    grade: Grade;
}>();

type ButtonData = {
    icon: string;
    color: ButtonColor;
    text: string;
};

const data = computed<ButtonData | null>(() =>
{
    switch (props.grade)
    {
        case 4:
            return {
                icon: "i-tabler-checks",
                color: "green",
                text: "Easy"
            };
        case 3:
            return {
                icon: "i-tabler-circle-dashed-check",
                color: "sky",
                text: "Good"
            };
        case 2:
            return {
                icon: "i-tabler-brain",
                color: "yellow",
                text: "Hard"
            };
        case 1:
            return {
                icon: "i-tabler-reload",
                color: "red",
                text: "Again"
            };
        default:
            return null;
    }
});
</script>
