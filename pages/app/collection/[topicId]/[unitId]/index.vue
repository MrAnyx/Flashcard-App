<template>
    <div>
        <UBreadcrumb
            :links="breadcrumbItems"
            class="px-6 py-4 border-b border-gray-800"
        />
    </div>
</template>

<script setup lang="ts">
import type { BreadcrumbLink } from "#ui/types";

const breadcrumbItems: BreadcrumbLink[] = [
    {
        label: "Collection",
        icon: "i-heroicons-folder",
        to: "/app/collection"
    },
    {
        label: "Korean",
        to: "/app/collection/1"
    },
    {
        label: "Names",
        to: "/app/collection/1/2"
    }
];
</script>
