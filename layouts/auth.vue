<template>
    <div class="h-screen w-full grid place-items-center">
        <UCard class="max-w-[500px] w-full">
            <div class="flex flex-col space-y-6">
                <div class="grid place-items-center">
                    <ULink to="/">
                        <img
                            src="@/assets/images/logo.svg"
                            alt="Image"
                            height="75"
                            width="75"
                        >
                    </ULink>
                </div>

                <!-- <NuxtPage :transition="{ 'name': 'auth', mode: 'out-in' }" /> -->
                <slot name="default" />
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
