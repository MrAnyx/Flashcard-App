<template>
    <div id="container">
        <Card class="w-11 md:w-8 lg:w-6 xl:w-4">
            <template #content>
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
                        <div class="flex flex-column gap-2">
                            <label for="username">Email or username</label>
                            <InputText id="username" v-model="username" />
                        </div>
                        <div class="flex flex-column gap-2">
                            <label for="password1" placeholder="Email address">Password</label>
                            <Password id="password1" v-model="password" toggle-mask :feedback="false" input-class="w-full" />
                        </div>
                        <div class="flex align-items-center justify-content-between">
                            <div class="flex align-items-center">
                                <Checkbox input-id="rememberme1" :binary="true" v-model="rememberMe" class="mr-2"></Checkbox>
                                <label for="rememberme1">Remember me</label>
                            </div>
                            <a class="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Forgot password?</a>
                        </div>
                    </div>

                    <Button label="Sign In" icon="pi pi-user" class="w-full mt-6"></Button>
                </div>
            </template>
        </Card>
    </div>
</template>

<script setup lang="ts">
import InputText from "primevue/inputtext";
import Checkbox from "primevue/checkbox";
import Button from "primevue/button";
import Card from "primevue/card";
import { ref } from "vue";
import { RouterLink } from "vue-router";
import Password from "primevue/password";

const rememberMe = ref(true);
const username = ref("");
const password = ref("");
</script>

<style lang="scss">
#container {
    height: 100vh;
    width: 100%;
    display: grid;
    place-items: center;
}
</style>
