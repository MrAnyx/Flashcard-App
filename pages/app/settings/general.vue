<template>
    <div class="flex flex-col space-y-8">
        <div>
            <h2 class="font-medium text-xl">
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
                    v-model="itemsPerPage"
                    :options="itemsPerPageObject"
                    value-attribute="value"
                    option-attribute="label"
                    @change="updatePagination"
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

const authStore = useAuthStore();
const repository = useRepository();

const itemsPerPageOptions = [25, 50, 100, 200];
const itemsPerPageObject = itemsPerPageOptions.map((o) =>
{
    return {
        label: o.toString(),
        value: o
    };
});
const itemsPerPage = ref(authStore.getSetting<number>("items_per_page"));

const updatePagination = async () =>
{
    try
    {
        await repository.user.updateSetting("items_per_page", itemsPerPage.value);
        authStore.setSetting("items_per_page", itemsPerPage.value);
    }
    catch
    {
        useStandardToast("error", {
            description: `Unable to update setting items_per_page`
        });
    }
};
</script>
