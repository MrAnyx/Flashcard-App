<template>
    <Loader />
</template>

<script lang="ts" setup>
const route = useRoute();
const router = useRouter();

console.log(router.resolve("login").href);

const routeToRedirect = route.query.forward ?? "/";
</script>
