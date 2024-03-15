<template>
    <header class="text-center mb-8 flex flex-col space-y-2">
        <h2 class="text-3xl font-medium3">
            Create an account
        </h2>
        <p class="text-gray-400">
            Already have an account?
            <ULink :to="{ name: 'login' }" class="text-primary hover:text-primary-300">
                Sign in!
            </ULink>
        </p>
    </header>
    <UForm :schema="schema" :state="state" class="w-96 space-y-8" validate-on="submit" @submit="onSubmit">
        <UFormGroup label="Ussername" name="username">
            <UInput v-model="state.username" placeholder="Enter your username" />
        </UFormGroup>

        <UFormGroup label="Email" name="email">
            <UInput v-model="state.email" placeholder="Enter your email" />
        </UFormGroup>

        <UFormGroup label="Password" name="password">
            <UInput v-model="state.password" type="password" placeholder="Enter your password" />
        </UFormGroup>

        <UFormGroup label="Password confirmation" name="passwordConfirm">
            <UInput v-model="state.passwordConfirm" type="password" placeholder="Confirm your password" />
        </UFormGroup>

        <UButton type="submit" block>
            Submit
        </UButton>

        <UDivider />

        <p class="text-sm text-gray-400 text-center">
            By signing up, you agree to our
            <ULink :to="{ name: 'home' }" class="text-primary hover:text-primary-300">
                Terms of Service.
            </ULink>
        </p>
    </UForm>
</template>

<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

const schema = z
    .object({
        username: z.string(),
        email: z.string().email("Invalid email"),
        password: z.string().min(8, "Must be at least 8 characters"),
        passwordConfirm: z.string()
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
