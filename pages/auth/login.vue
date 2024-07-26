<template>
    <div>
        <header class="text-center mb-8 flex flex-col space-y-2">
            <h2 class="text-3xl font-medium3">
                {{ $t('authentication.login.title') }}
            </h2>
            <p class="text-gray-400">
                {{ $t('authentication.login.subtitle') }}
                <ULink
                    :to="{ name: 'register', query: route.query }"
                    class="text-primary hover:text-primary-300"
                >
                    {{ $t('authentication.register.action') }}
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
                    :label="$t('authentication.login.identifier.label')"
                    name="identifier"
                >
                    <UInput
                        v-model="formData.identifier"
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
                        v-model="formData.password"
                        type="password"
                        :placeholder="$t('authentication.login.password.placeholder')"
                        icon="i-heroicons-lock-closed"
                    />
                </UFormGroup>
            </div>

            <UButton
                type="submit"
                block
                :loading="formProvider.loadingForm"
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
});

useHead({
    title: "Se sonnecter"
});

const authStore = useAuthStore();
const repository = useRepository();
const validationRule = useValidationRule();
const route = useRoute();

const schema = z.object({
    identifier: validationRule.identifier,
    password: validationRule.password
});

const formProvider = reactive({
    loadingForm: false
});

const formData = reactive({
    identifier: "",
    password: "",
});

const onSubmit = async () =>
{
    try
    {
        formProvider.loadingForm = true;

        const data = await repository.auth.login({
            identifier: formData.identifier,
            password: formData.password
        });

        authStore.login(data.data);

        if (route.query.forward)
        {
            await navigateTo(route.query.forward as string);
        }
        else
        {
            await navigateTo({ name: "dashboard" });
        }
    }
    finally
    {
        formProvider.loadingForm = false;
    }
};
</script>
