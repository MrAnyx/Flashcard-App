<template>
    <div>
        <header class="text-center mb-8 flex flex-col space-y-2">
            <h2 class="text-3xl font-medium3">
                {{ $t('authentication.register.title') }}
            </h2>
            <p class="text-gray-400">
                {{ $t('authentication.register.subtitle') }}
                <ULink
                    to="/auth/login"
                    class="text-primary hover:text-primary-300"
                >
                    {{ $t('authentication.login.action') }}
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
                    :label="$t('authentication.register.username.label')"
                    name="username"
                >
                    <UInput
                        v-model="state.username"
                        autofocus
                        :placeholder="$t('authentication.register.username.placeholder')"
                        icon="i-heroicons-user"
                    />
                </UFormGroup>

                <UFormGroup
                    :label="$t('authentication.register.email.label') "
                    name="email"
                >
                    <UInput
                        v-model="state.email"
                        :placeholder="$t('authentication.register.email.placeholder')"
                        icon="i-heroicons-envelope"
                    />
                </UFormGroup>

                <UFormGroup
                    :label="$t('authentication.register.password.label')"
                    name="password"
                >
                    <UInput
                        v-model="state.password"
                        type="password"
                        :placeholder="$t('authentication.register.password.placeholder')"
                        icon="i-heroicons-lock-closed"
                    />
                </UFormGroup>

                <UFormGroup
                    :label="$t('authentication.register.passwordConf.label')"
                    name="passwordConfirm"
                >
                    <UInput
                        v-model="state.passwordConfirm"
                        type="password"
                        :placeholder="$t('authentication.register.passwordConf.placeholder')"
                        icon="i-heroicons-lock-closed"
                    />
                </UFormGroup>
            </div>

            <UButton
                type="submit"
                block
                :loading="state.loading"
            >
                {{ $t('authentication.register.action') }}
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
    name: "register",
    middleware: "is-not-connected"
});

const authStore = useAuthStore();
const repository = useRepository();
const validationRule = useValidationRule();

// Form definition
const schema = z
    .object({
        username: validationRule.username,
        email: validationRule.email,
        password: validationRule.password,
        passwordConfirm: validationRule.password
    })
    .refine(({ password, passwordConfirm }) => password === passwordConfirm, {
        message: "Passwords don't match",
        path: ["passwordConfirm"] // path of error
    });

const state = reactive({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
    loading: false
});

const onSubmit = async () =>
{
    try
    {
        state.loading = true;

        const data = await repository.auth.register({
            username: state.username,
            email: state.email,
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
