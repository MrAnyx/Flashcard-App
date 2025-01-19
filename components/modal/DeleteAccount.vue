<template>
    <BaseModal title="Delete my account">
        <UForm
            :schema="schema"
            :state="state"
            class="flex flex-col gap-y-6"
            :validate-on="['submit']"
            @submit="onSubmit"
        >
            <div class="flex flex-col space-y-4 c-text-primary">
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
    </BaseModal>
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

        await navigateTo({
            name: "landing"
        });
    }
    finally
    {
        state.loading = false;
    }
};
</script>
