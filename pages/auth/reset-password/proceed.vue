<template>
    <div>
        <header class="text-center mb-8 flex flex-col space-y-2">
            <h2 class="text-3xl font-medium3">
                Oups, I forgot my password
            </h2>
        </header>

        <p class="text-gray-400 mb-8 leading-loose">
            The token sent by email is valid for <strong>10 minutes</strong>. Fill the token and your new password to finalize the process.
        </p>
        <UForm
            :schema="schema"
            :state="formData"
            class="space-y-8"
            :validate-on="['submit']"
            @submit="onSubmit"
        >
            <div class="flex flex-col space-y-4">
                <UFormGroup
                    label="Token"
                    name="token"
                >
                    <UInput
                        v-model="formData.token"
                        autofocus
                        placeholder="Enter the token sent by email"
                        icon="i-tabler-key"
                    />
                </UFormGroup>
                <UFormGroup
                    label="Password"
                    name="password"
                >
                    <UInput
                        v-model="formData.password"
                        type="password"
                        placeholder="New password"
                        icon="i-tabler-lock"
                    />
                </UFormGroup>
                <UFormGroup
                    label="Password confirmation"
                    name="passwordConfirm"
                >
                    <UInput
                        v-model="formData.passwordConfirm"
                        type="password"
                        placeholder="Confirm your password"
                        icon="i-tabler-lock"
                    />
                </UFormGroup>
            </div>

            <UButton
                type="submit"
                block
                :loading="formProvider.loadingForm"
            >
                Reset my password
            </UButton>

            <UDivider
                :ui="{ border: { base: 'dark:border-gray-700' } }"
            />

            <p class="text-sm text-gray-400 text-center">
                Go back to the
                <ULink
                    :to="{ name: 'login' }"
                    class="text-primary hover:text-primary-300"
                >
                    login page
                </ULink>
            </p>
        </UForm>
    </div>
</template>

<script setup lang="ts">
import { z } from "zod";

definePageMeta({
    layout: "auth",
    name: "reset-password-proceed",
});

const authStore = useAuthStore();
const repository = useRepository();
const validationRule = useValidationRule();

// Form definition
const schema = z
    .object({
        token: validationRule.token,
        password: validationRule.password,
        passwordConfirm: validationRule.password
    })
    .refine(({ password, passwordConfirm }) => password === passwordConfirm, {
        message: "Passwords don't match",
        path: ["passwordConfirm"] // path of error
    });

const formProvider = reactive({
    loadingForm: false
});

const formData = reactive({
    token: "",
    password: "",
    passwordConfirm: "",
});

const onSubmit = async () =>
{
    try
    {
        formProvider.loadingForm = true;

        const data = await repository.auth.proceedResetPassword({
            token: formData.token,
            password: formData.password
        });

        authStore.login(data.data);
        useStandardToast("success", {
            description: "Your password has beed reset successfully"
        });
        navigateTo({ name: "dashboard" });
    }
    finally
    {
        formProvider.loadingForm = false;
    }
};
</script>
