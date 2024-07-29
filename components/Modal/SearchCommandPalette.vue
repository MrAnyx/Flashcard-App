<template>
    <UModal>
        <UCommandPalette
            :groups="[{ key: 'people', commands: people }]"
            :close-button="{ icon: 'i-heroicons-x-mark-20-solid', color: 'gray', variant: 'link', padded: false }"
            icon="i-heroicons-magnifying-glass"
            :autoselect="false"
            placeholder="Search anything"
            :fuse="{ resultLimit: 6, fuseOptions: { threshold: 0.1 } }"
        />
    </UModal>
</template>

<script lang="ts" setup>
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
