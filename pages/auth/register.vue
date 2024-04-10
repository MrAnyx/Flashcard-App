<template>
    <div>
        <header class="text-center mb-8 flex flex-col space-y-2">
            <h2 class="text-3xl font-medium3">
                {{ $t('authentication.register.title') }}
            </h2>
            <p class="text-gray-400">
                {{ $t('authentication.register.subtitle') }}
                <ULink to="/auth/login" class="text-primary hover:text-primary-300">
                    {{ $t('authentication.login.action') }}
                </ULink>
            </p>
        </header>
        <UForm :schema="schema" :state="state" class="space-y-8" :validate-on="['submit']" @submit="onSubmit">
            <div class="flex flex-col space-y-4">
                <UFormGroup :label="$t('authentication.register.username.label')" name="username">
                    <UInput
                        v-model="state.username"
                        :placeholder="$t('authentication.register.username.placeholder')"
                        icon="i-heroicons-user"
                    />
                </UFormGroup>

                <UFormGroup :label="$t('authentication.register.email.label') " name="email">
                    <UInput
                        v-model="state.email"
                        :placeholder="$t('authentication.register.email.placeholder')"
                        icon="i-heroicons-envelope"
                    />
                </UFormGroup>

                <UFormGroup :label="$t('authentication.register.password.label')" name="password">
                    <UInput
                        v-model="state.password"
                        type="password"
                        :placeholder="$t('authentication.register.password.placeholder')"
                        icon="i-heroicons-lock-closed"
                    />
                </UFormGroup>

                <UFormGroup :label="$t('authentication.register.passwordConf.label')" name="passwordConfirm">
                    <UInput
                        v-model="state.passwordConfirm"
                        type="password"
                        :placeholder="$t('authentication.register.passwordConf.placeholder')"
                        icon="i-heroicons-lock-closed"
                    />
                </UFormGroup>
            </div>

            <UButton type="submit" block>
                {{ $t('authentication.register.action') }}
            </UButton>
        </UForm>
    </div>
</template>

<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

definePageMeta({
    layout: "auth",
    name: "register"
});

// Form definition
const schema = z
    .object({
        username: z
            .string()
            .min(1, "Username can not be blank")
            .max(30, "Username is too long")
            .regex(/^[\w-.]*$/, "Username contains invalid characters"),
        email: z
            .string()
            .email("Invalid email")
            .min(1, "Email can not be blank")
            .max(180, "Email is too long"),
        password: z.string()
            .min(8, "Password is too short"),
        passwordConfirm: z.string()
            .min(8, "Password is too short")
    })
    .refine(({ password, passwordConfirm }) => password === passwordConfirm, {
        message: "Passwords don't match",
        path: ["passwordConfirm"] // path of error
    });

type Schema = z.output<typeof schema>

const state = reactive<Schema>({
    username: "",
    email: "",
    password: "",
    passwordConfirm: ""
});

const onSubmit = (event: FormSubmitEvent<Schema>) => {
    // Do something with data
    console.log(event);
};
</script>
