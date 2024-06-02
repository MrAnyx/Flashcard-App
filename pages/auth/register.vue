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
        username: z
            .string()
            .min(1, "Username can not be blank")
            .max(30, "Username is too long")
            .regex(Regex.Username, "Username contains invalid characters"),
        email: z
            .string()
            .email("Invalid email")
            .min(1, "Email can not be blank")
            .max(180, "Email is too long"),
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
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
    loading: false
});

const authStore = useAuthStore();

const onSubmit = async () => {
    state.loading = true;
    const { data, error } = await useApi<User>("/auth/register", {
        method: "POST",
        body: {
            username: state.username,
            email: state.email,
            password: state.password
        }
    });

    if (!error.value) {
        authStore.user = data.value!.data;
        navigateTo({ name: "dashboard" });
    } else if (error.value.statusCode === 400) {
        useStandardToast("error", {
            description: "Unable to create an account given this form."
        });
    } else {
        useStandardToast("error");
    }
    state.loading = false;
};
</script>
