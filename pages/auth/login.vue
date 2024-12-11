<template>
    <NuxtLayout name="auth">
        <template #header>
            <AuthHeader title="Welcome back">
                <template #subtitle>
                    Don't have an account?
                    <ULink
                        :to="{ name: 'register', query: route.query }"
                        class="text-primary hover:text-primary-300"
                    >
                        Sign up
                    </ULink>
                </template>
            </AuthHeader>
        </template>

        <UForm
            :schema="schema"
            :state="formData"
            class="space-y-6"
            :validate-on="['submit']"
            @submit="onSubmit"
        >
            <UFormGroup
                required
                label="Email or username"
                name="identifier"
            >
                <UInput
                    v-model="formData.identifier"
                    autofocus
                    placeholder="Enter your email or username"
                    icon="i-tabler-mail"
                />
            </UFormGroup>

            <UFormGroup
                required
                label="Password"
                name="password"
            >
                <template #hint>
                    <ULink
                        :to="{ name: 'reset-password-request', query: route.query }"
                        class="text-primary hover:text-primary-300"
                    >
                        Forgot password?
                    </ULink>
                </template>
                <UInput
                    v-model="formData.password"
                    type="password"
                    placeholder="Enter your password"
                    icon="i-tabler-lock"
                />
            </UFormGroup>

            <UButton
                type="submit"
                block
                :loading="formProvider.loadingForm"
            >
                Login
            </UButton>
        </UForm>

        <template #footer>
            <AuthAcceptTermsOfUse class="text-center" />
        </template>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { z } from "zod";

definePageMeta({
    name: "login",
    middleware: ["guest"]
});

useHead({
    title: "Login"
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
            rawPassword: formData.password
        });

        authStore.login(data);

        await redirectToForwardedRoute("overview");
    }
    finally
    {
        formProvider.loadingForm = false;
    }
};
</script>
