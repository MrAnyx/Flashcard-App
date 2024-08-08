<template>
    <UModal>
        <UCommandPalette
            ref="globalCommandPalette"
            :groups="[{ key: 'people', commands: people }]"
            :close-button="globalCommandPalette?.query ? { icon: 'i-tabler-x', color: 'gray', variant: 'link', padded: false } : null"
            icon="i-tabler-search"
            :autoselect="false"
            placeholder="Search anything"
            :fuse="{ resultLimit: 6, fuseOptions: { threshold: 0.1 } }"
        />
    </UModal>
</template>

<script lang="ts" setup>
const globalCommandPalette = ref();

const people = [
    { id: 1, label: "Wade Cooper" },
    { id: 2, label: "Arlene Mccoy" },
    { id: 3, label: "Devon Webb" },
    { id: 4, label: "Tom Cook" },
    { id: 5, label: "Tanya Fox" },
    { id: 6, label: "Hellen Schmidt" },
    { id: 7, label: "Caroline Schultz" },
    { id: 8, label: "Mason Heaney" },
    { id: 9, label: "Claudie Smitham" },
    { id: 10, label: "Emil Schaefer" }
];
</script>
