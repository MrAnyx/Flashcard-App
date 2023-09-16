<template>
    <h1>Hello World</h1>
</template>

<script setup lang="ts">
import axios from "@/plugins/axios";

axios.get("/auth/login");
</script>

<style scoped lang="scss">
h1 {
    color: red;
}
</style>
