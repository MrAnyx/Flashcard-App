<template>
    <Loader />
</template>

<script lang="ts" setup>
definePageMeta({
    name: "initialize"
});

const applicationStore = useApplicationStore();
const route = useRoute();
const router = useRouter();

onMounted(async () =>
{
    await initializeData();

    applicationStore.initialized = true;
    await navigateTo(route.query.forward as string ?? router.resolve("landing").href);

    // toast on error
});
</script>
