<template>
    <main class="fixed inset-0 flex overflow-hidden">
        <aside class="border-r border-gray-800 w-64 p-4 hidden lg:block">
            <Sidebar />
        </aside>
        <USlideover v-model="isSidebarOpen" class="lg:hidden" side="left" :ui="{ width: 'w-screen max-w-md' }">
            <aside class="p-4 h-full">
                <Sidebar @close="isSidebarOpen = !isSidebarOpen" />
            </aside>
        </USlideover>
        <section class="flex-1 flex flex-col w-full">
            <NuxtPage />
        </section>
    </main>
</template>

<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue";

const isSidebarOpen = ref(false);
</script>
