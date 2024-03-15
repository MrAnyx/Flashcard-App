<template>
    <div class="h-screen w-full grid place-items-center">
        <UCard>
            <div class="grid place-items-center mb-5">
                <ULink :to="{ name: 'home' }">
                    <img src="@/assets/images/logo.svg" alt="Image" height="75" width="75">
                </ULink>
            </div>
            <NuxtPage />
        </UCard>
    </div>
</template>
