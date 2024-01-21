<template>
    <Toast :breakpoints="{ '1000px': '75vw', '575px': '100vw' }" />
    <RouterView />
</template>

<script setup lang="ts">
import Toast from "primevue/toast";
</script>
