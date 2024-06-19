<template>
    <div class="flex flex-col space-y-8">
        <div>
            <h2 class="font-medium text-gray-200 text-xl">
                Pagination
            </h2>
            <span class="text-gray-400 text-sm">Customize your personal informations</span>
        </div>
        <section>
            <div class="grid grid-cols-1 gap-3 lg:grid-cols-2 items-center">
                <div>
                    <h4>Items per page</h4>
                    <span class="text-gray-400 text-sm">Used to login and receive notifications</span>
                </div>
                <USelectMenu
                    v-model="paginationStore.itemsPerPage"
                    :options="itemsPerPageOptions"
                    value-attribute="value"
                    option-attribute="label"
                />
            </div>
        </section>
        <UDivider />
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    name: "settings-general"
});
useHead({
    title: "General"
});

const paginationStore = usePaginationStore();
const itemsPerPageOptions = [
    {
        label: "25",
        value: 25
    },
    {
        label: "50",
        value: 50
    },
    {
        label: "100",
        value: 100
    },
    {
        label: "200",
        value: 200
    }
];
</script>
