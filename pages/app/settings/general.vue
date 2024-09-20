<template>
    <div class="flex flex-col space-y-8">
        <div>
            <h2 class="font-medium text-xl">
                Pagination
            </h2>
            <span class="text-gray-400 text-sm">Customize how requests are made</span>
        </div>
        <section class="flex flex-col gap-y-6">
            <div class="grid grid-cols-1 gap-3 lg:grid-cols-2">
                <div>
                    <h4>Items per page</h4>
                    <span class="text-gray-400 text-sm">Specify the number of items per page</span>
                </div>
                <USelectMenu
                    v-model="itemsPerPage"
                    :options="itemsPerPageObject"
                    value-attribute="value"
                    option-attribute="label"
                    size="md"
                    @change="updatePagination"
                />
            </div>
        </section>
        <UDivider />
        <div>
            <h2 class="font-medium text-xl">
                Session
            </h2>
            <span class="text-gray-400 text-sm">Customize your session</span>
        </div>
        <section class="flex flex-col gap-y-6">
            <div class="grid grid-cols-1 gap-3 lg:grid-cols-2">
                <div>
                    <h4>Flashcards per session</h4>
                    <span class="text-gray-400 text-sm">Specify the number of flashcards per session</span>
                </div>
                <div :state="null" :schema="null">
                    <UInput
                        v-model="flashcardsPerSession"
                        type="number"
                        size="md"
                        @change="updateFlashcardsPerSession"
                    />
                </div>
            </div><div class="grid grid-cols-1 gap-3 lg:grid-cols-2">
                <div>
                    <h4>Display session introduction</h4>
                    <span class="text-gray-400 text-sm">Specify the number of flashcards per session</span>
                </div>
                <div :state="null" :schema="null">
                    <UToggle
                        v-model="showSessionIntroduction"
                        @change="updateShowSessionIntroduction"
                    />
                </div>
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
const updatePagination = useDebounceFn(async () => await setSetting("items_per_page", itemsPerPage.value), 1000);

const flashcardsPerSession = ref(authStore.getSetting<number>("flashcard_per_session"));
const updateFlashcardsPerSession = useDebounceFn(async () => await setSetting("flashcard_per_session", flashcardsPerSession.value), 1000);

const showSessionIntroduction = ref(authStore.getSetting<boolean>("show_session_introduction"));
const updateShowSessionIntroduction = useDebounceFn(async () => await setSetting("show_session_introduction", showSessionIntroduction.value), 1000);

const eraseReviews = async () =>
{
    modal.open(ModalConfirm, {
        description: "Are you sure ? This action can not be undone",
        icon: "i-tabler-alert-triangle",
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
