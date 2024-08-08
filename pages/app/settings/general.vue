<template>
    <div class="flex flex-col space-y-8">
        <div>
            <h2 class="font-medium text-xl">
                Pagination
            </h2>
            <span class="text-gray-400 text-sm">Customize how requests are made</span>
        </div>
        <section>
            <div class="grid grid-cols-1 gap-3 lg:grid-cols-2">
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
        <div>
            <h2 class="font-medium text-xl">
                Data collection
            </h2>
            <span class="text-gray-400 text-sm">Manage your collection</span>
        </div>
        <section>
            <div class="grid grid-cols-1 gap-3 lg:grid-cols-2">
                <div>
                    <h4>Reset your reviews</h4>
                    <span class="text-gray-400 text-sm">Reset your flashcards state and go bask as you just created them</span>
                </div>
                <div>
                    <UButton
                        label="Erase"
                        variant="soft"
                        color="red"
                        @click="eraseReviews"
                    />
                </div>
            </div>
        </section>
        <UDivider />
    </div>
</template>

<script setup lang="ts">
import { ModalConfirm } from "#components";

definePageMeta({
    name: "settings-general"
});

useHead({
    title: "General"
});

const authStore = useAuthStore();
const repository = useRepository();
const modal = useModal();

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

        useStandardToast("success", {
            description: "Settings saved"
        });
    }
    catch
    {
        useStandardToast("error", {
            description: `Unable to update setting items_per_page`
        });
    }
};

const eraseReviews = async () =>
{
    modal.open(ModalConfirm, {
        description: "Are you sure ? This action can not be undone",
        async onConfirm()
        {
            try
            {
                await repository.flashcard.resetAllFlashcards();

                useStandardToast("success", {
                    description: "All flashcards have been reset"
                });
            }
            catch
            {
                useStandardToast("error", {
                    description: "Unable to reset all flashcards"
                });
            }
        }
    });
};
</script>
