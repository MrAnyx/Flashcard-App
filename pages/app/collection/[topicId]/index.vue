<template>
    <div>
        <UBreadcrumb
            :links="breadcrumbItems"
            class="px-6 py-4 border-b border-gray-800"
        />
        <RecentItems
            title="Recent units"
            :items="recentItems"
            sub-type="flashcard"
        />
    </div>
</template>

<script setup lang="ts">
import type { BreadcrumbLink } from "#ui/types";
import type { RecentItem } from "~/types/RecentItem";

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

const recentItems: RecentItem[] = [
    {
        id: 1,
        title: "Alphabet",
        subItemsCount: 16,
        url: "/app/collection/1/1"
    },
    {
        id: 2,
        title: "Names",
        subItemsCount: 4,
        url: "/app/collection/1/2"
    },
    {
        id: 3,
        title: "Weather",
        subItemsCount: 1,
        url: "/app/collection/1/3"
    },
    {
        id: 4,
        title: "Numbers",
        subItemsCount: 2,
        url: "/app/collection/1/4"
    }
];
</script>
