<template>
    <UModal prevent-close>
        <UCard>
            <template #header>
                <div class="flex justify-between items-center">
                    <span class="font-medium">Delete my account</span>
                    <UButton
                        icon="i-heroicons-x-mark"
                        color="white"
                        variant="ghost"
                        @click="modal.close()"
                    />
                </div>
            </template>
            <UForm
                :schema="schema"
                :state="state"
                class="space-y-8"
                :validate-on="['submit']"
                @submit="onSubmit"
            >
                <div class="flex flex-col space-y-4">
                    <p>Deleting your account will remove all the data from the system. This operation <b class="text-red-500">can not be undone</b>.</p>
                    <p>Confirm your email to delete your account.</p>

                    <UFormGroup
                        label="Email"
                        name="email"
                    >
                        <UInput
                            v-model="state.email"
                            autofocus
                            placeholder="Confirm your email"
                        />
                    </UFormGroup>
                </div>

                <UButton
                    type="submit"
                    block
                    color="red"
                    :loading="state.loading"
                >
                    Confirm
                </UButton>
            </UForm>
        </UCard>
    </UModal>
</template>

<script setup lang="ts">
import { z } from "zod";

const modal = useModal();
const authStore = useAuthStore();
const repository = useRepository();
const validationRule = useValidationRule();

const schema = z
    .object({
        email: validationRule.email
    })
    .refine(({ email }) => email === authStore.user!.email, {
        message: "This email doesn't match your email",
        path: ["email"] // path of error
    });

const state = reactive({
    email: "",
    loading: false
});

const onSubmit = async () =>
{
    try
    {
        state.loading = true;

        await repository.user.deleteMe();

        useStandardToast("success", {
            description: "Your account has been deleted successfully"
        });

        authStore.logout();
        modal.close();

        navigateTo({
            name: "landing"
        });
    }
    finally
    {
        state.loading = false;
    }
};
</script>
