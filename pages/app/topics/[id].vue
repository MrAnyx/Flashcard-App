<template>
    <UBreadcrumb :links="links" />
</template>

<script setup lang="ts">
import type { BreadcrumbLink } from "#ui/types";

const links: BreadcrumbLink[] = [{
    label: "Topic",
    icon: "i-heroicons-folder",
    to: "/app/topics"
}, {
    label: "Korean",
    to: "/"
}, {
    label: "Unit",
    icon: "i-heroicons-swatch",
    to: "/"
}, {
    label: "Alphabet"
}];
</script>
