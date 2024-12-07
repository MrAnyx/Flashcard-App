<template>
    <AuthFooter>
        Go back to the
        <ULink
            :to="{ name: 'login', query: route.query }"
            class="text-primary hover:text-primary-300"
        >
            login page
        </ULink>
    </AuthFooter>
</template>

<script lang="ts" setup>
const route = useRoute();
</script>
