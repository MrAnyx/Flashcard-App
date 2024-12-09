<template>
    <NuxtLayout name="auth">
        <template #header>
            <AuthHeader
                title="Oups, I forgot my password"
                subtitle="Fear not. Enter your email or username and we'll send an email with the instructions to reset your password."
            />
        </template>
        <UForm
            :schema="schema"
            :state="state"
            class="space-y-6"
            :validate-on="['submit']"
            @submit="onSubmit"
        >
            <UFormGroup
                label="Email or username"
                name="identifier"
            >
                <UInput
                    v-model="state.identifier"
                    autofocus
                    placeholder="Enter your email or username"
                    icon="i-tabler-mail"
                />
            </UFormGroup>

            <UButton
                type="submit"
                block
                :loading="state.loading"
            >
                Reset password
            </UButton>
        </UForm>

        <template #footer>
            <AuthBackToLoginPage class="text-center" />
        </template>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { z } from "zod";

definePageMeta({
    name: "reset-password-request",
    middleware: ["guest"]
});

useHead({
    title: "Reset my password"
});

const repository = useRepository();
const validationRule = useValidationRule();
const route = useRoute();

const schema = z.object({
    identifier: validationRule.identifier,
});

const state = reactive({
    identifier: "",
    loading: false
});

const onSubmit = async () =>
{
    try
    {
        state.loading = true;

        await repository.auth.requestPasswordReset({
            identifier: state.identifier,
        });

        await navigateTo({
            name: "reset-password-proceed",
            query: route.query
        });
    }
    finally
    {
        state.loading = false;
    }
};
</script>
