<template>
    <div class="flex flex-col space-y-8">
        <div>
            <h2 class="font-medium text-gray-200 text-xl">
                My profile
            </h2>
            <span class="text-gray-400 text-sm">Customize your personal informations</span>
        </div>
        <section>
            <div class="grid grid-cols-1 gap-3 lg:grid-cols-2 items-center">
                <div>
                    <h4>Email</h4>
                    <span class="text-gray-400 text-sm">Used to login and receive notifications</span>
                </div>
                <UInput value="example@mail.com" type="email" icon="i-heroicons-envelope" />
            </div>
            <div class="grid grid-cols-1 gap-3 lg:grid-cols-2 items-center mt-6">
                <div>
                    <h4>Username</h4>
                    <span class="text-gray-400 text-sm">Your unique identifier used to login</span>
                </div>
                <UInput value="MrAnyx" icon="i-heroicons-user" />
            </div>
            <div class="grid grid-cols-1 gap-3 lg:grid-cols-2 items-center mt-6">
                <div>
                    <h4>Password</h4>
                    <span class="text-gray-400 text-sm">Used to securely login to your account</span>
                </div>
                <div>
                    <UInput icon="i-heroicons-lock-closed" placeholder="Current password" class="mb-2" />
                    <UInput icon="i-heroicons-lock-closed" placeholder="New password" />
                </div>
            </div>
        </section>
        <UDivider />
        <div>
            <h2 class="font-medium text-gray-200 text-xl">
                My profile
            </h2>
            <span class="text-gray-400 text-sm">Customize your personal informations</span>
        </div>
        <section>
            <div class="grid grid-cols-1 gap-3 lg:grid-cols-2 items-center">
                <div>
                    <h4>Email</h4>
                    <span class="text-gray-400 text-sm">Used to login and receive notifications</span>
                </div>
                <UInput value="example@mail.com" type="email" icon="i-heroicons-envelope" />
            </div>
            <div class="grid grid-cols-1 gap-3 lg:grid-cols-2 items-center mt-6">
                <div>
                    <h4>Username</h4>
                    <span class="text-gray-400 text-sm">Your unique identifier used to login</span>
                </div>
                <UInput value="MrAnyx" icon="i-heroicons-user" />
            </div>
            <div class="grid grid-cols-1 gap-3 lg:grid-cols-2 items-center mt-6">
                <div>
                    <h4>Password</h4>
                    <span class="text-gray-400 text-sm">Used to securely login to your account</span>
                </div>
                <div>
                    <UInput icon="i-heroicons-lock-closed" placeholder="Current password" class="mb-2" />
                    <UInput icon="i-heroicons-lock-closed" placeholder="New password" />
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    alias: "/app/settings/account",
    name: "settings-account"
});

useHead({
    title: "Account"
});

</script>
