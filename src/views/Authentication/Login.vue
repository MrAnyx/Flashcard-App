<template>
    <div id="container">
        <Card class="w-11 md:w-8 lg:w-6 xl:w-4">
            <template #content>
                <form @submit.prevent="onSubmit">
                    <div class="text-center mb-5">
                        <RouterLink :to="{ name: 'home' }">
                            <img src="../../assets/images/logo.svg" alt="Image" height="50" class="mb-3" />
                        </RouterLink>
                        <div class="text-900 text-3xl font-medium mb-3">
                            Welcome Back
                        </div>
                        <span class="text-600 font-medium line-height-3">Don't have an account?</span>
                        <RouterLink :to="{ name: 'register' }" class="font-medium no-underline ml-2 text-blue-500 cursor-pointer">
                            Sign Up!
                        </RouterLink>
                    </div>

                    <div>
                        <div class="flex flex-column gap-4">
                            <!-- <InlineMessage v-if="$v.$error" severity="error">Error Message</InlineMessage> -->
                            <div class="flex flex-column gap-2">
                                <label for="identifier">Email or username</label>
                                <InputText id="identifier" :disabled="isFormLoading" :class="{ 'p-invalid': $v.identifier.$error }" v-model="formInputs.identifier" />
                                <small class="p-error" v-if="$v.identifier.$error">{{ $v.identifier.$errors[0].$message }}</small>
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
                            <div class="flex align-items-center justify-content-between">
                                <a class="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Forgot password?</a>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            label="Sign In"
                            icon="pi pi-user"
                            class="w-full mt-6"
                            :loading="isFormLoading"
                            :disabled="isFormLoading"
                        ></Button>
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
import { required } from "@vuelidate/validators";
import axios from "@/plugins/axios";
import { useToast } from "primevue/usetoast";
import { useUserStore } from "@/stores/user.store";
import { User } from "@/types/user.d";

// Form initialization
const isFormLoading = ref(false);
const formInputs = reactive({
    identifier: "",
    password: "",
});

const formInputsRules = computed(() => ({
    identifier: {
        required,
    },
    password: {
        required,
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
        .post<User>("/auth/login", {
            identifier: formInputs.identifier,
            password: formInputs.password
        })
        .then((response) => {
            userStore.user = response.data;
            router.push({ name: "home" });
        })
        .catch(() => {
            toast.add({ severity: "error", summary: "Authentication", detail: "Invalid credentials", life: 5000 });
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
