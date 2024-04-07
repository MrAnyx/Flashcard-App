<template>
    <div class="h-screen w-full grid place-items-center">
        <UCard>
            <div class="flex flex-col space-y-6">
                <div class="grid place-items-center">
                    <ULink to="/">
                        <img src="@/assets/images/logo.svg" alt="Image" height="75" width="75">
                    </ULink>
                </div>

                <!-- <NuxtPage :transition="{ 'name': 'auth', mode: 'out-in' }" /> -->
                <slot name="default" />

                <UDivider :ui="{border: {base: 'dark:border-gray-700'}}" />

                <p class="text-sm text-gray-400 text-center">
                    {{ $t('authentication.termsOfUseText') }}
                    <ULink to="/app" class="text-primary hover:text-primary-300">
                        {{ $t('authentication.termsOfUse') }}
                    </ULink>
                </p>
            </div>
        </UCard>
    </div>
</template>

<style>
/* .auth-enter-active,
.auth-leave-active {
    transition: all .15s;
}

.auth-enter-from,
.auth-leave-to {
    opacity: 0;
    transform: translateX(20px);
} */
</style>
