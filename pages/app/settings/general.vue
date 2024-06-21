<template>
    <div class="flex flex-col space-y-8">
        <div>
            <h2 class="font-medium text-gray-200 text-xl">
                Pagination
            </h2>
            <span class="text-gray-400 text-sm">Customize how requests are made</span>
        </div>
        <section>
            <div class="grid grid-cols-1 gap-3 lg:grid-cols-2 items-center">
                <div>
                    <h4>Items per page</h4>
                    <span class="text-gray-400 text-sm">Specify the number of items per mage</span>
                </div>
                <USelectMenu
                    v-model="paginationStore.itemsPerPage"
                    :options="itemsPerPageObject"
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
const itemsPerPageOptions = [25, 50, 100, 200];
const itemsPerPageObject = itemsPerPageOptions.map((o) =>
{
    return {
        label: o.toString(),
        value: o
    };
});
</script>
