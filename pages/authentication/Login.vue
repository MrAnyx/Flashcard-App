<template>
    <header class="text-center mb-8 flex flex-col space-y-2">
        <h2 class="text-3xl font-medium3">
            Welcome Back
        </h2>
        <p class="text-gray-400">
            Don't have an account?
            <ULink :to="{ name: 'register' }" class="text-primary hover:text-primary-300">
                Sign up!
            </ULink>
        </p>
    </header>
    <UForm :schema="schema" :state="state" class="w-96 space-y-8" validate-on="submit" @submit="onSubmit">
        <UFormGroup label="Email or username" name="email">
            <UInput v-model="state.email" placeholder="Enter your email or username" />
        </UFormGroup>

        <UFormGroup label="Password" name="password" class="">
            <template #hint>
                <ULink :to="{ name: 'home' }" class="text-primary hover:text-primary-300">
                    Forgot password?
                </ULink>
            </template>
            <UInput v-model="state.password" type="password" placeholder="Enter your password" />
        </UFormGroup>

        <UButton type="submit" block>
            Submit
        </UButton>

        <UDivider />

        <p class="text-sm text-gray-400 text-center">
            By signing in, you agree to our
            <ULink :to="{ name: 'home' }" class="text-primary hover:text-primary-300">
                Terms of Service.
            </ULink>
        </p>
    </UForm>
</template>

<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

const schema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Must be at least 8 characters")
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
