<template>
    <div>
        <UBreadcrumb
            :links="breadcrumbItems"
            class="px-6 py-4 border-b border-gray-800"
        />
        <RecentItems
            v-if="unitStore.recents.length >= 4"
            title="Recent units"
            :items="unitStore.recents"
            route="flashcards"
        />
    </div>
</template>

<script setup lang="ts">
import type { BreadcrumbLink } from "#ui/types";
import type { Unit } from "~/types/entity";

definePageMeta({
    name: "units"
});

const unitStore = useUnitStore();

onMounted(() => {
    if (unitStore.recents.length === 0) {
        loadRecentUnits();
    }
    loadUnits();
});

const loadRecentUnits = async () => {
    const { data, error } = await useApi<Unit[]>("/units/recent", {
        method: "GET",
    });

    if (!error.value) {
        unitStore.recents = data.value!.data;
    }
    else if (error.value.statusCode === 401) {
        useStandardToast("unauthorized");
    }
    else {
        useStandardToast("error");
    }
};

const loadUnits = async () => {
    const { data, error } = await useApi<Unit[]>("/units", {
        method: "GET",
    });

    if (!error.value) {
        unitStore.units = data.value!.data;
    }
    else if (error.value.statusCode === 401) {
        useStandardToast("unauthorized");
    }
    else {
        useStandardToast("error");
    }
};

const breadcrumbItems: BreadcrumbLink[] = [
    {
        label: "Collection",
        icon: "i-heroicons-folder",
        to: "/app/collection"
    },
    {
        label: "Korean",
        to: "/app/collection/1"
    }
];
</script>
