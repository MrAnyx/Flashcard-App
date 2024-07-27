<template>
    <Loader />
</template>

<script lang="ts" setup>
definePageMeta({
    name: "initialize"
});

const route = useRoute();
const router = useRouter();
const applicationStore = useApplicationStore();
const repository = useRepository();
const authStore = useAuthStore();

onMounted(async () =>
{
    await initialize();
});

const initialize = async () =>
{
    try
    {
        const user = await repository.user.getMe();
        authStore.login(user.data);

        setTimeout(() =>
        {
            applicationStore.initialized = true;
            return navigateTo(route.query.forward as string ?? router.resolve("landing").href);
        }, 1000);
    }
    catch
    {
        useStandardToast("error", {
            description: "An error occured while initializing the data"
        });
    }
};
</script>
