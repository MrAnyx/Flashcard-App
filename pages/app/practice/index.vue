<template>
    <UButton variant="link" size="md" :to="{ name: 'session', params: { sessionId: 1 } }">
        Fake session
    </UButton>
</template>

<script lang="ts" setup>
definePageMeta({
    name: "practice",
});
</script>
