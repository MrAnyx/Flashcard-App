<template>
    <div>
        <header class="text-center mb-8 flex flex-col space-y-2">
            <h2 class="text-3xl font-medium3">
                {{ $t('authentication.register.title') }}
            </h2>
            <p class="text-gray-400">
                {{ $t('authentication.register.subtitle') }}
                <ULink
                    :to="{ name: 'login', query: route.query }"
                    class="text-primary hover:text-primary-300"
                >
                    {{ $t('authentication.login.action') }}
                </ULink>
            </p>
        </header>
        <UForm
            :schema="schema"
            :state="formData"
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
                        v-model="formData.username"
                        autofocus
                        :placeholder="$t('authentication.register.username.placeholder')"
                        icon="i-tabler-user"
                    />
                </UFormGroup>

                <UFormGroup
                    :label="$t('authentication.register.email.label') "
                    name="email"
                >
                    <UInput
                        v-model="formData.email"
                        :placeholder="$t('authentication.register.email.placeholder')"
                        icon="i-tabler-mail"
                    />
                </UFormGroup>

                <UFormGroup
                    :label="$t('authentication.register.password.label')"
                    name="password"
                >
                    <UInput
                        v-model="formData.password"
                        type="password"
                        :placeholder="$t('authentication.register.password.placeholder')"
                        icon="i-tabler-lock"
                    />
                </UFormGroup>

                <UFormGroup
                    :label="$t('authentication.register.passwordConf.label')"
                    name="passwordConfirm"
                >
                    <UInput
                        v-model="formData.passwordConfirm"
                        type="password"
                        :placeholder="$t('authentication.register.passwordConf.placeholder')"
                        icon="i-tabler-lock"
                    />
                </UFormGroup>
            </div>

            <UButton
                type="submit"
                block
                :loading="formProvider.loadingForm"
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
});

const authStore = useAuthStore();
const repository = useRepository();
const validationRule = useValidationRule();
const route = useRoute();

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

const formProvider = reactive({
    loadingForm: false
});

const formData = reactive({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
});

const onSubmit = async () =>
{
    try
    {
        formProvider.loadingForm = true;

        const data = await repository.auth.register({
            username: formData.username,
            email: formData.email,
            password: formData.password
        });

        authStore.login(data.data);
        navigateTo({ name: "overview" });
    }
    finally
    {
        formProvider.loadingForm = false;
    }
};
</script>
