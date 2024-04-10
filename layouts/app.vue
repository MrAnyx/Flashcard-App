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
            <header class="h-16 shrink-0 flex items-center border-b border-gray-800 px-6">
                <UButton
                    color="gray"
                    variant="ghost"
                    square
                    icon="i-heroicons-bars-3"
                    size="sm"
                    class="mr-4 lg:hidden"
                    @click.prevent="isSidebarOpen = !isSidebarOpen"
                />

                <h1 class="text-gray-400 font-semibold mr-4">
                    <slot name="header" />
                </h1>
            </header>
            <slot />
        </section>
    </main>
</template>

<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue";

const isSidebarOpen = ref(false);
</script>
