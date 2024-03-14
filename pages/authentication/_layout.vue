<template>
    <div id="container">
        <UCard>
            <div class="text-center mb-5">
                <NuxtLink :to="{ name: 'home' }">
                    <img src="@/assets/images/logo.svg" alt="Image" class="h-24">
                </NuxtLink>
                <div class="text-900 text-3xl font-medium mb-3">
                    Welcome Back
                </div>
                <span class="">Don't have an account?</span>
                <ULink
                    :to="{ name: 'register' }"
                    active-class="text-primary"
                    inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                >
                    Link
                </ULink>
            </div>
            <NuxtPage />
        </UCard>
    </div>
</template>

<style lang="scss" scoped>
#container {
    height: 100vh;
    width: 100%;
    display: grid;
    place-items: center;
}
</style>
