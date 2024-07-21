<template>
    <div>
        <header class="text-center mb-8 flex flex-col space-y-2">
            <h2 class="text-3xl font-medium3">
                {{ $t('authentication.login.title') }}
            </h2>
            <p class="text-gray-400">
                {{ $t('authentication.login.subtitle') }}
                <ULink
                    to="/auth/register"
                    class="text-primary hover:text-primary-300"
                >
                    {{ $t('authentication.register.action') }}
                </ULink>
            </p>
        </header>
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

                <UFormGroup
                    :label="$t('authentication.login.password.label')"
                    name="password"
                    class=""
                >
                    <template #hint>
                        <ULink
                            :to="{ name: 'reset-password-request' }"
                            class="text-primary hover:text-primary-300"
                        >
                            {{ $t('authentication.login.password.forgotPassword') }}
                        </ULink>
                    </template>
                    <UInput
                        v-model="state.password"
                        type="password"
                        :placeholder="$t('authentication.login.password.placeholder')"
                        icon="i-heroicons-lock-closed"
                    />
                </UFormGroup>
            </div>

            <UButton
                type="submit"
                block
                :loading="state.loading"
            >
                {{ $t('authentication.login.action') }}
            </UButton>

            <UDivider
                :ui="{ border: { base: 'dark:border-gray-700' } }"
            />

            <p class="text-sm text-gray-400 text-center">
                {{ $t('authentication.termsOfUseText') }}
                <ULink
                    to="/app"
                    class="text-primary hover:text-primary-300"
                >
                    {{ $t('authentication.termsOfUse') }}
                </ULink>
            </p>
        </UForm>
    </div>
</template>

<script setup lang="ts">
import { z } from "zod";

definePageMeta({
    layout: "auth",
    name: "login",
    middleware: "is-not-connected"
});

useHead({
    title: "Se sonnecter"
});

const authStore = useAuthStore();
const repository = useRepository();
const validationRule = useValidationRule();

const schema = z.object({
    identifier: validationRule.identifier,
    password: validationRule.password
});

const state = reactive({
    identifier: "",
    password: "",
    loading: false
});

const onSubmit = async () =>
{
    try
    {
        state.loading = true;

        const data = await repository.auth.login({
            identifier: state.identifier,
            password: state.password
        });

        authStore.user = data.data;
        navigateTo({ name: "dashboard" });
    }
    finally
    {
        state.loading = false;
    }
};
</script>
