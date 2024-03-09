<template>
    <div id="container">
        <Card class="w-11 md:w-8 lg:w-6 xl:w-4">
            <template #content>
                <form @submit.prevent="onSubmit">
                    <div class="text-center mb-5">
                        <RouterLink :to="{ name: 'home' }">
                            <img src="../../assets/images/logo.svg" alt="Image" height="50" class="mb-3" />
                        </RouterLink>
                        <div class="text-900 text-3xl font-medium mb-3">Create an account</div>
                        <span class="text-600 font-medium line-height-3">Already a member?</span>
                        <RouterLink :to="{ name: 'login' }" class="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Sign In</RouterLink>
                    </div>

                    <div>
                        <div class="flex flex-column gap-4">
                            <div class="flex flex-column gap-2">
                                <label for="email">Email</label>
                                <InputText id="email" type="email" :disabled="isFormLoading" :class="{ 'p-invalid': $v.email.$error }" v-model="formInputs.email" />
                                <small class="p-error" v-if="$v.email.$error">{{ $v.email.$errors[0].$message }}</small>
                            </div>
                            <div class="flex flex-column gap-2">
                                <label for="username">Username</label>
                                <InputText id="username" :disabled="isFormLoading" :class="{ 'p-invalid': $v.username.$error }" v-model="formInputs.username" />
                                <small class="p-error" v-if="$v.username.$error">{{ $v.username.$errors[0].$message }}</small>
                            </div>
                            <div class="flex flex-column gap-2">
                                <label for="password1" placeholder="Email address">Password</label>
                                <Password
                                    id="password1"
                                    :disabled="isFormLoading"
                                    v-model="formInputs.password"
                                    toggle-mask
                                    :feedback="false"
                                    :input-class="['w-full', { 'p-invalid': $v.password.$error }]"
                                />
                                <small class="p-error" v-if="$v.password.$error">{{ $v.password.$errors[0].$message }}</small>
                            </div>
                            <div class="flex flex-column gap-2">
                                <label for="password2" placeholder="Email address">Password confirmation</label>
                                <Password
                                    id="password2"
                                    :disabled="isFormLoading"
                                    v-model="formInputs.passwordConfirm"
                                    toggle-mask
                                    :feedback="false"
                                    :input-class="['w-full', { 'p-invalid': $v.passwordConfirm.$error }]"
                                />
                                <small class="p-error" v-if="$v.passwordConfirm.$error">{{ $v.passwordConfirm.$errors[0].$message }}</small>
                            </div>
                        </div>

                        <Button type="submit" label="Sign up" icon="pi pi-user" class="w-full mt-6" :loading="isFormLoading" :disabled="isFormLoading"></Button>
                    </div>
                </form>
            </template>
        </Card>
    </div>
</template>

<script setup lang="ts">
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Card from "primevue/card";
import { computed, reactive, ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import Password from "primevue/password";
import { useVuelidate } from "@vuelidate/core";
import { required, email, helpers, sameAs } from "@vuelidate/validators";
import axios from "@/plugins/axios";
import { useToast } from "primevue/usetoast";
import { useUserStore } from "@/stores/user.store";
import { User } from "@/types/user.d";
import { passwordVeryString } from "@/validation";
import { PasswordStrength } from "@/services/password";

// Form initialization
const isFormLoading = ref(false);
const formInputs = reactive({
    email: "",
    username: "",
    password: "",
    passwordConfirm: "",
});

const formInputsRules = computed(() => ({
    email: {
        required,
        email,
    },
    username: {
        required,
    },
    password: {
        required,
        passwordStrong: helpers.withMessage("Choose a stronger password", passwordVeryString(PasswordStrength.STRENGTH_MEDIUM)),
    },
    passwordConfirm: {
        required,
        same: sameAs(formInputs.password),
    },
}));

const $v = useVuelidate(formInputsRules, formInputs);

// Form validation
const userStore = useUserStore();
const toast = useToast();
const router = useRouter();

const onSubmit = async () => {
    isFormLoading.value = true;
    const isValid = await $v.value.$validate();
    if (!isValid) {
        isFormLoading.value = false;
        return;
    }

    axios
        .post<User>("/auth/register", {
            email: formInputs.email,
            username: formInputs.username,
            password: formInputs.password,
        })
        .then((response) => {
            userStore.user = response.data;
            toast.add({ severity: "info", summary: "Welcome", detail: `Hi ${userStore.user.username}, create your first flashcard and start learning !`, life: 5000 });
            router.push({ name: "home" });
        })
        .catch(() => {
            toast.add({ severity: "error", summary: "Bad request", detail: "Invalid form", life: 5000 });
        })
        .finally(() => {
            isFormLoading.value = false;
        });
};
</script>

<style lang="scss">
#container {
    height: 100vh;
    width: 100%;
    display: grid;
    place-items: center;
}
</style>
