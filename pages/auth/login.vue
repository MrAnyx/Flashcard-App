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
                <UFormGroup :label="$t('authentication.login.identifier.label')" name="identifier">
                    <UInput
                        v-model="state.identifier"
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
import type { User } from "~/types/entity";

definePageMeta({
    layout: "auth",
    name: "login",
    middleware: "is-not-connected"
});

useHead({
    title: "Se sonnecter"
});

const toast = useToast();
const authStore = useAuthStore();
const router = useRouter();

const schema = z.object({
    identifier: z.string()
        .max(180, "Identifier is too long"),
    password: z.string()
        .min(8, "Password is too short")
});

type Schema = z.output<typeof schema>

const state = reactive<Schema>({
    identifier: "",
    password: ""
});

const onSubmit = async () => {
    const { data, error } = await useApi<User>("/auth/login", {
        method: "POST",
        body: {
            identifier: state.identifier,
            password: state.password
        }
    });

    if (!error.value) {
        authStore.user = data.value!.data;
        router.push("/app");
    } else if (error.value.statusCode === 401) {
        // 401 Exception
        toast.add({
            title: "Invalid credentials",
            description: "Invalid identifier or password",
            color: "red"
        });
    } else {
        toast.add({
            title: "Error",
            description: "An error occured, try again or contact an adinistrator",
            color: "red"
        });
    }
};
</script>
