<template>
    <div>
        <header class="text-center mb-8 flex flex-col space-y-2">
            <h2 class="text-3xl font-medium3">
                Oups, I forgot my password
            </h2>
        </header>

        <p class="text-gray-400 mb-8 leading-loose">
            Fear not. Enter your email or username and we'll send an email with the instructions to reset your password.
        </p>
        <UForm
            :schema="schema"
            :state="state"
            class="space-y-8"
            :validate-on="['submit']"
            @submit="onSubmit"
        >
            <div class="flex flex-col space-y-4">
                <UFormGroup
                    :label="$t('authentication.login.identifier.label')"
                    name="identifier"
                >
                    <UInput
                        v-model="state.identifier"
                        autofocus
                        :placeholder="$t('authentication.login.identifier.placeholder')"
                        icon="i-heroicons-envelope"
                    />
                </UFormGroup>
            </div>

            <UButton
                type="submit"
                block
                :loading="state.loading"
            >
                Reset password
            </UButton>

            <UDivider
                :ui="{ border: { base: 'dark:border-gray-700' } }"
            />

            <p class="text-sm text-gray-400 text-center">
                Go back to the
                <ULink
                    to="/auth/login"
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
    name: "reset-password-request",
});

useHead({
    title: "Reset my password"
});

const repository = useRepository();
const validationRule = useValidationRule();

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

        navigateTo({
            name: "reset-password-proceed"
        });
    }
    finally
    {
        state.loading = false;
    }
};
</script>
