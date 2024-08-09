<script setup lang="ts">
const theme = useColorMode();

const options = computed(() => ({
    chart: {
        foreColor: theme.value === "light" ? `rgb(${useCssVar("--color-gray-500").value.split(" ")})` : `rgb(${useCssVar("--color-gray-500").value.split(" ")})`,
        animations: {
            enabled: false
        },
        toolbar: {
            show: false
        },
        zoom: {
            enabled: false
        }
    },
    xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        tooltip: {
            enabled: false
        },
        axisBorder: {
            color: "#ff0000",
        },
        axisTicks: {
            color: "#ff0000",
        },
    },
    grid: {
        borderColor: "#ff0000",
        xaxis: {
            lines: {
                show: true
            }
        },
        yaxis: {
            lines: {
                show: false
            }
        },
    },
    stroke: {
        curve: "smooth",
        show: true,
        width: 3,
        dashArray: 0,
        colors: ["#ff0000"]
    },
    fill: {
        colors: ["#ff0000"],
        opacity: 0.1,
        type: "solid",
    },
    dataLabels: {
        enabled: false
    },
    markers: {
        colors: "#ff0000"
    },
    tooltip: {
        enabled: true,
        x: {
            show: false
        },
        y: {
            formatter: (val: number) => val,
            title: {
                formatter: (seriesName: string) => seriesName,
            },
        },
        marker: {
            show: false,
        },
    },
}));

const series = computed(() => [{
    name: "Avg review",
    data: [30, 40, 45, 50, 49, 60, 91, 91]
}]);
</script>

<template>
    <ClientOnly>
        <div class="w-full h-96">
            <apexchart
                height="100%"
                type="area"
                :options="options"
                :series="series"
            />
        </div>
    </ClientOnly>
</template>

<style lang="scss">
.apexcharts-tooltip {
}
</style>
