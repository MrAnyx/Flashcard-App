<template>
    <UButton
        class="flex justify-center h-9 sm:h-12"
        :icon="gradeData(props.grade).icon"
        variant="outline"
        :color="gradeData(props.grade).color as ButtonColor"
        size="lg"
        :loading="props.loading"
        @click="emit('answer', props.grade)"
    >
        {{ gradeData(props.grade).label }}
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
</script>
