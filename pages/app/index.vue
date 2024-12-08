<template>
    <NuxtLayout name="app">
        <template #header>
            Overview
        </template>
        <section class="p-6">
            <UCard>
                <div class="flex flex-col gap-y-3">
                    <h2 class="text-2xl text-gray-700 dark:text-gray-300">
                        Welcome back {{ authStore.user?.username ?? "" }}
                    </h2>
                    <p class="text-gray-500 dark:text-gray-400 text-sm capitalize">
                        {{ DateTime.now().toFormat('DDDD') }}
                    </p>
                    <p class="text-gray-500 dark:text-gray-400">
                        Boost your skills with your flashcards! Each practice session brings you one step closer to your goals. So, are you ready to take on the challenge?
                    </p>

                    <div class="flex gap-x-3">
                        <UButton
                            label="Start a session"
                            variant="soft"
                            icon="i-tabler-device-gamepad-2"
                            :loading="provider.loadingSession"
                            @click="openSessionModal"
                        />
                        <UButton
                            label="Manage collection"
                            variant="ghost"
                            color="gray"
                            :to="{ name: 'topics' }"
                        />
                    </div>
                </div>
            </UCard>
        </section>
    </NuxtLayout>
</template>

<script lang="ts" setup>
import { DateTime } from "luxon";
import { ModalSessionIntroduction } from "#components";

definePageMeta({
    name: "overview",
    middleware: ["auth", "initialize"] // Order is important to first check login and then initialize
});

useHead({
    title: "Overview"
});

const authStore = useAuthStore();
const modal = useModal();

const provider = reactive({
    loading: true,
    loadingSession: false,
});

const openSessionModal = async () =>
{
    if (authStore.getSetting("show_session_introduction"))
    {
        modal.open(ModalSessionIntroduction);
    }
    else
    {
        provider.loadingSession = true;
        await startSession();
        provider.loadingSession = false;
        await modal.close();
    }
};
</script>
