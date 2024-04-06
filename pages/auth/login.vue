<template>
    <div>
        <header class="text-center mb-8 flex flex-col space-y-2">
            <h2 class="text-3xl font-medium3">
                {{ $t('authentication.login.title') }}
            </h2>
            <p class="text-gray-400">
                {{ $t('authentication.login.subtitle') }}
                <ULink to="/auth/register" class="text-primary hover:text-primary-300">
                    {{ $t('authentication.register.action') }}
                </ULink>
            </p>
        </header>
        <UForm :schema="schema" :state="state" class="space-y-8" :validate-on="['submit']" @submit="onSubmit">
            <div class="flex flex-col space-y-4">
                <UFormGroup :label="$t('authentication.login.identifier.label')" name="email">
                    <UInput
                        v-model="state.email"
                        :placeholder="$t('authentication.login.identifier.placeholder')"
                        icon="i-heroicons-envelope"
                    />
                </UFormGroup>

                <UFormGroup :label="$t('authentication.login.password.label')" name="password" class="">
                    <template #hint>
                        <ULink to="/app" class="text-primary hover:text-primary-300">
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

            <UButton type="submit" block>
                {{ $t('authentication.login.action') }}
            </UButton>
        </UForm>
    </div>
</template>

<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

definePageMeta({
    layout: "auth"
});

const schema = z.object({
    email: z.string()
        .email("Invalid email")
        .max(180, "Email is too long"),
    password: z.string()
        .min(8, "Password is too short")
});

type Schema = z.output<typeof schema>

const state = reactive<Schema>({
    email: "",
    password: ""
});

const onSubmit = (event: FormSubmitEvent<Schema>) => {
    // Do something with data
    console.log(event);
};
</script>
