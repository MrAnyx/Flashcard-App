<script setup lang="ts">
import { VisXYContainer, VisLine, VisAxis, VisArea, VisCrosshair, VisTooltip } from "@unovis/vue";
import { ref } from "vue";
import { eachDayOfInterval, format, sub } from "date-fns";

const graphContainer = ref<HTMLElement | null>(null);

const { width } = useElementSize(graphContainer);

const randomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

type DataRecord = { x: number; y: number };
const data = ref<DataRecord[]>(
    eachDayOfInterval({ start: sub(new Date(), { days: 14 }), end: new Date() }).map((el: any) => ({
        x: el,
        y: randomNumber(0, 50)
    }))
);

const x = (_: DataRecord, i: number) => i;
const y = (d: DataRecord) => d.y;

const xTicks = (i: number) =>
{
    if (i === 0 || i === data.value.length - 1 || !data.value[i])
    {
        return "";
    }
    return format(data.value[i].x, "d MMM");
};

const template = (d: DataRecord) => `${format(d.x, "d MMM")}: ${d.y}`;
</script>

<template>
    <!-- Using grid-cols-1 is a workaround to dynamically fix the width on the graph -->
    <div ref="graphContainer" class="w-full h-full grid grid-cols-1">
        <VisXYContainer
            :data="data"
            :padding="{ top: 10 }"
            class="h-96"
            :width="width"
        >
            <VisLine
                :data="data"
                color="rgb(var(--color-primary-DEFAULT))"
                :x="x"
                :y="y"
            />
            <VisArea
                :data="data"
                color="rgb(var(--color-primary-DEFAULT))"
                :x="x"
                :y="y"
                :opacity="0.1"
            />
            <VisAxis
                type="x"
                :x="x"
                :tick-format="xTicks"
            />

            <VisCrosshair
                color="rgb(var(--color-primary-DEFAULT))"
                :template="template"
            />

            <VisTooltip />
        </VisXYContainer>
    </div>
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
