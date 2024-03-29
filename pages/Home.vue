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
        <section class="flex flex-1 flex-col w-full">
            <header class="h-16 flex items-center border-b border-gray-800 px-4">
                <UButton
                    color="gray"
                    variant="ghost"
                    square
                    icon="i-heroicons-bars-3"
                    size="sm"
                    class="mr-4 lg:hidden"
                    @click.prevent="isSidebarOpen = !isSidebarOpen"
                />
                <UBreadcrumb :links="links" />
            </header>
        </section>
    </main>
</template>

<script setup lang="ts">
import Sidebar from "@/pages/Sidebar.vue";

useHead({
    titleTemplate: (titleChunk) => {
        return "Home";
    }
});
const isSidebarOpen = ref(false);

const links = [{
    label: "Topic",
    icon: "i-heroicons-folder",
    to: "/"
}, {
    label: "Korean",
    to: "/"
}, {
    label: "Unit",
    icon: "i-heroicons-swatch",
    to: "/"
}, {
    label: "Alphabet"
}];
</script>
