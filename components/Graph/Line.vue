<script setup lang="ts">
import { VisXYContainer, VisLine, VisAxis, VisArea, VisCrosshair, VisTooltip } from "@unovis/vue";
import { ref } from "vue";

type DataRecord = { x: number; y: number };
const data = ref<DataRecord[]>([
    { x: 0, y: 0 },
    { x: 1, y: 1 },
    { x: 2, y: 3 },
    { x: 3, y: 2 },
    { x: 4, y: 0 },
    { x: 5, y: 7 },
    { x: 6, y: 6 },
    { x: 7, y: 10 },
    { x: 8, y: 4 },
]);

const template = (d: DataRecord) => `${d.x}: ${d.y}`;
</script>

<template>
    <VisXYContainer
        :data="data"
        :padding="{ top: 10 }"
        class="h-96"
    >
        <VisLine
            :data="data"
            :x="(d: DataRecord) => d.x"
            :y="(d: DataRecord) => d.y"
            color="rgb(var(--color-primary-DEFAULT))"
        />
        <VisArea
            :data="data"
            color="rgb(var(--color-primary-DEFAULT))"
            :x="(d: DataRecord) => d.x"
            :y="(d: DataRecord) => d.y"
            :opacity="0.1"
        />
        <VisAxis
            type="x"
        />

        <VisCrosshair
            color="rgb(var(--color-primary-DEFAULT))"
            :template="template"
        />

        <VisTooltip />
    </VisXYContainer>
</template>

<style scoped>
.unovis-xy-container {
  --vis-crosshair-line-stroke-color: rgb(var(--color-primary-500));
  --vis-crosshair-circle-stroke-color: #fff;

  --vis-axis-grid-color: rgb(var(--color-gray-200));
  --vis-axis-tick-color: rgb(var(--color-gray-200));
  --vis-axis-tick-label-color: rgb(var(--color-gray-400));

  --vis-tooltip-background-color: #fff;
  --vis-tooltip-border-color: rgb(var(--color-gray-200));
  --vis-tooltip-text-color: rgb(var(--color-gray-900));
}

.dark {
  .unovis-xy-container {
    --vis-crosshair-line-stroke-color: rgb(var(--color-primary-400));
    --vis-crosshair-circle-stroke-color: rgb(var(--color-gray-900));

    --vis-axis-grid-color: rgb(var(--color-gray-800));
    --vis-axis-tick-color: rgb(var(--color-gray-800));
    --vis-axis-tick-label-color: rgb(var(--color-gray-500));

    --vis-tooltip-background-color: rgb(var(--color-gray-900));
    --vis-tooltip-border-color: rgb(var(--color-gray-800));
    --vis-tooltip-text-color: #fff;
  }
}
</style>
