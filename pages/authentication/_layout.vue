<template>
    <div class="h-screen w-full grid place-items-center">
        <UCard>
            <div class="flex flex-col space-y-6">
                <div class="grid place-items-center">
                    <ULink :to="{ name: 'home' }">
                        <img src="@/assets/images/logo.svg" alt="Image" height="75" width="75">
                    </ULink>
                </div>

                <NuxtPage
                    :transition="{'name': 'auth', mode:'out-in'}"
                />

                <UDivider />

                <p class="text-sm text-gray-400 text-center">
                    By clicking the button, you agree to our
                    <ULink :to="{ name: 'home' }" class="text-primary hover:text-primary-300">
                        Terms of Service.
                    </ULink>
                </p>
            </div>
        </UCard>
    </div>
</template>

<style lang="scss">
.auth-enter-active,
.auth-leave-active {
    transition: all .15s;
}

.auth-enter-from,
.auth-leave-to {
    opacity: 0;
    transform: translateX(20px);
}
</style>
