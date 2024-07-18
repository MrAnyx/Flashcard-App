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
import type { User } from "@/types/entity";

definePageMeta({
    layout: "auth",
    name: "register",
    middleware: "is-not-connected"
});

// Form definition
const schema = z
    .object({
        token: z
            .string()
            .min(1, "Username can not be blank"),
        password: z
            .string()
            .min(8, "Password is too short")
            .regex(Regex.Password, "Password isn't valid"),
        passwordConfirm: z
            .string()
    })
    .refine(({ password, passwordConfirm }) => password === passwordConfirm, {
        message: "Passwords don't match",
        path: ["passwordConfirm"] // path of error
    });

const state = reactive({
    token: "",
    password: "",
    passwordConfirm: "",
    loading: false
});

const authStore = useAuthStore();

const onSubmit = async () =>
{
    state.loading = true;
    const { data, error } = await useApi<User>("/auth/register", {
        method: "POST",
        body: {
            username: state.username,
            email: state.email,
            password: state.password
        }
    });

    if (!error.value)
    {
        authStore.user = data.value!.data;
        navigateTo({ name: "dashboard" });
    }
    else if (error.value.statusCode === 400)
    {
        useStandardToast("error", {
            description: "Unable to create an account given this form."
        });
    }
    else
    {
        useStandardToast("error");
    }
    state.loading = false;
};
</script>
