<template>
    <div class="flex flex-col space-y-8">
        <div>
            <h2 class="font-medium text-xl">
                My profile
            </h2>
            <span class="text-gray-400 text-sm">Customize your personal informations</span>
        </div>
        <section class="flex flex-col gap-y-6">
            <div class="grid grid-cols-1 gap-3 lg:grid-cols-2 items-center">
                <div>
                    <h4>Email</h4>
                    <span class="text-gray-400 text-sm">Used to login and receive notifications</span>
                </div>
                <UInput
                    v-model="profileState.email"
                    type="email"
                    icon="i-tabler-mail"
                />
            </div>
            <div class="grid grid-cols-1 gap-3 lg:grid-cols-2 items-center">
                <div>
                    <h4>Username</h4>
                    <span class="text-gray-400 text-sm">Your unique identifier used to login</span>
                </div>
                <UInput
                    v-model="profileState.username"
                    icon="i-tabler-user"
                />
            </div>
        </section>
        <UDivider />
        <div>
            <h2 class="font-medium text-xl">
                Security
            </h2>
            <span class="text-gray-400 text-sm">Customize your personal informations</span>
        </div>
        <section class="flex flex-col gap-y-6">
            <div class="grid grid-cols-1 gap-3 lg:grid-cols-2 items-center">
                <div>
                    <h4>Password</h4>
                    <span class="text-gray-400 text-sm">Used to securely login to your account</span>
                </div>
                <div>
                    <UInput
                        icon="i-tabler-lock"
                        placeholder="Current password"
                        class="mb-2"
                    />
                    <UInput
                        icon="i-tabler-lock"
                        placeholder="New password"
                    />
                </div>
            </div>
        </section>
        <UDivider />
        <UAlert
            title="Danger zone"
            icon="i-tabler-alert-triangle"
            description="Permanently delete your account with all your data"
            color="red"
            variant="subtle"
            :actions="deleteAccountActions"
        />
    </div>
</template>

<script setup lang="ts">
import { z } from "zod";
import type { AlertAction } from "#ui/types";
import { ModalDeleteAccount } from "#components";

definePageMeta({
    alias: "/app/settings/account",
    name: "settings-account"
});

useHead({
    title: "Account"
});

const authStore = useAuthStore();
const modal = useModal();

// const schema = z.object({
//     username: z.string()
//         .min(1, "Identifier can not be blank")
//         .max(180, "Identifier is too long"),
//     email: z.string()
//         .min(1, "Password can not be blank")
// });

const profileState = reactive({
    username: authStore.user!.username,
    email: authStore.user!.email
});

const deleteAccountActions: AlertAction[] = [
    {
        label: "Delete my account",
        icon: "i-tabler-trash",
        color: "red",
        variant: "solid",
        click: () =>
        {
            modal.open(ModalDeleteAccount);
        }
    },
];
</script>
