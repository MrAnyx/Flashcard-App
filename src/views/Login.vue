<template>
    <div id="container">
        <Card class="w-11 md:w-8 lg:w-6 xl:w-4">
            <template #content>
                <form @submit.prevent="onSubmit">
                    <div class="text-center mb-5">
                        <RouterLink to="/">
                            <img src="../assets/images/logo.svg" alt="Image" height="50" class="mb-3" />
                        </RouterLink>
                        <div class="text-900 text-3xl font-medium mb-3">Welcome Back</div>
                        <span class="text-600 font-medium line-height-3">Don't have an account?</span>
                        <a class="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Create today!</a>
                    </div>

                    <div>
                        <div class="flex flex-column gap-4">
                            <!-- <InlineMessage v-if="$v.$error" severity="error">Error Message</InlineMessage> -->
                            <div class="flex flex-column gap-2">
                                <label for="username">Email or username</label>
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
                            <div class="flex align-items-center justify-content-between">
                                <div class="flex align-items-center">
                                    <Checkbox input-id="rememberme1" :disabled="isFormLoading" :binary="true" v-model="formInputs.rememberMe" class="mr-2"></Checkbox>
                                    <label for="rememberme1">Remember me</label>
                                </div>
                                <a class="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Forgot password?</a>
                            </div>
                        </div>

                        <Button type="submit" label="Sign In" icon="pi pi-user" class="w-full mt-6" :loading="isFormLoading"></Button>
                    </div>
                </form>
            </template>
        </Card>
    </div>
</template>

<script setup lang="ts">
import InputText from "primevue/inputtext";
import Checkbox from "primevue/checkbox";
import Button from "primevue/button";
import Card from "primevue/card";
import { computed, onUnmounted, reactive, ref } from "vue";
import { RouterLink } from "vue-router";
import Password from "primevue/password";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import axios from "@/plugins/axios";
import type { LoginRequest } from "@/types/auth.d";
import { AxiosResponse } from "axios";

const isFormLoading = ref(false);
const controller = new AbortController();

const formInputs = reactive({
    rememberMe: true,
    username: "",
    password: "",
});

const formInputsRules = computed(() => ({
    username: {
        required,
    },
    password: {
        required,
    },
}));

const $v = useVuelidate(formInputsRules, formInputs);

const onSubmit = async () => {
    isFormLoading.value = true;
    const isValid = await $v.value.$validate();
    if (!isValid) return;

    axios
        .post<LoginRequest>(
            "/auth/login",
            {
                identifier: formInputs.username,
                password: formInputs.password,
            },
            {
                signal: controller.signal,
            }
        )
        .then((res: AxiosResponse) => {
            console.log(res.data);
        })
        .finally(() => {
            isFormLoading.value = false;
        });
};

onUnmounted(() => {
    controller.abort();
});
</script>

<style lang="scss">
#container {
    height: 100vh;
    width: 100%;
    display: grid;
    place-items: center;
}
</style>
