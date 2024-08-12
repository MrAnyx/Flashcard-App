<script setup lang="ts">
const theme = useColorMode();

const options = computed(() => ({
    chart: {
        foreColor: theme.value === "light" ? graphColor("gray", 500) : graphColor("gray", 500),
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
            color: theme.value === "light" ? graphColor("gray", 400) : graphColor("gray", 700),
        },
        axisTicks: {
            color: theme.value === "light" ? graphColor("gray", 400) : graphColor("gray", 700),
        },
    },
    grid: {
        borderColor: theme.value === "light" ? graphColor("gray", 300) : graphColor("gray", 700),
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
        colors: [theme.value === "light" ? graphColor("primary", 500) : graphColor("primary", 500)]
    },
    fill: {
        colors: [theme.value === "light" ? graphColor("primary", 500) : graphColor("primary", 500)],
        type: "gradient",
    },
    dataLabels: {
        enabled: false
    },
    markers: {
        colors: [theme.value === "light" ? graphColor("primary", 400) : graphColor("primary", 400)],
        strokeWidth: 2,
        hover: {
            size: 5
        }
    },
    tooltip: {
        enabled: true,
        theme: theme.value,
        followCursor: true,
        onDatasetHover: {
            highlightDataSeries: true,
        },
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
.apexcharts-tooltip.apexcharts-theme-dark {
    background: rgb(var(--color-gray-800)) !important;

    .apexcharts-tooltip-series-group {
        * {
            background: rgb(var(--color-gray-800)) !important;
        }
    }
}

.apexcharts-tooltip.apexcharts-theme-light {
    background: rgb(var(--color-gray-50)) !important;

    .apexcharts-tooltip-series-group {
        * {
            background: rgb(var(--color-gray-50)) !important;
        }
    }
}
</style>
