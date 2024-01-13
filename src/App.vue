<template>
    <RouterView />
</template>

<script setup lang="ts">
import axios from "@/plugins/axios";

axios.post("/auth/login", {
    identifier: "user",
    password: "password",
});
</script>
