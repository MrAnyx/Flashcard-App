<template>
    <div class="flex flex-col space-y-8">
        <div>
            <h2 class="font-medium text-xl">
                My profile
            </h2>
            <span class="text-gray-400 text-sm">Customize your personal informations</span>
        </div>
        <UForm
            :state="profileFormData"
            :schema="profileSchema"
            :validate-on="['submit']"
            class="flex flex-col gap-y-6"
            @submit="saveProfile"
        >
            <div class="grid grid-cols-1 gap-3 lg:grid-cols-2">
                <div>
                    <h4>Email</h4>
                    <span class="text-gray-400 text-sm">Used to login and receive notifications</span>
                </div>
                <UFormGroup name="email">
                    <UInput
                        v-model="profileFormData.email"
                        type="email"
                        icon="i-tabler-mail"
                    />
                </UFormGroup>
            </div>
            <div class="grid grid-cols-1 gap-3 lg:grid-cols-2">
                <div>
                    <h4>Username</h4>
                    <span class="text-gray-400 text-sm">Your unique identifier used to login</span>
                </div>
                <UFormGroup name="username">
                    <UInput
                        v-model="profileFormData.username"
                        icon="i-tabler-user"
                    />
                </UFormGroup>
            </div>

            <UButton
                class="self-end"
                label="Save"
                icon="i-tabler-device-floppy"
                type="submit"
                variant="soft"
            />
        </UForm>
        <UDivider />
        <div>
            <h2 class="font-medium text-xl">
                Security
            </h2>
            <span class="text-gray-400 text-sm">Customize your personal informations</span>
        </div>
        <UForm
            :state="securityFormData"
            :schema="securitySchema"
            :validate-on="['submit']"
            class="flex flex-col gap-y-6"
            @submit="saveSecurity"
        >
            <div class="grid grid-cols-1 gap-3 lg:grid-cols-2">
                <div>
                    <h4>Password</h4>
                    <span class="text-gray-400 text-sm">Used to securely login to your account</span>
                </div>
                <div class="flex flex-col gap-y-3">
                    <UFormGroup name="password">
                        <UInput
                            v-model="securityFormData.password"
                            icon="i-tabler-lock"
                            placeholder="Current password"
                            type="password"
                        />
                    </UFormGroup>

                    <UFormGroup name="passwordConfirm">
                        <UInput
                            v-model="securityFormData.passwordConfirm"
                            icon="i-tabler-lock"
                            placeholder="New password"
                            type="password"
                        />
                    </UFormGroup>
                </div>
            </div>
            <UButton
                class="self-end"
                label="Save"
                icon="i-tabler-device-floppy"
                type="submit"
                variant="soft"
            />
        </UForm>
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
const repository = useRepository();
const validationRule = useValidationRule();

// Profile section
const profileSchema = z.object({
    email: validationRule.email,
    username: validationRule.username,
});

type ProfileSchema = z.output<typeof profileSchema>;

const profileFormData = reactive<ProfileSchema>({
    email: authStore.user!.email,
    username: authStore.user!.username,
});

const saveProfile = async () =>
{
    try
    {
        const response = await repository.user.partialUpdateMe({
            email: profileFormData.email,
            username: profileFormData.username
        });

        authStore.user = response.data;

        useStandardToast("success", {
            description: "Settings saved"
        });
    }
    catch
    {
        useStandardToast("error", {
            description: "Unable to save settings"
        });
    }
};

// Security section
const securitySchema = z
    .object({
        password: validationRule.password,
        passwordConfirm: validationRule.password,
    })
    .refine(({ password, passwordConfirm }) => password === passwordConfirm, {
        message: "Passwords don't match",
        path: ["passwordConfirm"] // path of error
    }); ;

type SecuritySchema = z.output<typeof securitySchema>;

const securityFormData = reactive<SecuritySchema>({
    password: "",
    passwordConfirm: "",
});

const saveSecurity = async () =>
{
    try
    {
        await repository.user.partialUpdateMe({
            password: securityFormData.password,
        });

        useStandardToast("success", {
            description: "Settings saved"
        });
    }
    catch
    {
        useStandardToast("error", {
            description: "Unable to save settings"
        });
    }
    finally
    {
        securityFormData.password = "";
        securityFormData.passwordConfirm = "";
    }
};

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
